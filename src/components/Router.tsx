import { ScrollToTop } from '@/lib/scroll-to-top';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MemberProvider } from '../../integrations';
import HomePage from './pages/HomePage';
import Header from './Header';

const CommunityApp = lazy(() => import('@/community/App'));
const CommunityPastEventsPage = lazy(() => import('@/community/pages/PastEventsPage'));

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  // Community routes (pg2 UI) mounted without the main app Layout/Header
  {
    path: "/community",
    element: (
      <Suspense fallback={null}>
        <CommunityApp />
      </Suspense>
    ),
  },
  {
    path: "/community/past-events",
    element: (
      <Suspense fallback={null}>
        <CommunityPastEventsPage />
      </Suspense>
    ),
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
