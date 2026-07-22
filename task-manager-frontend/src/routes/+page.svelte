<script>
  import { onMount } from 'svelte';

  let tasks = [];
  let newTitle = "";

  // Load tasks from backend
  async function loadTasks() {
    const res = await fetch("/api/tasks");  // proxy forwards to backend
    tasks = await res.json();
  }

  // Add task
  async function addTask() {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, completed: false })
    });
    const newTask = await res.json();
    tasks = [...tasks, newTask];
    newTitle = ""; // clear input
  }

  // Toggle task completion
  async function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed })
    });
    const updated = await res.json();
    tasks = tasks.map(t => t.id === id ? updated : t);
  }

  // Delete task
  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    tasks = tasks.filter(t => t.id !== id);
  }

  onMount(loadTasks);
</script>

<h1>Task Manager</h1>

<input bind:value={newTitle} placeholder="Enter task title" />
<button on:click={addTask}>➕ Add Task</button>

<ul>
  {#each tasks as task}
    <li>
      <span>{task.title} - {task.completed ? "✅" : "❌"}</span>
      <button on:click={() => toggleTask(task.id)}>Toggle</button>
      <button on:click={() => deleteTask(task.id)}>Delete</button>
    </li>
  {/each}
</ul>
