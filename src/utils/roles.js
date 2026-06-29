export const isAdminRole = (role) => String(role || '').toLowerCase() === 'admin';

export const isEmployeeRole = (role) => String(role || '').toLowerCase() === 'employee';
