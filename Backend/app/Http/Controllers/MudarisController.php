<?php

namespace App\Http\Controllers;

use App\Models\mudaris;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MudarisController extends Controller
{
    public function index()
    {
        $mudaris = mudaris::all();

        if ($mudaris->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('mudaris',['mudaris' => $mudaris]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $mudaris
        ], 200);
    }
    public function store(Request $request)
    {
        // 1. Validasi data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'address' => 'nullable|string',
            'no_hp' => 'nullable|string|max:25',
        ]);

        // 2. Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Simpan ke DB
        $mudaris = Mudaris::create([
            'name' => $request->name,
            'gender' => $request->gender,
            'address' => $request->address,
            'no_hp' => $request->no_hp,
        ]);

        // 4. Response
        return response()->json([
            'success' => true,
            'message' => 'Mudaris added successfully!',
            'data' => $mudaris
        ], 201);
    }
}
