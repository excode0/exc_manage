'use client';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import LineChart from '@/components/LineChart';
import {
  FolderIcon,
  FolderPlusIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const projectChartData = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 15 },
  { label: 'Mar', value: 18 },
  { label: 'Apr', value: 22 },
  { label: 'May', value: 19 },
  { label: 'Jun', value: 25 },
];

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track and manage your development projects
            </p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <FolderPlusIcon className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value="47"
            change="+15.2%"
            changeType="positive"
            icon={<FolderIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Active Projects"
            value="23"
            change="+8.7%"
            changeType="positive"
            icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Completed"
            value="24"
            change="+12.5%"
            changeType="positive"
            icon={<FolderPlusIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Avg. Completion"
            value="87%"
            change="+5.2%"
            changeType="positive"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Project Progress">
            <LineChart data={projectChartData} color="#8B5CF6" />
          </ChartCard>
          <ChartCard title="Team Productivity">
            <LineChart data={projectChartData} color="#3B82F6" />
          </ChartCard>
        </div>

        {/* Projects Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'E-commerce Platform',
                client: 'TechCorp',
                progress: 75,
                status: 'In Progress',
                team: 5,
                deadline: '2024-02-15'
              },
              {
                name: 'Mobile Banking App',
                client: 'FinancePro',
                progress: 45,
                status: 'In Progress',
                team: 8,
                deadline: '2024-03-01'
              },
              {
                name: 'CRM Dashboard',
                client: 'SalesMaster',
                progress: 90,
                status: 'Review',
                team: 4,
                deadline: '2024-01-30'
              },
              {
                name: 'Inventory System',
                client: 'LogiCorp',
                progress: 30,
                status: 'Planning',
                team: 6,
                deadline: '2024-04-15'
              },
              {
                name: 'Learning Platform',
                client: 'EduTech',
                progress: 60,
                status: 'In Progress',
                team: 7,
                deadline: '2024-03-15'
              },
              {
                name: 'Healthcare Portal',
                client: 'MedCare',
                progress: 20,
                status: 'Planning',
                team: 9,
                deadline: '2024-05-01'
              },
            ].map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {project.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {project.client}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    project.status === 'Review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {project.status}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <span>{project.team} members</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
