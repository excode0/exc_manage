'use client';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import LineChart from '@/components/LineChart';
import {
  UserGroupIcon,
  UserPlusIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const workerChartData = [
  { label: 'Jan', value: 45 },
  { label: 'Feb', value: 52 },
  { label: 'Mar', value: 48 },
  { label: 'Apr', value: 61 },
  { label: 'May', value: 55 },
  { label: 'Jun', value: 67 },
];

export default function WorkersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Workers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your team members and freelancers
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <UserPlusIcon className="w-5 h-5" />
            <span>Add Worker</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Workers"
            value="156"
            change="+5.2%"
            changeType="positive"
            icon={<UserGroupIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Active Workers"
            value="134"
            change="+8.1%"
            changeType="positive"
            icon={<UserPlusIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Avg. Rating"
            value="4.7"
            change="+0.2"
            changeType="positive"
            icon={<StarIcon className="w-6 h-6 text-white" />}
            color="yellow"
          />
          <StatCard
            title="Hours This Week"
            value="2,847"
            change="+12.3%"
            changeType="positive"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Worker Productivity">
            <LineChart data={workerChartData} color="#10B981" />
          </ChartCard>
          <ChartCard title="Team Performance">
            <LineChart data={workerChartData} color="#3B82F6" />
          </ChartCard>
        </div>

        {/* Workers Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Team Members
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Alice Johnson', role: 'Frontend Developer', status: 'Online', rating: 4.9 },
              { name: 'Bob Smith', role: 'Backend Developer', status: 'Busy', rating: 4.8 },
              { name: 'Carol Davis', role: 'UI/UX Designer', status: 'Away', rating: 4.7 },
              { name: 'David Wilson', role: 'Project Manager', status: 'Online', rating: 4.9 },
              { name: 'Eva Brown', role: 'DevOps Engineer', status: 'Online', rating: 4.6 },
              { name: 'Frank Miller', role: 'QA Engineer', status: 'Offline', rating: 4.5 },
            ].map((worker, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {worker.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {worker.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {worker.role}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    worker.status === 'Online' ? 'bg-green-500' :
                    worker.status === 'Busy' ? 'bg-yellow-500' :
                    worker.status === 'Away' ? 'bg-orange-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    worker.status === 'Online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    worker.status === 'Busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    worker.status === 'Away' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {worker.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {worker.rating}
                    </span>
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
