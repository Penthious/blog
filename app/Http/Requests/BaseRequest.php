<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Response;

class BaseRequest extends FormRequest
{

    /**
     * Throw a nice error to the front end with no redirects.
     *
     * @param array $errors
     * @return \Illuminate\Http\JsonResponse
     */
    public function response( array $errors )
    {
        return Response::json([
            'success' => false,
            'data'    => $errors
        ], 422);
    }
}

