import { Filter, RefreshCcw, SlidersHorizontal, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAdminPanelists } from '../api/realApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import {
  adminAreasForCountry,
  ageRangeOptions,
  childrenAgeBandOptions,
  childrenOptions,
  countryOptions,
  educationOptions,
  employmentOptions,
  genderOptions,
  householdIncomeOptions,
  industryOptions,
  maritalStatusOptions,
} from '../constants/panelProfileOptions';

const initialFilters = {
  country: '',
  adminAreaCode: '',
  cityOrRegion: '',
  postalCode: '',
  birthYearMin: '',
  birthYearMax: '',
  ageRange: '',
  gender: '',
  educationLevel: '',
  employmentStatus: '',
  industry: '',
  maritalStatus: '',
  hasChildren: '',
  childrenAgeBand: '',
  householdIncomeMin: '',
  householdIncomeMax: '',
  profileCompleted: 'true',
};

const incomeFloorOptions = householdIncomeOptions
  .filter((option) => !['under_25000', 'prefer_not_to_say'].includes(option.value))
  .map((option) => ({
    ...option,
    value: option.value.split('_')[0],
  }));

const incomeCeilingOptions = [
  { value: '24999', label: 'Under $25,000' },
  { value: '49999', label: 'Up to $49,999' },
  { value: '74999', label: 'Up to $74,999' },
  { value: '99999', label: 'Up to $99,999' },
  { value: '149999', label: 'Up to $149,999' },
  { value: '199999', label: 'Up to $199,999' },
];

function SelectField({ label, value, onChange, options, placeholder = 'Any' }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
      {label}
      <select className="field mt-2 py-2.5 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function TextField({ label, value, onChange, placeholder, inputMode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
      {label}
      <input className="field mt-2 py-2.5 text-sm" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} inputMode={inputMode} />
    </label>
  );
}

function labelFor(options, value) {
  return options.find((option) => option.value === value)?.label || value || '—';
}

