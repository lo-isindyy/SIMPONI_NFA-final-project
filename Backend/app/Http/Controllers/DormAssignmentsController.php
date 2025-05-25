<?php

namespace App\Http\Controllers;

use App\Models\dorm_assignments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DormAssignmentsController extends Controller
{
    public function index()
    {
        $dorm_assignments = dorm_assignments::all();

        if ($dorm_assignments->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('dorm_assignments',['dorm_assignments' => $dorm_ssignments]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $dorm_assignments
        ], 200);
    }

    public function store(Request $request)
    {
        // 1. Validasi
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'dorm_id' => 'required|exists:dorms,id',
            'entry_date' => 'required|date',
            'exit_date' => 'required|date|after_or_equal:entry_date',
        ]);

        // 2. Jika gagal validasi
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Simpan data
        $assignments = dorm_assignments::create([
            'santri_id' => $request->santri_id,
            'dorm_id' => $request->dorm_id,
            'entry_date' => $request->entry_date,
            'exit_date' => $request->exit_date,
        ]);

        // 4. Response sukses
        return response()->json([
            'success' => true,
            'message' => 'Dorm assignment created successfully!',
            'data' => $assignments
        ], 201);
    }
}
