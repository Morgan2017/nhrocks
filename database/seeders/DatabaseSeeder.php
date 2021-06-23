<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{
    Business,
    Deal,
    Event,
    Listing,
    Payment,
    Subscription,
    User
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $number = rand(30, 50);
        Business::factory($number)->create();
        Deal::factory($number)->create();
        Event::factory($number)->create();
        Listing::factory($number)->create();
        Payment::factory($number)->create();
        Subscription::factory($number)->create();
        User::factory($number)->create();
    }
}
