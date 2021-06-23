<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Schema;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    const STATUS_REGISTERED = 1;
    const STATUS_RESIDENT = 200;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Provides the names of the current model
     */
    public function getAttributeNames()
    {
        $columns = Schema::getColumnListing( $this->getTable() );
        return array_values( array_diff($columns, $this->hidden) );
    }

    /**
     * All statuses represented in the array
     */
    public static function getStatuses()
    {
        return [
            self::STATUS_REGISTERED,
            self::STATUS_RESIDENT
        ];
    }
}
