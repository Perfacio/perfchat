<?php
date_default_timezone_get('UTC');
$link = mysqli_connect(
    'localhost',
    'root',
    '',
    'web0812'
);

$post = json_decode(file_get_contents('php://input'), true);

if(!empty($post) && !empty($post['message']) && !empty($post['from']) && !empty($post['to'])){
    $from = htmlspecialchars($post['from']);
    $to = htmlspecialchars($post['to']);
    $text = htmlspecialchars($post['message']);

    $query = "SELECT ID, LOGIN FROM users WHERE LOGIN IN('$from', '$to') LIMIT 2";
    $resDb = mysqli_query($link, $query);

    while($user = mysqli_fetch_assoc($resDb)){
        if($user['LOGIN'] === $from){
            $from = $user['ID'];
        }
        else if($user['LOGIN'] === $to){
            $to = $user['ID'];
        }
    }

    $datetime = date('Y-m-d h:i:s');
    $query = "INSERT INTO messages(`TEXT`, `FROM`, `TO`, `DATETIME`) VALUES('$text', $from, $to, '$datetime');";
    mysqli_query($link, $query);
}

mysqli_close($link);

die();