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
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
    <script src="app.js" type="text/javascript"></script>
</head>
<body>
    <div class="page-header">
        <h1>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to our site.</h1>
    </div>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <div id="main" class="card">
                    <div class="card-content">
                        <span class="card-title">Task List</span>
                        <div class="row">
                            <div class="wrapper">
                                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" id="task-form" method="post">
                                    <div class="form-group class="input-field col s12">
                                        <input class="form-control" type="text" name="task" id="task" value="<?php echo $task; ?>">
                                        <label for="task">New task</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" name="button" id="button" value="Add Task" class="btn">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <h5 id="task-title">Task</h5>
                        <div class="input-field col s12">
                            <input type="text" name ="filter" id="filter" onkeyup="filterTasks(event)">
                            <label for="task">Filter task</label>
                        </div>
                        <ul class="collection" onclick="removeTask(event)"></ul>
                        <a href="#" class="clear-tasks btn black delete-all">Clear all tasks</a>
                    </div>
                </div>
                <a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
            </div>
        </div>
    </div>

    <script
            src="https://code.jquery.com/jquery-3.5.1.js"
            integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="app.js"></script>
</body>
</html>