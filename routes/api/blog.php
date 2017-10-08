<?php
Route::domain(env('APP_URL'))->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
Route::domain("blog." . env('APP_URL'))->group(function () {
    Route::any('/', function () {
        return 'route is blog';
    });
});
Route::domain('{subdomain}.' . env('APP_URL'))->group(function () {
    Route::any('/', function ($subdomain) {
        return $subdomain;
    });
});
