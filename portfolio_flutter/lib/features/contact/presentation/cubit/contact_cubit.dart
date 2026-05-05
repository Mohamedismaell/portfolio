import 'package:flutter_bloc/flutter_bloc.dart';
import '../../data/contact_remote_datasource.dart';

abstract class ContactState {}
class ContactIdle extends ContactState {}
class ContactSending extends ContactState {}
class ContactSuccess extends ContactState {}
class ContactError extends ContactState {
  final String message;
  ContactError(this.message);
}

class ContactCubit extends Cubit<ContactState> {
  final ContactRemoteDataSource _dataSource;

  ContactCubit(this._dataSource) : super(ContactIdle());

  Future<void> submitForm({
    required String name,
    required String email,
    required String phone,
    required List<String> services,
    required String message,
    String? honeypot,
  }) async {
    if (name.isEmpty || email.isEmpty || message.isEmpty) {
      emit(ContactError('Please fill in all required fields.'));
      return;
    }

    emit(ContactSending());
    try {
      await _dataSource.sendContactMessage(
        name: name,
        email: email,
        phone: phone,
        services: services,
        message: message,
        honeypot: honeypot,
      );
      emit(ContactSuccess());
      Future.delayed(const Duration(seconds: 3), () => emit(ContactIdle()));
    } catch (e) {
      emit(ContactError(e.toString()));
      Future.delayed(const Duration(seconds: 3), () => emit(ContactIdle()));
    }
  }
}
