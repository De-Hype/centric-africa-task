import { Outlet } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-8 flex-grow">
          <Outlet /> {/* This is where nested routes are rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
