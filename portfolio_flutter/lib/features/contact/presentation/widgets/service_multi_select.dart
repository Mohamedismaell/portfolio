import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../../../core/theme/app_borders.dart';

class ServiceMultiSelect extends StatefulWidget {
  final List<String> availableServices;
  final List<String> selectedServices;
  final Function(List<String>) onChanged;

  const ServiceMultiSelect({
    super.key,
    required this.availableServices,
    required this.selectedServices,
    required this.onChanged,
  });

  @override
  State<ServiceMultiSelect> createState() => _ServiceMultiSelectState();
}

class _ServiceMultiSelectState extends State<ServiceMultiSelect> {
  bool _isOpen = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GestureDetector(
          onTap: () => setState(() => _isOpen = !_isOpen),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: _isOpen ? Colors.blue : AppBorders.subtle),
            ),
            child: Row(
              children: [
                Expanded(
                  child: widget.selectedServices.isEmpty
                      ? const Text('Select services...', style: TextStyle(color: Colors.white54))
                      : Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: widget.selectedServices.map((s) => _buildChip(s)).toList(),
                        ),
                ),
                Icon(_isOpen ? LucideIcons.chevronUp : LucideIcons.chevronDown, color: Colors.white54),
              ],
            ),
          ),
        ),
        if (_isOpen)
          Container(
            margin: const EdgeInsets.only(top: 8),
            decoration: BoxDecoration(
              color: const Color(0xFF161616),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppBorders.subtle),
            ),
            child: Column(
              children: widget.availableServices.map((service) {
                final isSelected = widget.selectedServices.contains(service);
                return CheckboxListTile(
                  title: Text(service, style: const TextStyle(color: Colors.white70)),
                  value: isSelected,
                  activeColor: Colors.blue,
                  checkColor: Colors.white,
                  onChanged: (bool? checked) {
                    final newSelected = List<String>.from(widget.selectedServices);
                    if (checked == true) {
                      newSelected.add(service);
                    } else {
                      newSelected.remove(service);
                    }
                    widget.onChanged(newSelected);
                  },
                );
              }).toList(),
            ),
          ),
      ],
    );
  }

  Widget _buildChip(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.blue.withOpacity(0.2),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: Colors.blue.withOpacity(0.5)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(label, style: const TextStyle(color: Colors.blue, fontSize: 12)),
          const SizedBox(width: 4),
          GestureDetector(
            onTap: () {
              final newSelected = List<String>.from(widget.selectedServices)..remove(label);
              widget.onChanged(newSelected);
            },
            child: const Icon(LucideIcons.x, size: 14, color: Colors.blue),
          ),
        ],
      ),
    );
  }
}
