<?php

namespace App\Http\Controllers;

use App\Models\dorm_assignments;
use Illuminate\Http\Request;

class DormAssignmentsController extends Controller
{
    public function index(){
        $dorm_ssignments = dorm_assignments::all();

        // return view('dorm_assignments',['dorm_assignments' => $dorm_ssignments]);

        return response() ->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $dorm_ssignments
        ], 200);
    }
}
