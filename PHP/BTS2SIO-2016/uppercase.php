<?php

$original = $argv[1];
$new = '';
$size = strlen($original);

for ($i = 0; $i < $size; $i++) {
    $ord = ord($original[$i]);
    if ($ord > 96 && $ord < 123) {
        //$new .= chr($ord - 32);
        $original[$i] = chr($ord - 32);
    }
}

echo $original;

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php if (true): ?>
    toto
<?php endif; ?>
</body>
</html>
