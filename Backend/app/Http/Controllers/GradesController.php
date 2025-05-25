<?php

namespace App\Http\Controllers;

use App\Models\grades;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'santri_id' => 'required|exists:santri,id',
        'subject_id' => 'required|exists:subjects,id',
        'grade' => 'required|integer|min:0|max:100',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => $validator->errors()
        ], 422);
    }

    $grades = grades::updateOrCreate(
        ['santri_id' => $request->santri_id, 
        'subject_id' => $request->subject_id],
        ['grade' => $request->grade]
    );

    return response()->json([
        'success' => true,
        'message' => 'Grade saved successfully!',
        'data' => $grades
    ], 201);
}
}
