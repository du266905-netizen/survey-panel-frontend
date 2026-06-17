/**
 * Check if user has admin role
 * @param {string} role - User role
 * @returns {boolean} - True if user is admin
 */
export function isAdminRole(role) {
  return role === 'admin' || role === 'ADMIN';
}

/**
 * Check if user has user role
 * @param {string} role - User role
 * @returns {boolean} - True if user is regular user
 */
export function isUserRole(role) {
  return role === 'user' || role === 'USER';
}

/**
 * Get user role display name
 * @param {string} role - User role
 * @returns {string} - Display name for the role
 */
export function getRoleDisplayName(role) {
  const roleMap = {
    admin: 'Administrator',
    ADMIN: 'Administrator',
    user: 'User',
    USER: 'User',
  };
  return roleMap[role] || 'Unknown';
}
