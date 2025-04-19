document.getElementById('nextBtn').addEventListener('click', function() {
  const workspaceName = document.getElementById('workspaceName').value;
  const workspaceDescription = document.getElementById('workspaceDescription').value;
  const colorScheme = document.getElementById('colorScheme').value;

  if (!workspaceName || !workspaceDescription || !colorScheme) {
    alert("Please fill in all fields.");
    return;
  }

  // Save workspace data to localStorage (for now)
  const workspaceData = {
    name: workspaceName,
    description: workspaceDescription,
    colorScheme: colorScheme
  };

  localStorage.setItem('workspaceData', JSON.stringify(workspaceData));

  // Proceed to next step (role creation, session management, etc.)
  window.location.href = "workspace-roles.html"; // Redirect to next page
});
