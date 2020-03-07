<?php
$link = mysqli_connect(
    'localhost',
    'root',
    '',
    'web0812'
);
//mysqli_set_charset($link, 'utf8');

if(!empty($_GET) && !empty($_GET['name']) && !empty($_GET['email']) && !empty($_GET['message'])){
    $query = "INSERT INTO feedbacks(FIO, EMAIL, PHONE, MESSAGE) VALUES('{$_GET['name']}', '{$_GET['email']}', '{$_GET['phone']}', '{$_GET['message']}');";

    $res = mysqli_query($link, $query);

    if(!$res){
        var_dump(mysqli_error($link));
    }
}

mysqli_close($link);
?>