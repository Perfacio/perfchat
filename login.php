<?php 
include 'db_controller.php';

// $link = mysqli_connect(
//     'localhost',
//     'root',
//     '',
//     'web0812'
// );

$postRaw = file_get_contents('php://input');
$post = json_decode($postRaw, true);

$res = [];

if(!empty($post) && 
    !empty($post['login']) && 
    !empty($post['password'])
){

    // $db = new dbController();
    $res = $db->login($post['login'], $post['password']);

    // $login = htmlspecialchars($post['login']);
    // $password = htmlspecialchars($post['password']);

    // $query = "SELECT * FROM users WHERE LOGIN='$login' AND PASSWORD='$password' LIMIT 1";
    // $resDb = mysqli_query($link, $query);

    // if($user = mysqli_fetch_assoc($resDb)){
    //     if($user['ACTIVE']){
    //         $query = "SELECT TOKEN FROM tokens WHERE LOGIN={$user['ID']} LIMIT 1";
    //         $resDb = mysqli_query($link, $query);
    //         if($token = mysqli_fetch_assoc($resDb)){
    //             $res['token'] = $token['TOKEN'];
    //         }
    //         else{
    //             $token = sha1($login . $password);
    //             $query = "INSERT INTO tokens(TOKEN, LOGIN) VALUES ('$token', {$user['ID']})";
    //             $resDb = mysqli_query($link, $query);
    //             // if($resDb){
    //                 $res['token'] = $token;
    //             // }
    //         }
    //     }
    // }
    // else{
    //     $query = "INSERT INTO users(LOGIN, PASSWORD) VALUES('$login', '$password')";
    //     mysqli_query($link, $query);
    //     $id = mysqli_insert_id($link);
    //     if($id > 0){
    //         $token = sha1($login . $password);
    //         $query = "INSERT INTO tokens(TOKEN, LOGIN) VALUES ('$token', $id)";
    //         $resDb = mysqli_query($link, $query);
    //         $res['token'] = $token;
    //     }
    // }
}

// mysqli_close($link);

die(json_encode($res));