export default function AdminPanelists() {
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], meta: { total: 0, page: 1, totalPages: 1 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPanelists = async () => {
    setLoading(true);
    setError('');
    try {
      const params = Object.fromEntries(Object.entries({ ...activeFilters, page }).filter(([, value]) => value !== ''));
      const response = await getAdminPanelists(params);
      setResult(response.data);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load panel profiles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPanelists();
  }, [activeFilters, page]);

  const updateDraftFilter = (fieldName, value) => {
    setDraftFilters((current) => ({
      ...current,
      [fieldName]: value,
      ...(fieldName === 'country' ? { adminAreaCode: '', cityOrRegion: '', postalCode: '' } : {}),
    }));
  };

  const applyFilters = (event) => {
    event.preventDefault();
    setPage(1);
    setActiveFilters(draftFilters);
  };

  const clearFilters = () => {
    setDraftFilters(initialFilters);
    setActiveFilters(initialFilters);
    setPage(1);
  };

  const columns = [
    {
      key: 'panelist',
      header: 'Panelist',
      render: (row) => <div><p className="font-bold text-slate-950">{row.user.displayName}</p><p className="mt-0.5 text-xs text-slate-500">{row.profile.publicId}</p></div>,
    },
    {
      key: 'profile',
      header: 'Profile',
      render: (row) => <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.profile.profileCompletedAt ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{row.profile.profileCompletedAt ? 'Complete' : 'In progress'}</span>,
    },
    {
      key: 'demographics',
      header: 'Demographics',
      render: (row) => <div className="space-y-1 text-sm"><p>{labelFor(ageRangeOptions, row.profile.ageRange)}</p><p className="text-slate-500">{labelFor(genderOptions, row.profile.gender)}</p></div>,
    },
    {
      key: 'location',
      header: 'Location',
      render: (row) => <div className="space-y-1 text-sm"><p>{labelFor(countryOptions, row.profile.country)}</p><p className="text-slate-500">{row.profile.adminAreaCode || row.profile.cityOrRegion || '—'}</p></div>,
    },
    {
      key: 'household',
      header: 'Household',
      render: (row) => <div className="space-y-1 text-sm"><p>{labelFor(maritalStatusOptions, row.profile.maritalStatus)}</p><p className="text-slate-500">Children: {labelFor(childrenOptions, row.profile.hasChildren)}</p></div>,
    },
    {
      key: 'income',
      header: 'Income',
      render: (row) => <span className="text-sm">{labelFor(householdIncomeOptions, row.profile.householdIncomeUsd)}</span>,
    },
  ];

  const pageMeta = result.meta || {};

  return (
    <div className="space-y-6">
      <PageHeader
        title="Panel Profiles"
        description="Query self-reported ORBIT panel profiles. Provider-returned signals remain isolated and are never included in these filters."
        action={<button className="btn-secondary" type="button" onClick={loadPanelists} disabled={loading}><RefreshCcw size={16} /> Refresh</button>}
      />

      <section className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><Filter size={19} /></span>
            <div><h2 className="text-lg font-bold text-slate-950">Audience builder</h2><p className="mt-1 text-sm text-slate-500">All selected filters are combined with AND. The count and list come from production profile records.</p></div>
          </div>
          <div className="rounded-xl bg-slate-950 px-4 py-3 text-right text-white"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/55">Matched panelists</p><p className="mt-0.5 text-2xl font-black">{loading ? '—' : pageMeta.total || 0}</p></div>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4" onSubmit={applyFilters}>
          <SelectField label="Country" value={draftFilters.country} onChange={(value) => updateDraftFilter('country', value)} options={countryOptions} />
          <SelectField label="State / Province" value={draftFilters.adminAreaCode} onChange={(value) => updateDraftFilter('adminAreaCode', value)} options={adminAreasForCountry(draftFilters.country)} placeholder={draftFilters.country ? 'Any area' : 'Select country first'} />
          <TextField label="City / Region" value={draftFilters.cityOrRegion} onChange={(value) => updateDraftFilter('cityOrRegion', value)} placeholder="Contains text" />
          <TextField label="Postal code" value={draftFilters.postalCode} onChange={(value) => updateDraftFilter('postalCode', value)} placeholder="Exact code" />
          <TextField label="Birth year from" value={draftFilters.birthYearMin} onChange={(value) => updateDraftFilter('birthYearMin', value)} placeholder="e.g. 1980" inputMode="numeric" />
          <TextField label="Birth year to" value={draftFilters.birthYearMax} onChange={(value) => updateDraftFilter('birthYearMax', value)} placeholder="e.g. 2000" inputMode="numeric" />
          <SelectField label="Age range" value={draftFilters.ageRange} onChange={(value) => updateDraftFilter('ageRange', value)} options={ageRangeOptions} />
          <SelectField label="Gender" value={draftFilters.gender} onChange={(value) => updateDraftFilter('gender', value)} options={genderOptions} />
          <SelectField label="Education" value={draftFilters.educationLevel} onChange={(value) => updateDraftFilter('educationLevel', value)} options={educationOptions} />
          <SelectField label="Employment" value={draftFilters.employmentStatus} onChange={(value) => updateDraftFilter('employmentStatus', value)} options={employmentOptions} />
          <SelectField label="Industry" value={draftFilters.industry} onChange={(value) => updateDraftFilter('industry', value)} options={industryOptions} />
          <SelectField label="Marital status" value={draftFilters.maritalStatus} onChange={(value) => updateDraftFilter('maritalStatus', value)} options={maritalStatusOptions} />
          <SelectField label="Children" value={draftFilters.hasChildren} onChange={(value) => updateDraftFilter('hasChildren', value)} options={childrenOptions} />
          <SelectField label="Child age band" value={draftFilters.childrenAgeBand} onChange={(value) => updateDraftFilter('childrenAgeBand', value)} options={childrenAgeBandOptions} />
          <SelectField label="Household income at least" value={draftFilters.householdIncomeMin} onChange={(value) => updateDraftFilter('householdIncomeMin', value)} options={incomeFloorOptions} />
          <SelectField label="Household income at most" value={draftFilters.householdIncomeMax} onChange={(value) => updateDraftFilter('householdIncomeMax', value)} options={incomeCeilingOptions} />
          <SelectField label="Profile status" value={draftFilters.profileCompleted} onChange={(value) => updateDraftFilter('profileCompleted', value)} options={[{ value: 'true', label: 'Complete' }, { value: 'false', label: 'In progress' }]} placeholder="Any status" />
          <div className="flex items-end gap-3"><button className="btn-primary flex-1" type="submit"><SlidersHorizontal size={16} /> Apply filters</button><button className="btn-secondary" type="button" onClick={clearFilters}>Clear</button></div>
        </form>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h2 className="flex items-center gap-2 text-lg font-bold text-slate-950"><Users size={18} className="text-cyan-700" /> Matched users</h2><p className="mt-1 text-sm text-slate-500">Page {pageMeta.page || 1} of {pageMeta.totalPages || 1}</p></div></div>
        <DataTable columns={columns} rows={result.items || []} loading={loading} emptyMessage="No panelists match the current filters." />
        <div className="mt-4 flex items-center justify-end gap-3"><button className="btn-secondary px-3 py-2" type="button" disabled={loading || (pageMeta.page || 1) <= 1} onClick={() => setPage((current) => current - 1)}>Previous</button><button className="btn-secondary px-3 py-2" type="button" disabled={loading || (pageMeta.page || 1) >= (pageMeta.totalPages || 1)} onClick={() => setPage((current) => current + 1)}>Next</button></div>
      </section>
    </div>
  );
}
