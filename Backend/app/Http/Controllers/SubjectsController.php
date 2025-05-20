<?php

namespace App\Http\Controllers;

use App\Models\subjects;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index()
    {
        $subjects = subjects::all();

        // return view('subjects',['subjects' => $subjects]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $subjects
        ], 200);
    }
}
