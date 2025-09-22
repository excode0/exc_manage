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
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  EyeIcon,
  ClockIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const analyticsData = [
  { date: '2024-01-01', users: 1200, sessions: 1800, pageViews: 4500, bounceRate: 35 },
  { date: '2024-01-02', users: 1350, sessions: 1950, pageViews: 5200, bounceRate: 32 },
  { date: '2024-01-03', users: 1100, sessions: 1650, pageViews: 4100, bounceRate: 38 },
  { date: '2024-01-04', users: 1450, sessions: 2100, pageViews: 5800, bounceRate: 30 },
  { date: '2024-01-05', users: 1600, sessions: 2400, pageViews: 6200, bounceRate: 28 },
  { date: '2024-01-06', users: 1400, sessions: 2000, pageViews: 5100, bounceRate: 33 },
  { date: '2024-01-07', users: 1750, sessions: 2600, pageViews: 6800, bounceRate: 25 },
];

const trafficSources = [
  { source: 'Organic Search', visitors: 45230, percentage: 45.2 },
  { source: 'Direct', visitors: 32150, percentage: 32.2 },
  { source: 'Social Media', visitors: 18900, percentage: 18.9 },
  { source: 'Referral', visitors: 8750, percentage: 8.8 },
  { source: 'Email', visitors: 5420, percentage: 5.4 },
];

const topPages = [
  { page: '/dashboard', views: 15420, uniqueViews: 12340, avgTime: '3:24' },
  { page: '/clients', views: 12890, uniqueViews: 9870, avgTime: '4:12' },
  { page: '/projects', views: 11200, uniqueViews: 8900, avgTime: '5:33' },
  { page: '/products', views: 9870, uniqueViews: 7650, avgTime: '2:45' },
  { page: '/templates', views: 7650, uniqueViews: 6120, avgTime: '3:18' },
];

export default function AnalyticsPage() {
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
      label: 'Period',
      options: [
        { label: 'All Time', value: 'all' },
        { label: 'Last 7 Days', value: '7days' },
        { label: 'Last 30 Days', value: '30days' },
        { label: 'Last 90 Days', value: '90days' }
      ],
      value: filterValue,
      onChange: handleFilter
    }
  ];

  const sortOptions = [
    { label: 'Date (Newest)', value: 'date' },
    { label: 'Users (High to Low)', value: 'users_desc' },
    { label: 'Users (Low to High)', value: 'users_asc' },
    { label: 'Page Views (High to Low)', value: 'views_desc' }
  ];

  const chartData = analyticsData.map(item => ({
    label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.users
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your website performance and user behavior
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Search analytics..."
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
              data={analyticsData}
              filename="analytics-export"
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="12,450"
            change="+18.2%"
            changeType="positive"
            icon={<UsersIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Sessions"
            value="18,750"
            change="+12.5%"
            changeType="positive"
            icon={<ArrowTrendingUpIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Page Views"
            value="47,200"
            change="+25.3%"
            changeType="positive"
            icon={<EyeIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Avg. Session Duration"
            value="4m 32s"
            change="+8.1%"
            changeType="positive"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Daily Active Users">
            <LineChart data={chartData} color="#3B82F6" />
          </ChartCard>
          <ChartCard title="Session Trends">
            <LineChart data={chartData} color="#10B981" />
          </ChartCard>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {source.source}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {source.visitors.toLocaleString()} visitors
                  </span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                    {source.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Pages
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Unique Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Avg. Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {topPages.map((page, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {page.page}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {page.uniqueViews.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {page.avgTime}
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
