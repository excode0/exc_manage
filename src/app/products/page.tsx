'use client';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import LineChart from '@/components/LineChart';
import {
  ShoppingBagIcon,
  PlusIcon,
  CurrencyDollarIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const productChartData = [
  { label: 'Jan', value: 890 },
  { label: 'Feb', value: 1200 },
  { label: 'Mar', value: 1100 },
  { label: 'Apr', value: 1400 },
  { label: 'May', value: 1300 },
  { label: 'Jun', value: 1600 },
];

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your product catalog and inventory
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <PlusIcon className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value="342"
            change="+12.5%"
            changeType="positive"
            icon={<ShoppingBagIcon className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Active Products"
            value="298"
            change="+8.2%"
            changeType="positive"
            icon={<EyeIcon className="w-6 h-6 text-white" />}
            color="green"
          />
          <StatCard
            title="Total Sales"
            value="$89,432"
            change="+15.7%"
            changeType="positive"
            icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Low Stock Items"
            value="12"
            change="-3"
            changeType="positive"
            icon={<ShoppingBagIcon className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Sales Trend">
            <LineChart data={productChartData} color="#10B981" />
          </ChartCard>
          <ChartCard title="Product Views">
            <LineChart data={productChartData} color="#3B82F6" />
          </ChartCard>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Product Catalog
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: 'Premium Web Template', category: 'Templates', price: '$49', stock: 156, status: 'Active' },
                  { name: 'Mobile App UI Kit', category: 'UI Kits', price: '$79', stock: 89, status: 'Active' },
                  { name: 'E-commerce Platform', category: 'Software', price: '$299', stock: 23, status: 'Active' },
                  { name: 'Business Card Design', category: 'Graphics', price: '$25', stock: 234, status: 'Active' },
                  { name: 'Logo Design Package', category: 'Branding', price: '$199', stock: 45, status: 'Draft' },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <ShoppingBagIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {product.status}
                      </span>
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
        </div>
      </div>
    </DashboardLayout>
  );
}
