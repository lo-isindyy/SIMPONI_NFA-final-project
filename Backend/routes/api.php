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

Route::get('/classrooms',[ClassroomsController::class, 'index']);
Route::get('/dorms',[DormsController::class, 'index']);
Route::get('/dorm_asigments',[DormAssignmentsController::class, 'index']);
Route::get('/grades',[GradesController::class, 'index']);
Route::get('/mudaris',[MudarisController::class, 'index']);
Route::get('/santri',[SantriController::class, 'index']);
Route::get('/subjects',[SubjectsController::class, 'index']);
