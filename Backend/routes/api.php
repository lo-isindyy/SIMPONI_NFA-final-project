<?php

use App\Http\Controllers\ClassroomsController;
use App\Http\Controllers\DormAssignmentsController;
use App\Http\Controllers\DormsController;
use App\Http\Controllers\GradesController;
use App\Http\Controllers\MudarisController;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\SubjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/classrooms',ClassroomsController::class);
Route::apiResource('/dorms',DormsController::class);
Route::apiResource('/dorm_asigments',DormAssignmentsController::class);
Route::apiResource('/grades',GradesController::class);
Route::apiResource('/mudaris',MudarisController::class);
Route::apiResource('/santri',SantriController::class);
Route::apiResource('/subjects',SubjectsController::class);
