npm install flutterwave-node
// Display tasks dynamically on the user dashboard
document.addEventListener('DOMContentLoaded', async () => {
  const userId = 'userId'; // You need to get this dynamically
  const response = await fetch(`/tasks/${userId}/tasks`);
  const tasks = await response.json();

  const tasksTable = document.querySelector('#tasksTable tbody');
  tasks.forEach(task => {
    const taskRow = document.createElement('tr');
    taskRow.innerHTML = `
      <td>${task.taskName}</td>
      <td>${task.socialMedia}</td>
      <td>${task.quantity}</td>
      <td>${task.status}</td>
      <td>
        <button class="approve-btn" data-task-id="${task._id}">Approve</button>
        <button class="reject-btn" data-task-id="${task._id}">Reject</button>
      </td>
    `;
    tasksTable.appendChild(taskRow);
  });
});

// Handle task approval/rejection
document.querySelector('tbody').addEventListener('click', async (e) => {
  if (e.target.classList.contains('approve-btn')) {
    const taskId = e.target.getAttribute('data-task-id');
    await fetch(`/tasks/update/${taskId}`, { method: 'POST', body: JSON.stringify({ status: 'approved' }) });
    alert('Task approved');
  } else if (e.target.classList.contains('reject-btn')) {
    const taskId = e.target.getAttribute('data-task-id');
    await fetch(`/tasks/update/${taskId}`, { method: 'POST', body: JSON.stringify({ status: 'rejected' }) });
    alert('Task rejected');
  }
});