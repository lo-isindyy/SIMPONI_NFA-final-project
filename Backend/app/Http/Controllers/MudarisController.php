<?php

namespace App\Http\Controllers;

use App\Models\mudaris;
use Illuminate\Http\Request;

class MudarisController extends Controller
{
    public function index(){
        $mudaris = mudaris::all();

        // return view('mudaris',['mudaris' => $mudaris]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $mudaris
        ], 200);
    }
}
