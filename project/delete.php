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

if ( isset($_POST['delete-all'])) {
    // Prepare a delete statement
    $sql = "DELETE FROM tasks";

    if($stmt = mysqli_prepare($link, $sql)){

        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            /* store result */
            mysqli_stmt_store_result($stmt);

            $rows = mysqli_stmt_num_rows($stmt);

            echo $rows;
        } else{
            echo "Oops! Something went wrong. Please try again later.";
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }
}
?>
