import { Edit2, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    password: '',
    role: 'USER',
    memberId: '',
    groupName: '',
    teamName: '',
  });

  // 获取员工列表
  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/api/employees?page=1&pageSize=50');
      setEmployees(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 验证必填字段
    if (!formData.email || !formData.displayName) {
      setError('Email and Display Name are required');
      return;
    }

    if (!editingId && !formData.password) {
      setError('Password is required for new employees');
      return;
    }

    try {
      if (editingId) {
        // 更新员工
        const updateData = { ...formData };
        delete updateData.password; // 编辑时不更新密码
        await apiClient.put(`/api/employees/${editingId}`, updateData);
        setSuccess('Employee updated successfully');
      } else {
        // 创建新员工
        await apiClient.post('/api/employees', formData);
        setSuccess('Employee created successfully');
      }

      // 重置表单
      setFormData({
        email: '',
        displayName: '',
        password: '',
        role: 'USER',
        memberId: '',
        groupName: '',
        teamName: '',
      });
      setEditingId(null);
      setShowForm(false);

      // 刷新列表
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save employee');
    }
  };

  // 处理编辑
  const handleEdit = (employee) => {
    setFormData({
      email: employee.email,
      displayName: employee.displayName,
      password: '',
      role: employee.role,
      memberId: employee.memberId || '',
      groupName: employee.groupName || '',
      teamName: employee.teamName || '',
    });
    setEditingId(employee.id);
    setShowForm(true);
  };

  // 处理删除
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    setError('');
    try {
      await apiClient.delete(`/api/employees/${id}`);
      setSuccess('Employee deleted successfully');
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete employee');
    }
  };

  // 处理取消
  const handleCancel = () => {
    setFormData({
      email: '',
      displayName: '',
      password: '',
      role: 'USER',
      memberId: '',
      groupName: '',
      teamName: '',
    });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Employee Management</h1>
          <p className="mt-1 text-sm text-slate-600">Create, edit, and manage employee accounts</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) handleCancel();
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'New Employee'}
        </button>
      </div>

      {/* 消息提示 */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* 创建/编辑表单 */}
      {showForm && (
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {editingId ? 'Edit Employee' : 'Create New Employee'}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!!editingId}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
                placeholder="employee@example.com"
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Display Name *</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Password */}
            {!editingId && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Member ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Member ID</label>
              <input
                type="text"
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="EMP-123456"
              />
            </div>

            {/* Group Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Group Name</label>
              <input
                type="text"
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Department Name"
              />
            </div>

            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Team Name</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Team Name"
              />
            </div>

            {/* 按钮 */}
            <div className="flex gap-2 md:col-span-2">
              <button type="submit" className="btn-primary flex-1">
                {editingId ? 'Update Employee' : 'Create Employee'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 员工列表 */}
      <div className="rounded-lg border border-slate-200 bg-white">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No employees found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Member ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Group</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Team</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{employee.displayName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{employee.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          employee.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{employee.memberId || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{employee.groupName || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{employee.teamName || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
