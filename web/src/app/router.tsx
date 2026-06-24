import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/app/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
