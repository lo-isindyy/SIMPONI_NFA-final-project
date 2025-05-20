<?php

namespace App\Http\Controllers;

use App\Models\dorms;
use Illuminate\Http\Request;

class DormsController extends Controller
{
    public function index(){
        $dorms = dorms::all();

        // return view('dorms',['dorms' => $dorms]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $dorms
        ], 200);
    }
}