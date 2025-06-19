import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Search from './pages/Search';
import Substitutes from './pages/Substitutes';
import Details from './pages/Details';
import { ThemeProvider } from './context/ThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        { index: true, element: <Home /> },
      { path: '/search', element: <Search /> },
      { path: '/substitutes', element: <Substitutes /> },
      { path: '/details', element: <Details /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/*  WRAPPED HERE */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
