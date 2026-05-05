import 'package:flutter_bloc/flutter_bloc.dart';
import '../../data/github_remote_datasource.dart';
import '../../data/models/github_stats_model.dart';

abstract class GithubStatsState {}
class GithubStatsInitial extends GithubStatsState {}
class GithubStatsLoading extends GithubStatsState {}
class GithubStatsLoaded extends GithubStatsState {
  final GithubStatsModel stats;
  GithubStatsLoaded(this.stats);
}
class GithubStatsError extends GithubStatsState {
  final String message;
  GithubStatsError(this.message);
}

class GithubStatsCubit extends Cubit<GithubStatsState> {
  final GithubRemoteDataSource _dataSource;

  GithubStatsCubit(this._dataSource) : super(GithubStatsInitial());

  Future<void> fetchStats() async {
    emit(GithubStatsLoading());
    try {
      final stats = await _dataSource.getStats();
      emit(GithubStatsLoaded(stats));
    } catch (e) {
      emit(GithubStatsError(e.toString()));
    }
  }
}
