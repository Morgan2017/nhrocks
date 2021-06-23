<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Payment extends Model
{
    use HasFactory;

    /**
     * Provides the names of the current model
     */
    public function getAttributeNames()
    {
        return Schema::getColumnListing($this->getTable());
    }
}
