<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\School;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        School::insert([
			[
				'name'		=> 'SMK Plus Pagelaran',
				'user_id'   => User::where('email', 'media.asepnurjaman107@gmail.com')->first()->id,
                'created_at'=> now()
			],
            [
				'name'		=> 'SMK Budi Bakti Ciwidey',
				'user_id'	=> User::where('email', 'admin@gmail.com')->first()->id,
                'created_at'=> now()
			]
        ]);
    }
}
