<?php

namespace App\Http\Controllers;

use App\Models\santri;
use Illuminate\Http\Request;

class SantriController extends Controller
{
    public function index(){
        $santri = santri::all();

        // return view('santri',['santri' => $santri]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $santri
        ], 200);
    }
}
