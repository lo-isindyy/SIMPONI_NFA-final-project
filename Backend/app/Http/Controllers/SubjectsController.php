<?php

namespace App\Http\Controllers;

use App\Models\subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'day' => 'required|date_format:Y-m-d H:i:s',
            'year' => 'required|digits:4|integer',
            'classroom_id' => 'required|exists:classrooms,id',
            'mudaris_id' => 'required|exists:mudaris,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $subjects = subjects::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Subject added successfully!',
            'data' => $subjects
        ], 201);
    }

    public function show(string $id)
    {
        $subjects = subjects::find($id);

        if (!$subjects) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $subjects
        ], 200);
    }
}
