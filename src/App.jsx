import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className='min-h-screen bg-white'>
      <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow overflow-x-auto whitespace-nowrap'>
        <div className='w-full px-4 flex items-center h-16 space-x-6'>
          <span className='text-xl font-bold text-purple-700'>🍸 CocktailApp</span>
          <Link to='/' className='text-gray-700 hover:text-purple-600'>Home</Link>
          <Link to='/search' className='text-gray-700 hover:text-purple-600'>Search</Link>
          <Link to='/substitutes' className='text-gray-700 hover:text-purple-600'>Substitutes</Link>
          <Link to='/details' className='text-gray-700 hover:text-purple-600'>Details</Link>
        </div>
      </nav>
      <main className='w-full px-4 py-6'>
        <Outlet />
      </main>
    </div>
  );
}
