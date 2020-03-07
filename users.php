<?php
        $link = mysqli_connect(
            'localhost',
            'root',
            '',
            'web0812'
        );
        $query = "SELECT LOGIN FROM users WHERE ACTIVE=true";
        $resDb = mysqli_query($link, $query);
        while($user = mysqli_fetch_assoc($resDb)){
            echo "<div class='user'>{$user['LOGIN']}</div>";
        }
        mysqli_close($link);
