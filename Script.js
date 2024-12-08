const addButton = document.querySelector("#addBt");
const tasksContainer = document.querySelector("#tasksContainer");

// Add Sec //
addButton.addEventListener("click", () => {
    const title = document.querySelector("#taskTitle").value.trim();
    const details = document.querySelector("#taskDetails").value.trim();
    const date = document.querySelector("#taskDate").value;

    if (title.length > 0 && details.length > 0 && date) {
        document.querySelector("#taskTitle").value = "";
        document.querySelector("#taskDetails").value = "";
        document.querySelector("#taskDate").value = "";

        // Create task element //
        const taskElement = createTaskElement(title, details, date);
        tasksContainer.append(taskElement);
    } else {
        alert("Please fill out all fields!");
    }
});

// Create Task Element //
function createTaskElement(title, details, date) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    // Task Title //
    const taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = title;

    // Task Details //
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    taskDetails.innerText = details;

    // Task Date //
    const taskDate = document.createElement("div");
    taskDate.classList.add("task-date");
    taskDate.innerText = `Due: ${date}`;

    // Task Actions //
    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    // Edit Button //
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("editBtn");
    editButton.addEventListener("click", () => {
        toggleEdit(taskElement, taskTitle, taskDetails, taskDate, editButton);
    });

    // Delete Button //
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("deleteBtn");
    deleteButton.addEventListener("click", () => {
        taskElement.remove();
    });

    // Done Button //
    const doneButton = document.createElement("button");
    doneButton.innerText = "Done";
    doneButton.classList.add("doneBtn");
    doneButton.addEventListener("click", () => {
        taskElement.classList.toggle("done");
    });

    taskActions.append(editButton, deleteButton, doneButton);

    // Append elements to task container //
    taskElement.append(taskTitle, taskDetails, taskDate, taskActions);
    return taskElement;
}

// Toggle Edit Mode //
function toggleEdit(taskElement, taskTitle, taskDetails, taskDate, editButton) {
    if (editButton.innerText === "Edit") {
        // Switch to edit mode //
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = taskTitle.innerText;

        const detailsInput = document.createElement("textarea");
        detailsInput.value = taskDetails.innerText;

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = taskDate.innerText.replace("Due: ", "");

        taskElement.replaceChild(titleInput, taskTitle);
        taskElement.replaceChild(detailsInput, taskDetails);
        taskElement.replaceChild(dateInput, taskDate);

        editButton.innerText = "Save";
    } else {
        // Save edited task //
        const titleInput = taskElement.querySelector("input[type='text']");
        const detailsInput = taskElement.querySelector("textarea");
        const dateInput = taskElement.querySelector("input[type='date']");

        if (titleInput.value.trim().length > 0 && detailsInput.value.trim().length > 0 && dateInput.value) {
            taskTitle.innerText = titleInput.value.trim();
            taskDetails.innerText = detailsInput.value.trim();
            taskDate.innerText = `Due: ${dateInput.value}`;

            taskElement.replaceChild(taskTitle, titleInput);
            taskElement.replaceChild(taskDetails, detailsInput);
            taskElement.replaceChild(taskDate, dateInput);

            editButton.innerText = "Edit";
        } else {
            alert("Please fill out all fields!");
        }
    }
}