<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\Debug\Exception\FatalThrowableError;
use Tymon\JWTAuth\Exceptions\{
    TokenExpiredException, TokenInvalidException
};

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $exception
     * @return void
     */
    public function report( Exception $exception )
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an JSON response.
     *
     * @param \Illuminate\Http\Request $request
     * @param Exception $e
     * @return \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function render( $request, Exception $e )
    {
        if ( $e instanceof TokenExpiredException ) {
            return response()->json([
                'success' => 'false',
                'data'    => $e->getMessage(),
            ], 404);
        } else if ( $e instanceof TokenInvalidException ) {
            return response()->json([
                'success' => 'false',
                'data'    => $e->getMessage(),
            ], 404);
        } else if ( $e instanceof ModelNotFoundException ) {
            return response()->json([
                'success' => 'false',
                'data'    => $e->getMessage(),
            ], 404);
        } else if ( $e instanceof AuthorizationException ) {
            return response()->json([
                'success' => 'false',
                'data'    => $e->getMessage(),
            ], 404);
        } else if ( $e instanceof AuthenticationException ) {
            return response()->json([
                'success' => 'false',
                'data'    => $e->getMessage(),
            ], 404);
        } else if ( $e instanceof FatalThrowableError ) {
            return response()->json([
                'success' => 'false',
                'data'    => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
                'trace'   => $e->getTrace(),
                'code'    => $e->getCode(),
            ], 404);
        }

        return parent::render($request, $e);
    }
}
