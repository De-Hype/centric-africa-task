import ITask from '../../interfaces/ITask';
import TaskCard from './TaskCard';

interface TaskListProps{
    tasks:ITask[],
    type:string,
    loading:boolean
}
function TaskList({ tasks, type = 'available', loading = false }:TaskListProps) {
  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-full"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="mt-4 flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          {type === 'available' ? 'No available tasks' : 'No claimed tasks'}
        </h3>
        <p className="mt-1 text-gray-500">
          {type === 'available'
            ? 'There are no tasks available at the moment. Check back later!'
            : 'You have not claimed any tasks yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} type={type} />
      ))}
    </div>
  );
}

export default TaskList;