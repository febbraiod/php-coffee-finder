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

  // return
  array('names' => $names)
  return $app['twig']->render('index.twig', array('id' => getenv("FOURSQUARE_CLIENT_ID"), 'secret' => getenv("FOURSQUARE_SECRET")));
});

$app->run();
