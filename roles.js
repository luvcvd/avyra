document.getElementById('createRoleBtn').addEventListener('click', function() {
  const roleName = document.getElementById('roleName').value;
  const rolePermissions = document.getElementById('rolePermissions').value;

  if (!roleName || !rolePermissions) {
    alert("Please fill in all fields.");
    return;
  }

  // Save role data to localStorage (for now)
  const roleData = {
    name: roleName,
    permissions: rolePermissions
  };

  let roles = JSON.parse(localStorage.getItem('workspaceRoles')) || [];
  roles.push(roleData);
  localStorage.setItem('workspaceRoles', JSON.stringify(roles));

  // Confirm role creation and proceed
  alert(`${roleName} role created successfully!`);

  // You could proceed to other setup like sessions, punishment formats, etc.
  window.location.href = "workspace-punishments.html"; // Redirect to next step
});
