<?php

namespace App\Http\Controllers;

use App\Models\grades;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GradesController extends Controller
{
    public function index()
    {
        $grades = grades::with('santri','subject');

        if ($grades->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('grades',['grades' => $grades]);

        return response()->json([
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

        $grades = grades::Create([
            'santri_id' => $request->santri_id,
            'subject_id' => $request->subject_id,
            'grade' => $request->grade
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Grade saved successfully!',
            'data' => $grades
        ], 201);
    }

    public function update(string $id, Request $request)
    {

        $grades = grades::find($id);

        if (!$grades) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator 
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'subject_id' => 'required|exists:subjects,id',
            'grade' => 'required|integer|min:0|max:100',
        ]);

        // 2. check validator error 
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'santri_id' => $request->santri_id,
            'subject_id' => $request->subject_id,
            'grade' => $request->grade
        ];

        $grades->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $grades
        ], 200);
    }

    public function show(string $id)
    {
        $grades = grades::find($id);

        if (!$grades) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $grades
        ], 200);
    }

    public function destroy(string $id)
    {
        $grades = grades::find($id);

        if (!$grades) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        $grades->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
