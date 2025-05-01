import { useState, useContext } from 'react';
import { useTaskStore } from '../../lib/store/taskStore';

function TaskCard({ task, type = 'available' }) {
  const { claimTaskById, unclaimTaskById } =  useTaskStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      setError(null);
  
      await claimTaskById(task._id);
    } catch (err) {
      setError(err.message || 'Failed to claim task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnclaim = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await unclaimTaskById(task._id);
    } catch (err) {
      setError(err.message || 'Failed to unclaim task');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium text-sm">
            {formatCurrency(task.budget)}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{task.description}</p>
        
        {error && (
          <div className="mt-4 p-2 bg-red-50 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Posted: {new Date(task.createdAt).toLocaleDateString()}
          </div>
          
          {type === 'available' ? (
            <button
              onClick={handleClaim}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md font-medium ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              {isLoading ? 'Claiming...' : 'Claim Task'}
            </button>
          ) : (
            <button
              onClick={handleUnclaim}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md font-medium ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-500'
              }`}
            >
              {isLoading ? 'Unclaiming...' : 'Unclaim Task'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;