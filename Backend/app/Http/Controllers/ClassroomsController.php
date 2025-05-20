<?php

namespace App\Http\Controllers;

use App\Models\classrooms;
use Illuminate\Http\Request;

class ClassroomsController extends Controller
{
    public function index(){
        $classrooms = classrooms::all();

        // return view('classrooms',['classrooms' => $classrooms]);
        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $classrooms
        ], 200);
    }
}
