import React from 'react';
import { SortOption } from '../utils/bazarLogic';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  id?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  id = 'sort-select',
}) => {
  return (
    <div className="inline-flex items-center gap-2.5">
      <label
        htmlFor={id}
        className="text-xs sm:text-sm font-bold text-[#2e473b] whitespace-nowrap"
      >
        সাজান
      </label>
      <div className="relative">
        <select
          id={id}
          aria-label="সাজান"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-[#c6dbd0] hover:border-[#059669] text-[#0f1f17] text-xs sm:text-sm font-bold rounded-xl pl-3.5 pr-9 py-2 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
        <ChevronDown
          className="w-4 h-4 text-[#047857] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
