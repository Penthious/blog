<?php
Route::get('/routes', [
    'as' => 'api.routes',
    'uses' => 'ApiController@routeList',
]);