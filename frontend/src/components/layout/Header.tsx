import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../lib/store/userStore';
import removeAccessToken from '../../lib/cookies/removeAccessToken';
import { HiLogout } from 'react-icons/hi';  // Import the logout icon from react-icons
import { removeUserId } from '../../lib/cookies/userIdCookies';

function Header() {
  const { user } = useUserStore();
  const navigate = useNavigate()
  
  const handleLogOut = () => {
    removeAccessToken();
    removeUserId()
    navigate('/sign-in')
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 mr-2"
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
              <span className="font-semibold text-xl">Task Manager</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <Link
                to="/create-task"
                className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 font-medium"
              >
                Create Task
              </Link>
            </div>

            {/* User Info Section */}
            <div className="ml-4 flex items-center space-x-4">
              {/* Avatar */}
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center">
                  <img
                    className="rounded-full"
                    src={`https://ui-avatars.com/api/?name=${user?.username.split(' ')[0]}`}
                    alt={`${user?.username.split(' ')[0]} avatar`}
                  />
                </div>
                <div className="ml-2 flex flex-col text-sm">
                  <span className="font-semibold">{user?.username}</span>
                  <span className="text-gray-300">{user?.email}</span>
                </div>
              </div>
              {/* Logout Icon with Hover Text */}
              <div className="relative">
                <button
                  onClick={handleLogOut}
                  className="text-white hover:text-indigo-300 cursor-pointer p-2 rounded-full transition duration-200"
                >
                  <HiLogout size={24} /> {/* Logout Icon */}
                </button>
               
                <span className="absolute bg-black z-50 left-0 bottom-0 transform translate-y-full text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
