<?php

namespace Database\Seeders;

use Database\Seeders\Products\ComputerComponentsSeeder;
use Database\Seeders\Products\DesktopsSeeder;
use Database\Seeders\Products\FurnituresSeeder;
use Database\Seeders\Products\GamingsSeeder;
use Database\Seeders\Products\KidFshionsSeeder;
use Database\Seeders\Products\LaptopsSeeder;
use Database\Seeders\Products\MenFshionsSeeder;
use Database\Seeders\Products\MobilesSeeder;
use Database\Seeders\Products\NetworkingSeeder;
use Database\Seeders\Products\PetsSeeder;
use Database\Seeders\Products\PropertiesSeeder;
use Database\Seeders\Products\TabletsSeeder;
use Database\Seeders\Products\VehiclesSeeder;
use Database\Seeders\Products\WomenFshionsSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(LaptopsSeeder::class);
        $this->call(DesktopsSeeder::class);
        $this->call(ComputerComponentsSeeder::class);
        $this->call(FurnituresSeeder::class);
        $this->call(GamingsSeeder::class);
        $this->call(KidFshionsSeeder::class);
        $this->call(MenFshionsSeeder::class);
        $this->call(WomenFshionsSeeder::class);
        $this->call(MobilesSeeder::class);
        $this->call(NetworkingSeeder::class);
        $this->call(PetsSeeder::class);
        $this->call(VehiclesSeeder::class);
        $this->call(PropertiesSeeder::class);
        $this->call(TabletsSeeder::class);
    }
}
