'use client';

import { useState } from 'react';
import {
  DocumentArrowDownIcon,
  DocumentIcon,
  TableCellsIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  className?: string;
}

export default function ExportButton({
  data,
  filename = 'export',
  className = ""
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    if (data.length === 0) return;

    setIsExporting(true);

    try {
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row =>
          headers.map(header => {
            const value = row[header];
            // Handle values that might contain commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success toast
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast('success', 'Export Successful', 'Data exported to CSV successfully');
      }
    } catch (error) {
      console.error('Export error:', error);
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast('error', 'Export Failed', 'Failed to export data');
      }
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportToJSON = () => {
    if (data.length === 0) return;

    setIsExporting(true);

    try {
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast('success', 'Export Successful', 'Data exported to JSON successfully');
      }
    } catch (error) {
      console.error('Export error:', error);
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast('error', 'Export Failed', 'Failed to export data');
      }
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
      >
        <DocumentArrowDownIcon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700 dark:text-gray-300">
          {isExporting ? 'Exporting...' : 'Export'}
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-2">
            <button
              onClick={exportToCSV}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCellsIcon className="w-4 h-4" />
              <span>Export as CSV</span>
            </button>
            <button
              onClick={exportToJSON}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <DocumentIcon className="w-4 h-4" />
              <span>Export as JSON</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
