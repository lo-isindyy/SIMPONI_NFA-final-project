<?php

namespace App\Http\Controllers;

use App\Models\subjects;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index()
    {
        $subjects = subjects::all();

        if ($subjects->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('subjects',['subjects' => $subjects]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $subjects
        ], 200);
    }
}
