// Function to update the current date and time
function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    const timeString = now.toLocaleTimeString();
    document.getElementById('dateTime').textContent = `${dateString}, ${timeString}`;
}

// Call updateDateTime every second
setInterval(updateDateTime, 1000);

// Function to check if task list is empty and show/hide message
function checkEmptyMessage() {
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    emptyMessage.style.display = taskList.children.length === 0 ? 'block' : 'none';
}

// Initial check for empty message on page load
checkEmptyMessage();

// Add task functionality
document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTaskToDOM(taskText);
        taskInput.value = '';
        taskInput.focus();
        checkEmptyMessage();
    } else {
        alert("Please add a task to do, then click Add.");
    }
});

// Function to toggle dark/light mode using sun/moon icons
function setMode(mode) {
    if (mode === 'light') {
        document.body.classList.remove('dark-mode');
        document.getElementById('modeText').textContent = 'Light Mode';
        document.getElementById('sun').style.display = 'none';
        document.getElementById('moon').style.display = 'inline';
    } else if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('modeText').textContent = 'Dark Mode';
        document.getElementById('moon').style.display = 'none';
        document.getElementById('sun').style.display = 'inline';
    }
}

// Set initial state based on default light mode
setMode('light');

// Set up event listeners for sun and moon icons
document.getElementById('sun').addEventListener('click', function() {
    setMode('light');
});

document.getElementById('moon').addEventListener('click', function() {
    setMode('dark');
});

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    // Create serial number span
    const serialNumber = document.createElement('span');
    serialNumber.className = 'serial-number';
    serialNumber.textContent = taskList.children.length + 1 + '.';

    // Create checkbox for marking the task as done
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    // Create task text span
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = taskText;

    // Get current time for the task
    const taskTime = new Date().toLocaleTimeString();
    const timeSpan = document.createElement('span');
    timeSpan.className = 'task-time';
    timeSpan.textContent = `(Saved at ${taskTime})`;

    // Checkbox event listener for marking tasks as done
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            alert("Congratulations! You've completed the task.");
            taskTextSpan.style.textDecoration = "line-through";

            // Check if all tasks are done
            const allTasksDone = Array.from(document.querySelectorAll('#taskList li')).every(task => 
                task.querySelector('input[type=checkbox]').checked);
            if (allTasksDone) {
                alert("Great job! All tasks are completed!");
            }
        } else {
            taskTextSpan.style.textDecoration = "none";
        }
    });

    // Add an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        const newTaskText = prompt("Edit your task:", taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskTextSpan.textContent = newTaskText;
        }
    };

    // Add a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        li.remove();
        updateSerialNumbers();
        checkEmptyMessage();
    };

    // Append all elements to the list item
    li.appendChild(serialNumber);
    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(timeSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    
    checkEmptyMessage();
}

// Function to update serial numbers after deletion
function updateSerialNumbers() {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach((task, index) => {
        task.querySelector('.serial-number').textContent = (index + 1) + '.';
    });
}

// Add event listener for help icon click event
document.getElementById('helpIcon').addEventListener('click', function() {
    alert("This is your To-Do List application! You can add tasks, edit them, and delete them as needed. Use the sun/moon icons to switch between light and dark modes.");
});
