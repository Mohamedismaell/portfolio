import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../../../core/widgets/section_wrapper.dart';
import '../../../../core/widgets/section_badge.dart';
import '../../../../core/widgets/gradient_text.dart';
import '../../../../core/widgets/section_divider.dart';
import '../../../../core/theme/app_gradients.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/theme/app_shadows.dart';
import '../data/contact_remote_datasource.dart';
import 'cubit/contact_cubit.dart';
import 'widgets/service_multi_select.dart';

class HireSection extends StatefulWidget {
  const HireSection({super.key});

  @override
  State<HireSection> createState() => _HireSectionState();
}

class _HireSectionState extends State<HireSection> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _messageController = TextEditingController();
  final _websiteController = TextEditingController(); // Honeypot
  List<String> _selectedServices = [];

  final List<String> _availableServices = [
    'Mobile App Development (Flutter)',
    'UI/UX Implementation',
    'API Integration & Architecture',
    'App Maintenance & Refactoring',
    'Consulting',
  ];

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ContactCubit(ContactRemoteDataSource(Dio())),
      child: SectionWrapper(
        child: Column(
          children: [
            const SectionBadge(label: 'Get In Touch'),
            const SizedBox(height: 16),
            const GradientText(
              "Let's Build Something\nTogether",
              gradient: AppGradients.heading,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 48, fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 16),
            const SectionDivider(),
            const SizedBox(height: 16),
            const Text(
              'Looking for a scalable mobile application or expert consulting? Fill out the form below.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white54, fontSize: 16),
            ),
            const SizedBox(height: 60),
            Container(
              constraints: const BoxConstraints(maxWidth: 600),
              padding: const EdgeInsets.all(40),
              decoration: BoxDecoration(
                gradient: AppGradients.solidCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppBorders.subtle),
                boxShadow: AppShadows.card,
              ),
              child: Builder(
                builder: (context) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Hidden honeypot
                      SizedBox(
                        height: 0,
                        width: 0,
                        child: TextField(controller: _websiteController),
                      ),
                      
                      Row(
                        children: [
                          Expanded(child: _buildTextField('Name', _nameController, LucideIcons.user)),
                          const SizedBox(width: 16),
                          Expanded(child: _buildTextField('Email', _emailController, LucideIcons.mail)),
                        ],
                      ).animate().fadeIn(delay: 0.ms).slideY(begin: 0.1),
                      const SizedBox(height: 24),
                      _buildTextField('Phone (Optional)', _phoneController, LucideIcons.phone)
                          .animate().fadeIn(delay: 70.ms).slideY(begin: 0.1),
                      const SizedBox(height: 24),
                      const Text('Services', style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      ServiceMultiSelect(
                        availableServices: _availableServices,
                        selectedServices: _selectedServices,
                        onChanged: (val) => setState(() => _selectedServices = val),
                      ).animate().fadeIn(delay: 140.ms).slideY(begin: 0.1),
                      const SizedBox(height: 24),
                      _buildTextField('Project Details', _messageController, LucideIcons.messageSquare, maxLines: 5)
                          .animate().fadeIn(delay: 210.ms).slideY(begin: 0.1),
                      const SizedBox(height: 32),
                      BlocBuilder<ContactCubit, ContactState>(
                        builder: (context, state) {
                          if (state is ContactError) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 16),
                              child: Text(state.message, style: const TextStyle(color: Colors.red)),
                            );
                          }
                          return const SizedBox();
                        },
                      ),
                      BlocBuilder<ContactCubit, ContactState>(
                        builder: (context, state) {
                          return MouseRegion(
                            cursor: state is ContactSending ? SystemMouseCursors.basic : SystemMouseCursors.click,
                            child: GestureDetector(
                              onTap: state is ContactSending ? null : () {
                                context.read<ContactCubit>().submitForm(
                                  name: _nameController.text,
                                  email: _emailController.text,
                                  phone: _phoneController.text,
                                  services: _selectedServices,
                                  message: _messageController.text,
                                  honeypot: _websiteController.text,
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                decoration: BoxDecoration(
                                  gradient: state is ContactSuccess ? AppGradients.ghostBtn : AppGradients.primaryBtn,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: state is ContactSuccess ? Colors.green : Colors.transparent),
                                ),
                                child: Center(
                                  child: _buildButtonChild(state),
                                ),
                              ),
                            ),
                          );
                        },
                      ).animate().fadeIn(delay: 280.ms).slideY(begin: 0.1),
                    ],
                  );
                }
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildButtonChild(ContactState state) {
    if (state is ContactSending) {
      return const SizedBox(
        width: 20, height: 20,
        child: CircularProgressIndicator(color: Colors.black, strokeWidth: 2),
      );
    } else if (state is ContactSuccess) {
      return const Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(LucideIcons.check, color: Colors.green, size: 20),
          SizedBox(width: 8),
          Text('Message Sent', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
        ],
      );
    }
    return const Text('Send Message', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold));
  }

  Widget _buildTextField(String hint, TextEditingController controller, IconData icon, {int maxLines = 1}) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppBorders.subtle),
      ),
      child: TextField(
        controller: controller,
        maxLines: maxLines,
        style: const TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.white30),
          prefixIcon: maxLines == 1 ? Icon(icon, color: Colors.white54, size: 18) : null,
          border: InputBorder.none,
          contentPadding: EdgeInsets.all(maxLines == 1 ? 16 : 20),
        ),
      ),
    );
  }
}
