import { useEffect, useMemo, useState } from 'react';
import { Edit3, Plus, Trash2, X } from 'lucide-react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../api/realApi';
import { useAuth } from '../components/AuthContext';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  role: 'EMPLOYEE',
};

const formatDate = (value) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value));
};

function EmployeeFormModal({ employee, onClose, onSubmit, saving, error }) {
  const [form, setForm] = useState(() =>
    employee
      ? {
          name: employee.name || '',
          email: employee.email || '',
          password: '',
          role: employee.roleLabel || 'EMPLOYEE',
        }
      : emptyForm
  );

  const isEditing = Boolean(employee);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <section className="card w-full max-w-lg p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">{isEditing ? 'Edit Employee' : 'Create Employee'}</h2>
            <p className="mt-1 text-sm text-slate-500">Manage employee access for the survey panel.</p>
          </div>
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Name</span>
            <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input className="field" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <input
              className="field"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required={!isEditing}
              placeholder={isEditing ? 'Leave blank to keep current password' : ''}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Role</span>
            <select className="field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>

          {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Employee'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function Team() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const closeModal = () => {
    setModalMode(null);
    setSelectedEmployee(null);
    setError('');
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setModalMode('create');
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    setError('');

    try {
      if (selectedEmployee) {
        const payload = {
          name: form.name,
          email: form.email,
          role: form.role,
        };
        if (form.password) payload.password = form.password;
        await updateEmployee(selectedEmployee.id, payload);
      } else {
        await createEmployee(form);
      }
      closeModal();
      await loadEmployees();
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to save employee.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (employee) => {
    setError('');

    try {
      const response = await updateEmployee(employee.id, { isActive: !employee.isActive });
      setEmployees((current) => current.map((item) => (item.id === employee.id ? response.data : item)));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update employee status.');
    }
  };

  const handleDelete = async (employee) => {
    if (!window.confirm(`Delete ${employee.name}? This cannot be undone.`)) return;
    setError('');

    try {
      await deleteEmployee(employee.id);
      setEmployees((current) => current.filter((item) => item.id !== employee.id));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to delete employee.');
    }
  };

  const columns = useMemo(
    () => [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      {
        key: 'roleLabel',
        header: 'Role',
        render: (row) => (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">{row.roleLabel}</span>
        ),
      },
      { key: 'createdAt', header: 'Created Date', render: (row) => formatDate(row.createdAt) },
      {
        key: 'isActive',
        header: 'Active',
        render: (row) => (
          <button
            className={`relative h-6 w-11 rounded-full transition disabled:cursor-not-allowed disabled:opacity-40 ${row.isActive ? 'bg-primary' : 'bg-slate-300'}`}
            type="button"
            onClick={() => handleToggle(row)}
            disabled={row.id === user?.id}
            aria-label={`${row.isActive ? 'Deactivate' : 'Activate'} ${row.name}`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${row.isActive ? 'left-6' : 'left-1'}`}
            />
          </button>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => (
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50" type="button" onClick={() => handleEdit(row)}>
              <Edit3 size={15} />
            </button>
            <button
              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
              onClick={() => handleDelete(row)}
              disabled={row.id === user?.id}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ),
      },
    ],
    [user?.id]
  );

  return (
    <>
      <PageHeader
        title="Team"
        description="Create employees and manage account access."
        action={
          <button className="btn-primary" type="button" onClick={handleCreate}>
            <Plus size={16} />
            Create Employee
          </button>
        }
      />

      {error && !modalMode && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

      <DataTable columns={columns} rows={employees} loading={loading} emptyMessage="No employees found." />

      {modalMode && (
        <EmployeeFormModal
          employee={selectedEmployee}
          saving={saving}
          error={error}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
