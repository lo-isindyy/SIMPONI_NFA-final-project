<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DormAssignmentController;
use App\Http\Controllers\DormController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\MudarisController;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/pembagian', [GradeController::class, 'indexSantri']);
Route::get('/jadwal', [GradeController::class, 'indexUser']);
Route::get('/mudarislist', [MudarisController::class, 'availableMudaris']);
Route::post('/registermudaris', [AuthController::class, 'registerMudaris']);
Route::get('/santrilist', [SantriController::class, 'availableSantri']);
Route::apiResource('/classrooms', ClassroomController::class);
Route::apiResource('/dorms', DormController::class);
Route::apiResource('/dorm_asigments', DormAssignmentController::class);
Route::apiResource('/grades', GradeController::class);
Route::apiResource('/mudaris', MudarisController::class);
Route::apiResource('/santri', SantriController::class);
Route::apiResource('/subjects', SubjectController::class);

// menambahkan data user baru kedalam database
Route::post('/register', [AuthController::class, 'register']);
// mendapatkan data dari database user
Route::get('/santri', [santriController::class, 'index']);

// login
Route::post('/login', [AuthController::class, 'login']);

route::middleware(['auth:api'])->group(function () {
    route::get('/dashboards', [AuthController::class, 'dashboard'])->name('dashboard');
});
