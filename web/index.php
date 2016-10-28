<?php

require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

// Register Database
$dbopts = parse_url(getenv('DATABASE_URL'));
$app->register(new Herrera\Pdo\PdoServiceProvider(),
               array(
                   'pdo.dsn' => 'pgsql:dbname='.ltrim($dbopts["path"],'/').';host='.$dbopts["host"] . ';port=' . $dbopts["port"],
                   'pdo.username' => $dbopts["user"],
                   'pdo.password' => $dbopts["pass"]
               )
);

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
  $don = getenv("FOURSQUARE_CLIENT_ID");
  $secret = getenv("FOURSQUARE_SECRET");
  // return
  // array('id' => $id, 'secret' => $secret)

  $it = $app['pdo']->prepare('SELECT * FROM image_table');
  $it->execute();

  $images = array();
  while ($row = $it->fetch(PDO::FETCH_ASSOC)) {
    $app['monolog']->addDebug('Row ' . $row);
    $images[] = $row;
  }

  $ct = $app['pdo']->prepare('SELECT * FROM coffee_table');
  $ct->execute();

  $venues = array();
  while ($row = $ct->fetch(PDO::FETCH_ASSOC)) {
    $app['monolog']->addDebug('Row ' . $row);
    $venues[] = $row;
  }

  return $app['twig']->render('index.twig', array("don" => $don, 'images' => $images, 'venues' => $venues));
});

// renders all rows in specified table
$app->get('/db/', function() use($app) {
  $it = $app['pdo']->prepare('SELECT * FROM image_table');
  $it->execute();

  $images = array();
  while ($row = $it->fetch(PDO::FETCH_ASSOC)) {
    $app['monolog']->addDebug('Row ' . $row);
    $imageTableRows[] = $row;
  }

  return $app['twig']->render('database.twig', array(
    'imageTableRows' => $imageTableRows
  ));
});

$app->run();
