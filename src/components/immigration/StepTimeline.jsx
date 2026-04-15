import { CheckCircle, Circle } from 'lucide-react';

export default function StepTimeline({ steps }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-500)' }}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 my-1" style={{ backgroundColor: 'var(--color-primary-200)' }} />
            )}
          </div>
          <div className="pb-6 flex-1">
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{step.step}</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-primary-500)' }}>{step.timeline}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
