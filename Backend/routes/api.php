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



Route::get('/mudarislist', [MudarisController::class, 'availableMudaris']);

Route::get('/santrilist', [SantriController::class, 'availableSantri']);




// menambahkan data user baru kedalam database
Route::post('/register', [AuthController::class, 'register']);
// mendapatkan data dari database user
Route::get('/santri', [santriController::class, 'index']);

// login
Route::post('/login', [AuthController::class, 'login']);

route::middleware(['auth:api'])->group(function () {

    Route::get('/pembagian', [GradeController::class, 'indexSantri']);
    Route::get('/jadwal', [GradeController::class, 'indexUser']);
    Route::apiResource('/classrooms', ClassroomController::class)->only('index');
    Route::apiResource('/dorms', DormController::class)->only('index');
    Route::apiResource('/santri', SantriController::class)->only('show', 'update');
    Route::apiResource('/subjects', SubjectController::class)->only('index');
    Route::apiResource('/mudaris', MudarisController::class)->only('index');

    Route::middleware(['role:admin'])->group(function () {

        Route::post('/registermudaris', [AuthController::class, 'registerMudaris']);
        Route::apiResource('/dorm_asigments', DormAssignmentController::class);
        Route::apiResource('/grades', GradeController::class);
        Route::apiResource('/classrooms', ClassroomController::class)->only('show', 'store', 'update', 'delete');
        Route::apiResource('/dorms', DormController::class)->only('show', 'store', 'update', 'delete');
        Route::apiResource('/santri', SantriController::class)->only('index', 'store', 'delete');
        Route::apiResource('/subjects', SubjectController::class)->only('show', 'store', 'update', 'delete');
        Route::apiResource('/mudaris', MudarisController::class)->only('show', 'store', 'update', 'delete');
    });
});
