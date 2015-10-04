<?php

require 'Movie.php';
require 'ActionMovie.php';
require 'FantasyMovie.php';

// Couplage faible entre les films
$MadMax = new ActionMovie('Mad Max');
$LOTR = new FantasyMovie('Lord Of The Ring');

echo $MadMax->getMovieName();
echo $LOTR->getMovieName();