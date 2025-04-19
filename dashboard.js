document.addEventListener('DOMContentLoaded', () => {
  const workspaceGrid = document.getElementById('workspaceGrid');
  const createBtn = document.getElementById('createWorkspaceBtn');
  const noWorkspaces = document.getElementById('noWorkspaces');

  // Simulated load from localStorage (replace with backend fetch later)
  const workspaces = JSON.parse(localStorage.getItem('userWorkspaces')) || [];

  function renderWorkspaces() {
    workspaceGrid.innerHTML = '';

    if (workspaces.length === 0) {
      noWorkspaces.style.display = 'block';
    } else {
      noWorkspaces.style.display = 'none';
    }

    workspaces.forEach((ws, i) => {
      const card = document.createElement('div');
      card.classList.add('workspace-card');

      card.innerHTML = `
        <div class="workspace-name">${ws.name}</div>
        <div class="workspace-actions">
          <button onclick="alert('Open: ${ws.name}')">Open</button>
          <button onclick="deleteWorkspace(${i})">Delete</button>
        </div>
      `;

      workspaceGrid.appendChild(card);
    });

    if (workspaces.length >= 3) {
      createBtn.disabled = true;
      createBtn.textContent = 'Workspace Limit Reached';
    }
  }

  function deleteWorkspace(index) {
    workspaces.splice(index, 1);
    localStorage.setItem('userWorkspaces', JSON.stringify(workspaces));
    renderWorkspaces();
  }

  // Make delete function global
  window.deleteWorkspace = deleteWorkspace;

  createBtn.addEventListener('click', () => {
    if (workspaces.length < 3) {
      window.location.href = 'workspace-creation.html';
    }
  });

  renderWorkspaces();
});
