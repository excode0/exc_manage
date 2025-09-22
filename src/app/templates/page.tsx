'use client';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import {
  DocumentIcon,
  DocumentPlusIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

export default function TemplatesPage() {
  const templateCategories = [
    {
      name: 'CV Templates',
      count: 45,
      icon: '📄',
      color: 'bg-blue-500',
      description: 'Professional CV and resume templates'
    },
    {
      name: 'Portfolio Templates',
      count: 32,
      icon: '🎨',
      color: 'bg-purple-500',
      description: 'Creative portfolio designs'
    },
    {
      name: 'Business Templates',
      count: 28,
      icon: '💼',
      color: 'bg-green-500',
      description: 'Business cards, presentations, and more'
    },
    {
      name: 'Website Templates',
      count: 67,
      icon: '🌐',
      color: 'bg-orange-500',
      description: 'Ready-to-use website templates'
    },
  ];

  const featuredTemplates = [
    {
      name: 'Modern CV Template',
      category: 'CV Templates',
      downloads: '2.1k',
      rating: 4.9,
      preview: 'https://via.placeholder.com/300x400/3B82F6/FFFFFF?text=CV+Template',
      tags: ['Professional', 'Clean', 'Modern']
    },
    {
      name: 'Creative Portfolio',
      category: 'Portfolio Templates',
      downloads: '1.8k',
      rating: 4.8,
      preview: 'https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=Portfolio',
      tags: ['Creative', 'Interactive', 'Design']
    },
    {
      name: 'Business Card Set',
      category: 'Business Templates',
      downloads: '3.2k',
      rating: 4.7,
      preview: 'https://via.placeholder.com/300x400/10B981/FFFFFF?text=Business+Card',
      tags: ['Corporate', 'Professional', 'Branding']
    },
    {
      name: 'Landing Page Template',
      category: 'Website Templates',
      downloads: '4.1k',
      rating: 4.9,
      preview: 'https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Landing+Page',
      tags: ['Responsive', 'Modern', 'Marketing']
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Professional templates for CV, portfolio, and business needs
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <DocumentPlusIcon className="w-5 h-5" />
            <span>Create Template</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Templates"
            value="172"
            change="+8.5%"
            changeType="positive"
            icon={<DocumentIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Downloads This Month"
            value="12,847"
            change="+23.1%"
            changeType="positive"
            icon={<ArrowDownTrayIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Active Users"
            value="3,421"
            change="+15.2%"
            changeType="positive"
            icon={<EyeIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Avg. Rating"
            value="4.8"
            change="+0.1"
            changeType="positive"
            icon={<DocumentIcon className="w-6 h-6 text-white" />}
            color="yellow"
          />
        </div>

        {/* Template Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templateCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.count}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Templates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Featured Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTemplates.map((template, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform translate-y-4 group-hover:translate-y-0">
                      Preview
                    </button>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {template.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {template.category}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <ArrowDownTrayIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {template.downloads}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {template.rating}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Need a Custom Template?
              </h3>
              <p className="text-blue-100">
                Get professionally designed templates tailored to your specific needs
              </p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              Request Custom Template
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
