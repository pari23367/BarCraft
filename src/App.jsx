import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
<div className="bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
