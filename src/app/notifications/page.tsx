'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import SearchBar from '@/components/SearchBar';
import FilterSort from '@/components/FilterSort';
import ExportButton from '@/components/ExportButton';
import {
  BellIcon,
  BellAlertIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const notificationsData = [
  {
    id: 1,
    title: 'New Client Added',
    message: 'Alice Johnson has been added as a new client to the system.',
    type: 'success',
    read: false,
    createdAt: '2024-01-20T10:30:00Z',
    priority: 'normal'
  },
  {
    id: 2,
    title: 'Project Deadline Approaching',
    message: 'Project "Website Redesign" deadline is in 2 days.',
    type: 'warning',
    read: false,
    createdAt: '2024-01-20T09:15:00Z',
    priority: 'high'
  },
  {
    id: 3,
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2-4 AM.',
    type: 'info',
    read: true,
    createdAt: '2024-01-19T16:45:00Z',
    priority: 'low'
  },
  {
    id: 4,
    title: 'Payment Received',
    message: 'Payment of $2,500 has been received from TechCorp.',
    type: 'success',
    read: true,
    createdAt: '2024-01-19T14:20:00Z',
    priority: 'normal'
  },
  {
    id: 5,
    title: 'Server Alert',
    message: 'High CPU usage detected on production server.',
    type: 'error',
    read: false,
    createdAt: '2024-01-19T11:30:00Z',
    priority: 'high'
  },
  {
    id: 6,
    title: 'New Team Member',
    message: 'Bob Smith has joined the development team.',
    type: 'info',
    read: true,
    createdAt: '2024-01-18T15:10:00Z',
    priority: 'normal'
  },
  {
    id: 7,
    title: 'Backup Completed',
    message: 'Daily backup completed successfully at 3:00 AM.',
    type: 'success',
    read: true,
    createdAt: '2024-01-18T03:00:00Z',
    priority: 'low'
  },
  {
    id: 8,
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected.',
    type: 'error',
    read: false,
    createdAt: '2024-01-17T22:45:00Z',
    priority: 'high'
  }
];

const notificationStats = [
  { label: 'Total', count: 156, icon: BellIcon, color: 'blue' },
  { label: 'Unread', count: 23, icon: BellAlertIcon, color: 'red' },
  { label: 'High Priority', count: 8, icon: ExclamationTriangleIcon, color: 'orange' },
  { label: 'Read Today', count: 45, icon: CheckCircleIcon, color: 'green' },
];

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortValue, setSortValue] = useState('date');
  const [filterValue, setFilterValue] = useState('all');
  const [notifications, setNotifications] = useState(notificationsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (value: string) => {
    setSortValue(value);
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filters = [
    {
      label: 'Type',
      options: [
        { label: 'All Notifications', value: 'all' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' }
      ],
      value: filterValue,
      onChange: handleFilter
    },
    {
      label: 'Priority',
      options: [
        { label: 'All Priority', value: 'all' },
        { label: 'High', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' }
      ],
      value: 'all',
      onChange: () => {}
    },
    {
      label: 'Status',
      options: [
        { label: 'All Status', value: 'all' },
        { label: 'Read', value: 'read' },
        { label: 'Unread', value: 'unread' }
      ],
      value: 'all',
      onChange: () => {}
    }
  ];

  const sortOptions = [
    { label: 'Date (Newest)', value: 'date' },
    { label: 'Date (Oldest)', value: 'date_asc' },
    { label: 'Priority (High to Low)', value: 'priority' },
    { label: 'Type', value: 'type' }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === 'all' || notification.type === filterValue;
    return matchesSearch && matchesFilter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />;
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Stay updated with your latest activities and alerts
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Search notifications..."
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
              data={notifications}
              filename="notifications-export"
            />
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notificationStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.label}
              value={stat.count.toString()}
              change={index === 1 ? `+${unreadCount}` : undefined}
              changeType="positive"
              icon={<stat.icon className="w-6 h-6 text-white" />}
              color={stat.color as any}
            />
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Notifications ({filteredNotifications.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.read
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${
                        !notification.read
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 mt-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          notification.priority === 'high'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : notification.priority === 'normal'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {notification.priority} priority
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          notification.type === 'success'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : notification.type === 'warning'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : notification.type === 'error'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
