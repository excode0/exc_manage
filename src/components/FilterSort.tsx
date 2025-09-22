'use client';

import { useState } from 'react';
import { FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSortProps {
  filters?: {
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  sortOptions?: FilterOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  className?: string;
}

export default function FilterSort({
  filters = [],
  sortOptions = [],
  sortValue = '',
  onSortChange,
  className = ""
}: FilterSortProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Filter Button */}
      {filters.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">Filters</span>
          </button>

          {showFilters && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div className="p-4 space-y-4">
                {filters.map((filter, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {filter.label}
                    </label>
                    <select
                      value={filter.value}
                      onChange={(e) => filter.onChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sort Dropdown */}
      {sortOptions.length > 0 && onSortChange && (
        <div className="relative">
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 appearance-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ArrowsUpDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
