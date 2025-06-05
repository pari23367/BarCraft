import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
export default function App() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="w-full px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
