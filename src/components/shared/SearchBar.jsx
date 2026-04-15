import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search...', onSearch, className = '', size = 'sm' }) {
  const [value, setValue] = useState('');
  const timer = useRef(null);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch?.(v), 300);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const isLg = size === 'lg';

  return (
    <div className={`relative ${className}`}>
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 ${isLg ? 'h-5 w-5' : 'h-4 w-4'}`}
        style={{ color: 'var(--color-text-light)' }}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-full bg-white pl-10 pr-4 outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary-400)] ${isLg ? 'py-4 text-base shadow-lg' : 'py-2.5 text-sm shadow-sm'}`}
        style={{ border: '1px solid var(--color-border)', fontFamily: 'var(--font-body)' }}
      />
    </div>
  );
}
