import { NavLink } from "react-router-dom";
import { useTaskStore } from "../../lib/store/taskStore";

function Sidebar() {
  const { myTasks } = useTaskStore();
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Available Tasks",
      path: "/available-tasks",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      name: "My Tasks",
      path: "/my-tasks",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
      badge: myTasks.length,
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="mt-10 px-6">
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50 ${
                  isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
              {item.badge ? (
                <span className="ml-auto bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
