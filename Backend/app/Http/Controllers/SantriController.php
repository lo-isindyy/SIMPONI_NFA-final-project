<?php

namespace App\Http\Controllers;

use App\Models\santri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SantriController extends Controller
{
    public function index()
    {
        $santri = santri::all();

        if ($santri->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('santri',['santri' => $santri]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $santri
        ], 200);
    }
    public function store(Request $request)
    {
        // 1. Validasi data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'gender' => 'required|string',
            'tgl_lahir' => 'required|date',
            'address' => 'required|string',
            'no_hp' => 'required|string|max:25',
        ]);

        // 2. Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Simpan data ke database
        $santri = Santri::create([
            'name' => $request->name,
            'gender' => $request->gender,
            'tgl_lahir' => $request->tgl_lahir,
            'address' => $request->address,
            'no_hp' => $request->no_hp,
        ]);

        // 4. Beri response
        return response()->json([
            'success' => true,
            'message' => 'Santri created successfully!',
            'data' => $santri
        ], 201);
    }

    public function show(string $id)
    {
        $santri = santri::find($id);

        if (!$santri) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $santri
        ], 200);
    }
}
