import { useState, useEffect } from 'react';
import { Check, Square, CheckSquare, Download } from 'lucide-react';
import { saveChecklist, loadChecklist } from '../../utils/storage';

export default function DocumentChecklist({ documents, visaType, extraInfo = [] }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = loadChecklist(visaType);
    if (saved.length === documents.length) {
      setItems(saved);
    } else {
      setItems(documents.map((doc, i) => ({ id: `${visaType}-${i}`, label: doc, checked: false, tip: extraInfo[i] || '' })));
    }
  }, [documents, visaType]);

  const toggle = (id) => {
    const updated = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(updated);
    saveChecklist(visaType, updated);
  };

  const checkedCount = items.filter(i => i.checked).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium" style={{ color: 'var(--color-text)' }}>{checkedCount} of {items.length} gathered</span>
          <span className="font-semibold" style={{ color: progress === 100 ? 'var(--color-success-500)' : 'var(--color-primary-500)' }}>{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: progress === 100 ? 'var(--color-success-500)' : 'var(--color-primary-500)' }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className={`w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${item.checked ? 'bg-[var(--color-success-50)]' : 'bg-white hover:bg-gray-50'}`}
              style={{ border: `1px solid ${item.checked ? 'var(--color-success-500)' : 'var(--color-border)'}` }}
            >
              {item.checked ? (
                <CheckSquare className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success-500)' }} />
              ) : (
                <Square className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-text-light)' }} />
              )}
              <span className={`text-sm ${item.checked ? 'line-through' : ''}`} style={{ color: item.checked ? 'var(--color-text-light)' : 'var(--color-text)' }}>
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
