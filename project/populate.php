<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
// Include config file
require_once "config.php";

if ( isset($_POST['populate'])) {
    // Prepare a select statement
    $sql = "SELECT id, task FROM tasks";
    $results = mysqli_query($link, $sql);
    // Close connection
    mysqli_close($link);
    $array = array();
    if (mysqli_num_rows($results) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($results)) {
            $array[$row["id"]] = $row["task"];
            //array_push($array, $row["task"]);
        }
    }

    echo json_encode($array);
}
?>
