'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import LineChart from '@/components/LineChart';
import RecentActivity from '@/components/RecentActivity';
import SearchBar from '@/components/SearchBar';
import FilterSort from '@/components/FilterSort';
import ExportButton from '@/components/ExportButton';
import {
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

// Sample data
const chartData = [
  { label: 'Jan', value: 400 },
  { label: 'Feb', value: 300 },
  { label: 'Mar', value: 600 },
  { label: 'Apr', value: 800 },
  { label: 'May', value: 500 },
  { label: 'Jun', value: 900 },
  { label: 'Jul', value: 700 },
];

const recentActivities = [
  {
    id: '1',
    user: 'Alice Johnson',
    action: 'created a new',
    target: 'project',
    time: '2 minutes ago'
  },
  {
    id: '2',
    user: 'Bob Smith',
    action: 'updated',
    target: 'user profile',
    time: '5 minutes ago'
  },
  {
    id: '3',
    user: 'Carol Davis',
    action: 'completed',
    target: 'task #1234',
    time: '10 minutes ago'
  },
  {
    id: '4',
    user: 'David Wilson',
    action: 'deleted',
    target: 'old report',
    time: '15 minutes ago'
  },
  {
    id: '5',
    user: 'Eva Brown',
    action: 'shared',
    target: 'dashboard',
    time: '20 minutes ago'
  }
];

const sampleExportData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { name: 'Carol Davis', email: 'carol@example.com', role: 'User', status: 'Inactive' },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortValue, setSortValue] = useState('name');
  const [filterValue, setFilterValue] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleSort = (value: string) => {
    setSortValue(value);
    console.log('Sorting by:', value);
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
    console.log('Filtering by:', value);
  };

  const filters = [
    {
      label: 'Status',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ],
      value: filterValue,
      onChange: handleFilter
    }
  ];

  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Name (Z-A)', value: 'name_desc' },
    { label: 'Date (Newest)', value: 'date_desc' },
    { label: 'Date (Oldest)', value: 'date_asc' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Search and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Search dashboard..."
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
              data={sampleExportData}
              filename="dashboard-export"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="2,543"
            change="+12.5%"
            changeType="positive"
            icon={<UsersIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Revenue"
            value="$45,231"
            change="+8.2%"
            changeType="positive"
            icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Orders"
            value="1,234"
            change="-2.4%"
            changeType="negative"
            icon={<ShoppingCartIcon className="w-6 h-6 text-white" />}
            color="orange"
          />
          <StatCard
            title="Page Views"
            value="89,432"
            change="+15.3%"
            changeType="positive"
            icon={<EyeIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Revenue">
            <LineChart data={chartData} color="#10B981" />
          </ChartCard>
          <ChartCard title="User Growth">
            <LineChart data={chartData} color="#3B82F6" />
          </ChartCard>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard title="Performance Overview">
              <LineChart data={chartData} color="#8B5CF6" />
            </ChartCard>
          </div>
          <div>
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
