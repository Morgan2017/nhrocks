<?php

namespace Tests\Feature;

use Tests\TestCase;

class AdminControllerTest extends TestCase
{
    /**
     * There is a response with the OK status regarding the /manager/dashboard route
     * @return bool
     */
    public function test_index_exists()
    {
        $response = $this->get('/manager');

        $response->assertStatus(200);
    }

    /**
     * There is a renderable view regarding the /manager/dashboard route
     * @return bool
     */
    public function test_index_view_exists()
    {
        $view = $this->view('admin.index');

        $view->assertSee('Hello');
    }

    /**
     * There is an array as a json of some amount of users regarding the /manager/get-users route
     * @return bool
     */
    public function test_getting_users()
    {}

    /**
     * There is an array as a json of an user regarding the /manager/get-user route
     * @return bool
     */
    public function test_getting_user()
    {}

    /**
     * There is a response after editing a user regarding the /manager/edit-user route
     * @return bool
     */
    public function test_editing_user()
    {}
}