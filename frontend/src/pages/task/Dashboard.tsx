// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Link } from 'react-router-dom';
import { useTaskStore } from '../../lib/store/taskStore';

function Dashboard() {
  const { availableTasks, myTasks, loading } =  useTaskStore();
 

  const stats = [
    {
      name: 'Available Tasks',
      value: availableTasks.length,
      path: '/available-tasks',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      )
    },
    {
      name: 'My Tasks',
      value: myTasks.length,
      path: '/my-tasks',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      )
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-50 text-indigo-700">
                {stat.icon}
              </div>
              <div className="ml-5">
                <h2 className="text-lg font-semibold text-gray-700">{stat.name}</h2>
                <div className="mt-1 flex items-baseline">
                  <p className="text-3xl font-semibold text-gray-900">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Available Tasks</h2>
            <Link to="/available-tasks" className="text-indigo-600 hover:text-indigo-500">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-4 p-4 border-b">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : availableTasks.length === 0 ? (
            <p className="text-gray-500">No available tasks at the moment.</p>
          ) : (
            <div className="divide-y">
              {availableTasks.slice(0, 3).map((task) => (
                <div key={task._id} className="py-4">
                  <h3 className="font-medium">{task.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">My Current Tasks</h2>
            <Link to="/my-tasks" className="text-indigo-600 hover:text-indigo-500">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-4 p-4 border-b">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : myTasks.length === 0 ? (
            <p className="text-gray-500">You haven't claimed any tasks yet.</p>
          ) : (
            <div className="divide-y">
              {myTasks.slice(0, 3).map((task) => (
                <div key={task._id} className="py-4">
                  <h3 className="font-medium">{task.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;