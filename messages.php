<?php
$link = mysqli_connect(
    'localhost',
    'root',
    '',
    'web0812'
);
$res = [
    'messages' => []
];

if(!empty($_GET) && !empty($_GET['from']) && !empty($_GET['to'])){
    $from = htmlspecialchars($_GET['from']);
    $to = htmlspecialchars($_GET['to']);

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

    $query = "SELECT * FROM messages WHERE `FROM`='$from' AND `TO`='$to' OR `FROM`='$to' && `TO`='$from' ORDER BY `DATETIME` desc LIMIT 10";
    $resDb = mysqli_query($link, $query);

    while($message = mysqli_fetch_assoc($resDb)){
        $res['messages'][] = [
            'text' => $message['TEXT'],
            'myself' => $from === $message['FROM']
        ];
    }
    $res['messages'] = array_reverse($res['messages']);
}

mysqli_close($link);
die(json_encode($res));