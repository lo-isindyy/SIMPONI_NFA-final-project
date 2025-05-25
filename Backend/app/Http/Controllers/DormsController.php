<?php

namespace App\Http\Controllers;

use App\Models\dorms;
use Illuminate\Http\Request;

class DormsController extends Controller
{
    public function index(){
        $dorms = dorms::all();

        if ($dorms->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('dorms',['dorms' => $dorms]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $dorms
        ], 200);
    }
}