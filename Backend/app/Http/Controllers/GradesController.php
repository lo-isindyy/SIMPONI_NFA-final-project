<?php

namespace App\Http\Controllers;

use App\Models\grades;
use Illuminate\Http\Request;

class GradesController extends Controller
{
    public function index(){
        $grades = grades::all();

        if ($grades->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('grades',['grades' => $grades]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $grades
        ], 200);
    
    }
}
