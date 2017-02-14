<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        input[type="text"].error {
            border : 4px solid red;
        }
        
        .toto {
            background: blue;
        }
    </style>
</head>
<body>

<?php $error = $_GET['error'] ?>


Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur dignissimos doloremque ducimus eaque eligendi eos iusto laboriosam maiores minima molestiae, mollitia, perspiciatis quaerat repellendus sed tempore veniam voluptates!

<input type="text" name="" class="<?= ($error)?'error':'' ?>" placeholder="toto">

<div class="<?= ($a)?'toto':'' ?>"> TEST </div>

</body>
</html>
