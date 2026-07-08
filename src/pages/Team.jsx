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
  tag: '',
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
          role: employee.roleValue || 'EMPLOYEE',
          tag: employee.tag || employee.groupName || '',
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
            <h2 className="text-xl font-bold text-slate-950">{isEditing ? 'Edit Member' : 'Create Member'}</h2>
            <p className="mt-1 text-sm text-slate-500">Manage member access and batch tags for the survey panel.</p>
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
            <span className="text-sm font-semibold text-slate-700">Member Tag</span>
            <input
              className="field"
              value={form.tag}
              onChange={(event) => setForm({ ...form, tag: event.target.value })}
              placeholder="Batch 2026-07, Campus A, VIP group..."
            />
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
              <option value="PANELIST">PANELIST</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>

          {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Member'}
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
  const [tagFilter, setTagFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

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
          groupName: form.tag.trim(),
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
        key: 'tag',
        header: 'Tag',
        render: (row) =>
          row.tag ? (
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
              {row.tag}
            </span>
          ) : (
            <span className="text-sm text-slate-400">No tag</span>
          ),
      },
      {
        key: 'roleLabel',
        header: 'Role',
        render: (row) => {
          const tones = {
            ADMIN: 'bg-slate-950 text-white ring-slate-950',
            EMPLOYEE: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
            PANELIST: 'bg-amber-50 text-amber-700 ring-amber-200',
          };
          return (
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${tones[row.roleValue] || tones.EMPLOYEE}`}>
              {row.roleLabel}
            </span>
          );
        },
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

  const tagOptions = useMemo(() => {
    const tags = employees.map((employee) => employee.tag).filter(Boolean);
    return ['All', ...Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b))];
  }, [employees]);

  const roleOptions = useMemo(() => {
    const roles = employees.map((employee) => employee.roleValue).filter(Boolean);
    return ['All', ...Array.from(new Set(roles)).sort((a, b) => a.localeCompare(b))];
  }, [employees]);

  const roleCounts = useMemo(
    () =>
      employees.reduce(
        (accumulator, employee) => {
          accumulator[employee.roleValue] = (accumulator[employee.roleValue] || 0) + 1;
          return accumulator;
        },
        { ADMIN: 0, EMPLOYEE: 0, PANELIST: 0 }
      ),
    [employees]
  );

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const matchesTag = tagFilter === 'All' || employee.tag === tagFilter;
        const matchesRole = roleFilter === 'All' || employee.roleValue === roleFilter;
        return matchesTag && matchesRole;
      }),
    [employees, tagFilter, roleFilter]
  );

  return (
    <>
      <PageHeader
        title="Team"
        description="Create members, assign batch tags, and manage account access."
        action={
          <button className="btn-primary" type="button" onClick={handleCreate}>
            <Plus size={16} />
            Create Member
          </button>
        }
      />

      {error && !modalMode && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

      <section className="card mb-5 grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-sm font-bold text-slate-950">Member Filters</h2>
          <p className="mt-1 text-xs text-slate-500">Filter members by role and batch/source tag.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-bold text-white">Admin {roleCounts.ADMIN}</span>
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700 ring-1 ring-cyan-100">Employee {roleCounts.EMPLOYEE}</span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-100">Panelist {roleCounts.PANELIST}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <select className="field w-full sm:w-56" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role === 'All' ? 'All roles' : role}
              </option>
            ))}
          </select>
          <select className="field w-full sm:w-56" value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag === 'All' ? 'All tags' : tag}
              </option>
            ))}
          </select>
        </div>
      </section>

      <DataTable columns={columns} rows={filteredEmployees} loading={loading} emptyMessage="No members found." />

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
