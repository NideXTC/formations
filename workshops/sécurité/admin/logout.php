<?php
header('WWW-Authenticate: Basic realm="Acces Restreint"');
header('HTTP/1.0 401 Unauthorized');
exit;
