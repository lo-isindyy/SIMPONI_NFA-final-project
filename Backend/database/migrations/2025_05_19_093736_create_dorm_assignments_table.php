<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dorm_assignments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('santri_id');
            $table->unsignedBigInteger('dorm_id');
            $table->date('entry_date');
            $table->date('exit_date');

            $table->foreign('santri_id')->references('id')->on('santri')->onDelete('cascade');
            $table->foreign('dorm_id')->references('id')->on('dorms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dorm_assignments');
    }
};
