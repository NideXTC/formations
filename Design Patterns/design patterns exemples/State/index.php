<?php

require 'Context.php';
require 'StateInterface.php';
require 'StopState.php';
require 'StartState.php';

$context = new Context();

$startState = new StartState();
echo $startState->doSomething($context);

$stopState = new StopState();
echo $stopState->doSomething($context);