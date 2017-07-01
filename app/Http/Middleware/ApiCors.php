<?php

namespace App\Http\Middleware;

use Closure;

class ApiCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set( 'Access-Control-Allow-Origin','*' );
        $response->headers->set( 'Access-Control-Allow-Headers','Origin, X-Requested-With, X-Csrf-Token, Content-Type, Accept, Pragma, Cache-Control, If-Modified-Since, Authorization');
        $response->headers->set( 'Access-Control-Expose-Headers','Content-Type, Cache-Control, If-Modified-Since, Authorization');
        $response->headers->set( 'Access-Control-Allow-Methods','OPTIONS, GET, POST, PATCH, PUT, DELETE');

        return $response;
    }
}

