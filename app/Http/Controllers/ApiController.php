<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

class ApiController extends Controller
{
    /**
     * Returns all routes with their request method
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function routeList()
    {
        $routeCollection = Route::getRoutes();

        $routes = collect([]);
        foreach ( $routeCollection as $value ) {
            $routes[] = $value->uri() . " | " . $value->methods()[0];
        }

        return $this->outputSuccess($routes);
    }

    /**
     * Returns a formatted ajax request
     *
     * @param $data
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function outputSuccess( $data, $statusCode = 200 )
    {
        return response()->json([
            'success' => true,
            'data'    => $data,
        ], $statusCode);
    }

    /**
     * Returns a formatted ajax request
     *
     * @param $data
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function outputError( $data, $statusCode = 422 )
    {
        return response()->json([
            'success' => false,
            'data'    => $data,
        ], $statusCode);
    }
}
