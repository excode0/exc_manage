'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import {
  CogIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  KeyIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your account information and preferences',
    icon: UserIcon,
    color: 'blue',
    items: [
      { name: 'Personal Information', description: 'Update your name, email, and contact details' },
      { name: 'Profile Picture', description: 'Change your avatar and profile image' },
      { name: 'Password', description: 'Update your account password' },
      { name: 'Two-Factor Authentication', description: 'Add an extra layer of security' }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure how you receive notifications',
    icon: BellIcon,
    color: 'green',
    items: [
      { name: 'Email Notifications', description: 'Manage email alert preferences' },
      { name: 'Push Notifications', description: 'Configure browser notifications' },
      { name: 'SMS Alerts', description: 'Set up SMS notifications for important events' },
      { name: 'Notification Schedule', description: 'Set quiet hours and notification timing' }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Secure your account and data',
    icon: ShieldCheckIcon,
    color: 'red',
    items: [
      { name: 'Login History', description: 'View recent login activity' },
      { name: 'Active Sessions', description: 'Manage your active sessions' },
      { name: 'API Keys', description: 'Manage API access keys' },
      { name: 'Privacy Settings', description: 'Control your data privacy' }
    ]
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the look and feel',
    icon: PaintBrushIcon,
    color: 'purple',
    items: [
      { name: 'Theme', description: 'Choose light or dark theme' },
      { name: 'Language', description: 'Select your preferred language' },
      { name: 'Timezone', description: 'Set your local timezone' },
      { name: 'Date Format', description: 'Choose how dates are displayed' }
    ]
  },
  {
    id: 'system',
    title: 'System',
    description: 'System configuration and maintenance',
    icon: ServerIcon,
    color: 'orange',
    items: [
      { name: 'Storage Usage', description: 'View and manage storage usage' },
      { name: 'Data Export', description: 'Export your data' },
      { name: 'System Health', description: 'View system status and health' },
      { name: 'Maintenance', description: 'System maintenance and updates' }
    ]
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    profileVisibility: 'public'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const currentSection = settingsSections.find(section => section.id === activeSection);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Settings Menu
              </h3>
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {currentSection && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${
                    currentSection.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    currentSection.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                    currentSection.color === 'red' ? 'bg-red-100 dark:bg-red-900' :
                    currentSection.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                    'bg-orange-100 dark:bg-orange-900'
                  }`}>
                    <currentSection.icon className={`w-6 h-6 ${
                      currentSection.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      currentSection.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      currentSection.color === 'red' ? 'text-red-600 dark:text-red-400' :
                      currentSection.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                      'text-orange-600 dark:text-orange-400'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentSection.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentSection.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {currentSection.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                        Configure
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Settings */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Dark Mode
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.theme === 'dark'}
                      onChange={(e) => handleSettingChange('theme', e.target.checked ? 'dark' : 'light')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive browser notifications
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Two-Factor Auth
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add extra security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
