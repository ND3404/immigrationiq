import { ChevronRight, Clock, CheckCircle } from 'lucide-react';

export default function TimelineVisualizer({ scenario }) {
  if (!scenario) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{scenario.name}</h3>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>{scenario.description}</p>
      </div>

      {/* Total time range */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Optimistic', value: scenario.totalRange.optimistic, color: 'var(--color-success-500)' },
          { label: 'Average', value: scenario.totalRange.average, color: 'var(--color-primary-500)' },
          { label: 'Pessimistic', value: scenario.totalRange.pessimistic, color: 'var(--color-secondary-500)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-lg p-3 text-center" style={{ backgroundColor: `${color}10`, border: `1px solid ${color}30` }}>
            <p className="text-xs font-medium" style={{ color }}>{label}</p>
            <p className="text-lg font-bold mt-0.5" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {scenario.phases.map((phase, i) => (
          <div key={i} className="card">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-500)' }}>
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{phase.name}</h4>
                  <span className="badge-time">
                    <Clock className="h-3 w-3" /> {phase.duration}
                  </span>
                </div>
                <ul className="mt-2 space-y-1">
                  {phase.milestones.map((m, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success-500)' }} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {i < scenario.phases.length - 1 && (
              <div className="flex justify-center mt-3">
                <ChevronRight className="h-5 w-5 rotate-90" style={{ color: 'var(--color-primary-300)' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
