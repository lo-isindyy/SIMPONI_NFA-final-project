<?php

namespace App\Http\Controllers;

use App\Models\santri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            // 'gender' => 'required|string',
            'tgl_lahir' => 'nullable|date_format:Y-m-d|before_or_equal:today',
            'address' => 'nullable|string',
            'no_hp' => 'nullable|string|max:25',
            'pp_santri' => 'nullable|image|mimes:jpeg,jpg,png|max:2048'
        ]);

        // 2. Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $imageName = null;
        if ($request->hasFile('pp_santri')) {
            $image = $request->file('pp_santri');
            $image->store('santri', 'public');
            $imageName = $image->hashName();
        }

        // 3. Simpan data ke database
        $santri = Santri::create([
            'name' => $request->name,
            // 'gender' => $request->gender,
            'tgl_lahir' => $request->tgl_lahir,
            'address' => $request->address,
            'no_hp' => $request->no_hp,
            'pp_santri' => $imageName,
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

    public function update(string $id, Request $request)
    {
        // dd($request->all());

        $santri = santri::find($id);

        if (!$santri) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator 
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            // 'gender' => 'required|string',
            'tgl_lahir' => 'nullable|date',
            'address' => 'nullable|string',
            'no_hp' => 'nullable|string|max:25',
            'pp_santri' => 'nullable|image|mimes:jpeg,jpg,png|max:2048'
        ]);

        // 2. check validator error 
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'name' => $request->name,
            // 'gender' => $request->gender,
            'tgl_lahir' => $request->tgl_lahir,
            'address' => $request->address,
            'no_hp' => $request->no_hp,
        ];

        if ($request->hasFile('pp_santri')) {
            $image = $request->file('pp_santri');
            $image->store('santri', 'public');

            if ($santri->pp_santri) {
                Storage::disk('public')->delete('santri/' . $santri->pp_santri);
            }

            $data['pp_santri'] = $image->hashName();
        }

        $santri->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $santri
        ], 200);
    }

    public function destroy(string $id)
    {
        $santri = santri::find($id);

        if (!$santri) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        if ($santri->pp_santri) {
            Storage::disk('public')->delete('santri/' . $santri->pp_santri);
        }

        $santri->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
