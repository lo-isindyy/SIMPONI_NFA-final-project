<?php

namespace App\Http\Controllers;

use App\Models\santri;
use Illuminate\Http\Request;

class SantriController extends Controller
{
    public function index(){
        $santri = santri::all();

        if ($santri->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('santri',['santri' => $santri]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $santri
        ], 200);
    }
}
