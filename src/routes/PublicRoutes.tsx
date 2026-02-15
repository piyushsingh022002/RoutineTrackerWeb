import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ROUTE_PATHS from './RoutePaths';
import { NotebookLoader } from '../components/common';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const PublicNoteEditor = lazy(() => import('../pages/PublicNoteEditor'));
const AboutIRTPage = lazy(() => import('../pages/AboutIRTPage'));
const NotebookLoaderTest = lazy(() => import('../pages/NotebookLoaderTest'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PublicRoutes = () => {
    const routes = useRoutes([
    {path: ROUTE_PATHS.LANDINGPAGE, element: <LandingPage /> },
    { path: ROUTE_PATHS.PUBLIC_NOTE, element: <PublicNoteEditor /> },
    { path: ROUTE_PATHS.ABOUTIRT, element: <AboutIRTPage /> },
    { path: ROUTE_PATHS.TEST_NOTEBOOK_LOADER, element: <NotebookLoaderTest /> },
        { path: ROUTE_PATHS.NOTFOUNDPAGE, element: <NotFound /> },
        ]);
    
         return (
             <Suspense
                 fallback={
                     <div
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             minHeight: '100vh',
                             width: '100%',
                         }}
                     >
                         <NotebookLoader
                             message="Loading public pages"
                             subtext="Fetching the latest content"
                         />
                     </div>
                 }
             >
                 {routes}
             </Suspense>
         );
};

export default PublicRoutes;