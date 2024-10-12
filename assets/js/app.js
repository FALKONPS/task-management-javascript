const status_process = {
  1: 'To Do',
  2: 'In Progress',
  3: 'Done',
};

let tasks = [];

function createDummyTask(task = {}) {
  let id = 0;
  let taskIDArray = tasks.map((item) => item.id);
  while (true) {
    if (taskIDArray.includes(id)) {
      id++;
    } else {
      break;
    }
  }

  task.id = id;
  task.title = `task ${id}`;
  task.description = `description ${id}`;
  task.labels = ['Nan'];
  task.status = 1;
  tasks.push(task);
  return task;
}

function deleteTaskById(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index >= 0) {
    tasks.splice(index, 1);
  }
}

function editTaskById(id, update = {}) {
  const index = tasks.findIndex((task) => task.id === id);
  // overwrite values
  tasks[index] = Object.assign({}, tasks[index], update);
}

function toggleStatus(id, value = -1) {
  const index = tasks.findIndex((task) => task.id === id);
  if (value > 0) {
    tasks[index].status = value;
  } else {
    tasks[index].status = ((tasks[index].status + 1) % 3) + 1;
  }
  return tasks[index].status;
}

function viewTasks() {
  console.log(tasks);
}

function renderTasks(filteredTasks = tasks) {
  const tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = '';

  filteredTasks.forEach((task) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <div class="labels">
              ${task.labels
                .map((label) => `<span class="label">${label}</span>`)
                .join('')} 
          </div>
          <p>Status: ${status_process[task.status]}</p>
          <p>ID: ${task.id}</p>
      `;
    tasksContainer.appendChild(taskCard);
  });
}

  });
}

fetch('./assets/data/tasks.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(tasks);
    tasks = data;
    renderTasks();
  });
