document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let tasks = [];

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();

    if (taskTitle === '') {
      alert("Task title can't be empty!");
      return;
    }

    const task = {
      id: Date.now(),
      title: taskTitle,
      completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks(getCurrentFilter());
  });

  function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `<li style="text-align: center; color: #888;">No tasks here...</li>`;
      return;
    }

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${task.title}</span>
        <div class="task-actions">
          <button onclick="toggleComplete(${task.id})">✅</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  window.toggleComplete = function(id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks(getCurrentFilter());
  };

  window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(getCurrentFilter());
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      button.classList.add('active');
      renderTasks(button.dataset.filter);
    });
  });

  function getCurrentFilter() {
    return document.querySelector('.filter-btn.active').dataset.filter;
  }

  renderTasks();
});
