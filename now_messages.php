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

if(!empty($_GET) && !empty($_GET['from'] && !empty($_GET['to']) && !empty($_GET['datetime']))){
    $from = htmlspecialchars($_GET['from']);
    $to = htmlspecialchars($_GET['to']);
    $datetime = date('Y-m-d h:i:s', htmlspecialchars($_GET['datetime']) / 1000);

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

    $query = "SELECT * FROM messages WHERE `FROM`=$to AND `TO`=$from AND `DATETIME`>'$datetime' ORDER BY `DATETIME` desc";
    $resDb = mysqli_query($link, $query);

    $result['query'] = $query;
    $result['error'] = mysqli_error($link);    

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