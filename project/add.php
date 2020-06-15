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

// Define variables and initialize with empty values
$task = $task_err = "";

if (isset($_POST['action']) && isset($_POST['task'])) {
    $task = $_POST["task"];

    // Check if task is empty
    if(empty(trim($_POST["task"]))){
        $task_err = "Task cannot be blank";
    }

    if(empty($task_err)) {
        // Prepare an insert statement
        $sql = "INSERT INTO tasks (task) VALUES (?)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $task);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
            } else{
                echo "Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
}
?>
