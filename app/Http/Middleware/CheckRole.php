<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle( $request, Closure $next, $role )
    {
        if ( ! Auth::user() ) {
            return response()->json([
                'success' => false,
                'data' => ['NO_USER'],
            ], 404);
        } else if ( ! Auth::user()->hasRole($role) ) {
            return response()->json([
                'success' => false,
                'data' => ['UNAUTHORIZED'],
            ], 401);
        }

        return $next($request);
    }
}
