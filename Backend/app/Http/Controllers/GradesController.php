<?php

namespace App\Http\Controllers;

use App\Models\grades;
use Illuminate\Http\Request;

class GradesController extends Controller
{
    public function index(){
        $grades = grades::all();

        // return view('grades',['grades' => $grades]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $grades
        ], 200);
    
    }
}
