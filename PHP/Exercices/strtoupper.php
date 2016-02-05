<?php

function strtoup($str = '')
{
    $upper = "";
    $size = strlen($str);

    for ($i = 0; $i < $size; $i++) {
        $ord = ord($str[$i]);
        if($ord > 96 && $ord < 123){
            $upper .= chr($ord - 32) ;
        } else {
            $upper .= $str[$i];
        }
    }

    return $upper;
}

echo  strtoup('coucouM09355+FEvdsvdsvss');