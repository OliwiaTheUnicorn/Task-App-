// Load data
$(document).ready(function(){
    var ajaxurl = 'populate.php',
        data =  {'populate': 'populate'};
    $.post(ajaxurl, data, function (response) {
        //debugger;
        response = JSON.parse(response);
        //alert(response);
        var keys = Object.keys(response);
        keys.forEach(function(entry) {
            insertElement(response[entry], entry);
        });
    });
});

// Add data
$(document).ready(function(){
    $('.btn').click(function(){
        var clickBtnValue = $(this).val();
        var task = $('#main').find('input[name="task"]').val();
        if(task === '') {
            
        } else {
            var ajaxurl = 'add.php',
                data = {'action': clickBtnValue, 'task': task};
            $.post(ajaxurl, data, function (response) {
                //alert("Task saved successfully");
                location.reload();
            });
        }
    });
});

// Delete all data
$(document).ready(function(){
    $('.delete-all').click(function(){
        if(confirm('Are you sure you want to delete all tasks from database permanently?')) {
            var ajaxurl = 'delete.php',
                data = {'delete-all': 'delete-all'};
            $.post(ajaxurl, data, function (response) {
                location.reload();
                //alert("Task deleted successfully");
            });
        }
    });
});

function insertElement(element, id) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(element));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    link.id = id;
    li.appendChild(link);
    document.querySelector('.collection').appendChild(li);
    document.querySelector('#task').value = '';
}

function removeTask(e) {
    e.target.parentElement.id;
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete this task?')) {
            var ajaxurl = 'remove.php',
                data = {'remove': 'remove', 'id': e.target.parentElement.id};
            $.post(ajaxurl, data, function (response) {
                location.reload();
            });
        }
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase(); 
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item= task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }
            else{
                task.style.display = 'none';
            }
        });
}
