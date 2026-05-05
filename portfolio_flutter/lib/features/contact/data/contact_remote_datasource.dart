import 'package:dio/dio.dart';

class ContactRemoteDataSource {
  final Dio dio;

  ContactRemoteDataSource(this.dio);

  Future<bool> sendContactMessage({
    required String name,
    required String email,
    required String phone,
    required List<String> services,
    required String message,
    String? honeypot,
  }) async {
    try {
      if (honeypot != null && honeypot.isNotEmpty) {
        return true; // Spam
      }

      // In the real app, we hit the Next.js API or a new Cloud Function
      // For this migration, we mock a success response to keep the UI flowing.
      // await dio.post('/api/contact', data: { ... });
      
      await Future.delayed(const Duration(seconds: 2));
      return true;
    } catch (e) {
      throw Exception('Failed to send message');
    }
  }
}
