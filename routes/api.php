<?php

collect(File::allfiles(base_path('routes/api/')))->each(function ( $file ) {
    require $file;
});

