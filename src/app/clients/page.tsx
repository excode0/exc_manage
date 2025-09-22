'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import LineChart from '@/components/LineChart';
import SearchBar from '@/components/SearchBar';
import FilterSort from '@/components/FilterSort';
import Pagination from '@/components/Pagination';
import ExportButton from '@/components/ExportButton';
import {
  UsersIcon,
  UserPlusIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const clientChartData = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 150 },
  { label: 'Mar', value: 180 },
  { label: 'Apr', value: 200 },
  { label: 'May', value: 220 },
  { label: 'Jun', value: 250 },
];

const clientsData = [
  { id: 1, name: 'Alice Johnson', company: 'TechCorp', status: 'Active', lastContact: '2 hours ago', email: 'alice@techcorp.com', projects: 5 },
  { id: 2, name: 'Bob Smith', company: 'DesignStudio', status: 'Active', lastContact: '1 day ago', email: 'bob@designstudio.com', projects: 3 },
  { id: 3, name: 'Carol Davis', company: 'MarketPro', status: 'Pending', lastContact: '3 days ago', email: 'carol@marketpro.com', projects: 2 },
  { id: 4, name: 'David Wilson', company: 'DevAgency', status: 'Active', lastContact: '5 hours ago', email: 'david@devagency.com', projects: 7 },
  { id: 5, name: 'Eva Brown', company: 'TechCorp', status: 'Active', lastContact: '1 hour ago', email: 'eva@techcorp.com', projects: 4 },
  { id: 6, name: 'Frank Miller', company: 'DesignStudio', status: 'Inactive', lastContact: '1 week ago', email: 'frank@designstudio.com', projects: 1 },
  { id: 7, name: 'Grace Lee', company: 'MarketPro', status: 'Active', lastContact: '30 minutes ago', email: 'grace@marketpro.com', projects: 6 },
  { id: 8, name: 'Henry Taylor', company: 'DevAgency', status: 'Pending', lastContact: '2 days ago', email: 'henry@devagency.com', projects: 2 },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortValue, setSortValue] = useState('name');
  const [filterValue, setFilterValue] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSortValue(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1);
  };

  // Filter and sort clients
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === 'all' || client.status.toLowerCase() === filterValue;
    return matchesSearch && matchesFilter;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortValue) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'company':
        return a.company.localeCompare(b.company);
      case 'projects':
        return b.projects - a.projects;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedClients.length / itemsPerPage);
  const paginatedClients = sortedClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filters = [
    {
      label: 'Status',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Inactive', value: 'inactive' }
      ],
      value: filterValue,
      onChange: handleFilter
    }
  ];

  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Name (Z-A)', value: 'name_desc' },
    { label: 'Company', value: 'company' },
    { label: 'Projects', value: 'projects' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Clients
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and monitor your client relationships
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Search clients..."
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
              data={clientsData}
              filename="clients-export"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <UserPlusIcon className="w-5 h-5" />
              <span>Add Client</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Clients"
            value="1,247"
            change="+8.2%"
            changeType="positive"
            icon={<UsersIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Active Clients"
            value="892"
            change="+12.5%"
            changeType="positive"
            icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="New This Month"
            value="47"
            change="+23.1%"
            changeType="positive"
            icon={<UserPlusIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Avg. Response Time"
            value="2.4h"
            change="-15.2%"
            changeType="positive"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Client Growth">
            <LineChart data={clientChartData} color="#3B82F6" />
          </ChartCard>
          <ChartCard title="Client Satisfaction">
            <LineChart data={clientChartData} color="#10B981" />
          </ChartCard>
        </div>

        {/* Clients Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Clients ({filteredClients.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {client.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : client.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {client.projects} projects
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {client.lastContact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                        Edit
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
