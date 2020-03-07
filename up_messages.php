<?php
$link = mysqli_connect(
    'localhost',
    'root',
    '',
    'web0812'
);

$result = [
    'messages' => []
];

if(!empty($_GET) && !empty($_GET['from'] && !empty($_GET['to']) && !empty($_GET['start']))){
    $from = htmlspecialchars($_GET['from']);
    $to = htmlspecialchars($_GET['to']);
    $start = intval(htmlspecialchars($_GET['start'])) + 1;

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

    // $query = "SELECT * FROM messages WHERE `FROM`='$from' AND `TO`='$to' OR `FROM`='$to' && `TO`='$from' ORDER BY `DATETIME` OFFSET $start LIMIT 10";
    $query = "SELECT * FROM messages WHERE `FROM`='$from' AND `TO`='$to' OR `FROM`='$to' && `TO`='$from' ORDER BY `DATETIME` desc LIMIT $start,10";
    $resDb = mysqli_query($link, $query);

    while($res = mysqli_fetch_assoc($resDb)){
        $result['messages'][] = [
            'text' => $res['TEXT'],
            'myself' => $from === $res['FROM']
        ];
    }
    $result['messages'] = array_reverse($result['messages']);
}
mysqli_close($link);
die(json_encode($result));