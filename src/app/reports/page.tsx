'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import LineChart from '@/components/LineChart';
import SearchBar from '@/components/SearchBar';
import FilterSort from '@/components/FilterSort';
import ExportButton from '@/components/ExportButton';
import {
  DocumentTextIcon,
  DocumentPlusIcon,
  CalendarIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const reportsData = [
  {
    id: 1,
    name: 'Monthly Sales Report',
    type: 'Sales',
    createdBy: 'Alice Johnson',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    status: 'Completed',
    downloads: 245
  },
  {
    id: 2,
    name: 'User Activity Analysis',
    type: 'Analytics',
    createdBy: 'Bob Smith',
    createdAt: '2024-01-14',
    lastModified: '2024-01-19',
    status: 'In Progress',
    downloads: 189
  },
  {
    id: 3,
    name: 'Client Performance Report',
    type: 'Performance',
    createdBy: 'Carol Davis',
    createdAt: '2024-01-13',
    lastModified: '2024-01-18',
    status: 'Completed',
    downloads: 156
  },
  {
    id: 4,
    name: 'Project Status Overview',
    type: 'Project',
    createdBy: 'David Wilson',
    createdAt: '2024-01-12',
    lastModified: '2024-01-17',
    status: 'Completed',
    downloads: 203
  },
  {
    id: 5,
    name: 'Financial Summary Q1',
    type: 'Financial',
    createdBy: 'Eva Brown',
    createdAt: '2024-01-11',
    lastModified: '2024-01-16',
    status: 'Review',
    downloads: 312
  },
];

const reportTypes = [
  { name: 'Sales Reports', count: 45, color: 'bg-blue-500' },
  { name: 'Analytics Reports', count: 32, color: 'bg-green-500' },
  { name: 'Performance Reports', count: 28, color: 'bg-purple-500' },
  { name: 'Project Reports', count: 67, color: 'bg-orange-500' },
  { name: 'Financial Reports', count: 23, color: 'bg-red-500' },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortValue, setSortValue] = useState('date');
  const [filterValue, setFilterValue] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (value: string) => {
    setSortValue(value);
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
  };

  const filters = [
    {
      label: 'Type',
      options: [
        { label: 'All Reports', value: 'all' },
        { label: 'Sales', value: 'sales' },
        { label: 'Analytics', value: 'analytics' },
        { label: 'Performance', value: 'performance' },
        { label: 'Project', value: 'project' },
        { label: 'Financial', value: 'financial' }
      ],
      value: filterValue,
      onChange: handleFilter
    },
    {
      label: 'Status',
      options: [
        { label: 'All Status', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Review', value: 'review' }
      ],
      value: 'all',
      onChange: () => {}
    }
  ];

  const sortOptions = [
    { label: 'Date Created (Newest)', value: 'date' },
    { label: 'Date Created (Oldest)', value: 'date_asc' },
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Downloads (High to Low)', value: 'downloads' }
  ];

  const filteredReports = reportsData.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === 'all' || report.type.toLowerCase() === filterValue;
    return matchesSearch && matchesFilter;
  });

  const chartData = reportsData.slice(0, 7).map((report, index) => ({
    label: `R${index + 1}`,
    value: report.downloads
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Generate and manage your business reports
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Search reports..."
              onSearch={handleSearch}
              className="w-64"
            />
            <FilterSort
              filters={filters}
              sortOptions={sortOptions}
              sortValue={sortValue}
              onSortChange={handleSort}
            />
            <ExportButton
              data={reportsData}
              filename="reports-export"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <DocumentPlusIcon className="w-5 h-5" />
              <span>New Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reports"
            value="195"
            change="+12.5%"
            changeType="positive"
            icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="This Month"
            value="23"
            change="+8.2%"
            changeType="positive"
            icon={<CalendarIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Downloads"
            value="1,105"
            change="+15.3%"
            changeType="positive"
            icon={<ArrowDownTrayIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Avg. Generation Time"
            value="2.4m"
            change="-5.2%"
            changeType="positive"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Report Downloads">
            <LineChart data={chartData} color="#3B82F6" />
          </ChartCard>
          <ChartCard title="Report Types Distribution">
            <LineChart data={chartData} color="#10B981" />
          </ChartCard>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reportTypes.map((type, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                  {type.name.charAt(0)}
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {type.count}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {type.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Reports Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Reports ({filteredReports.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {report.createdBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : report.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {report.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3">
                        Download
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
