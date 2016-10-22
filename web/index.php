<?php

require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Register view rendering
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

// Our web handlers

$app->get('/', function() use($app) {
  $app['monolog']->addDebug('logging output.');

  $.get( "https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3", function( data ) {
    $( ".result" ).html( data );
  });

  // return
  return $app['twig']->render('index.twig');
});

$app->run();
