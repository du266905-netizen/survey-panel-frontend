import { Bar, BarChart, Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

/* Monochrome on purpose: the research end has one ink colour and no accent.
   Charts borrow the delivery preview's donut + bars so the two pages agree. */
const TONES = ['#6f4a1c', '#96682f', '#b98d4e', '#cfa76c', '#dfc39a', '#ecd9bd', '#f6ecda'];

const tooltipStyle = {
  border: '1px solid #e5e3dd',
  borderRadius: 8,
  background: '#ffffff',
  boxShadow: '0 6px 18px rgba(20,20,19,.08)',
  color: '#141413',
  fontFamily: 'inherit',
  fontSize: 12,
  padding: '6px 9px',
};

function ValueTooltip({ active, payload, suffix }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <strong style={{ fontWeight: 600 }}>{item.label}</strong>
      <span style={{ color: '#6f6f68' }}> · {item.count}{suffix || ''} · {Math.round(item.percent)}%</span>
    </div>
  );
}

export default function ResultsChart({ type, rows, height = 220 }) {
  if (!rows?.length) return null;

  if (type === 'RATING') {
    const data = [...rows].sort((a, b) => (Number(a.label) || 0) - (Number(b.label) || 0));
    return (
      <div className="brd-chart">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 10, right: 4, bottom: 0, left: 4 }} barCategoryGap="18%">
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: '#e5e3dd' }}
              tick={{ fontSize: 12, fill: '#6f6f68' }}
              interval={0}
            />
            <YAxis hide />
            <Tooltip cursor={{ fill: 'rgba(20,20,19,.04)' }} content={<ValueTooltip />} />
            <Bar dataKey="count" fill="#96682f" radius={[3, 3, 0, 0]} maxBarSize={48}>
              <LabelList dataKey="count" position="top" fill="#6f6f68" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'SINGLE_CHOICE') {
    const top = rows.slice(0, 6);
    const rest = rows.slice(6);
    const data = rest.length
      ? [...top, { label: '其他', count: rest.reduce((sum, row) => sum + row.count, 0), percent: rest.reduce((sum, row) => sum + row.percent, 0) }]
      : top;
    return (
      <div className="brd-chart brd-chart--split">
        <div className="brd-chart-donut">
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                innerRadius="62%"
                outerRadius="92%"
                paddingAngle={1}
                stroke="#ffffff"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((row, index) => (
                  <Cell key={row.label} fill={TONES[index % TONES.length]} />
                ))}
              </Pie>
              <Tooltip content={<ValueTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <span className="brd-chart-donut-total">{rows.reduce((sum, row) => sum + row.count, 0)}</span>
        </div>
        <ul className="brd-chart-legend">
          {data.map((row, index) => (
            <li key={row.label}>
              <i style={{ background: TONES[index % TONES.length] }} />
              <span title={row.label}>{row.label}</span>
              <b>{Math.round(row.percent)}%</b>
              <small>{row.count}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const data = rows.slice(0, 10);
  return (
    <div className="brd-chart">
      <ResponsiveContainer width="100%" height={Math.max(120, data.length * 34)}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 0 }} barCategoryGap="24%">
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={176}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#4a4a45' }}
          />
          <Tooltip cursor={{ fill: 'rgba(20,20,19,.04)' }} content={<ValueTooltip />} />
          <Bar dataKey="count" fill="#96682f" radius={[0, 3, 3, 0]} maxBarSize={14}>
            <LabelList dataKey="count" position="right" fill="#6f6f68" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
