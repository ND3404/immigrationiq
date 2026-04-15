import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Lazy-load non-critical pages for code splitting
const Categories = lazy(() => import('./pages/Categories'));
const CategoryDetail = lazy(() => import('./pages/CategoryDetail'));
const Chat = lazy(() => import('./pages/Chat'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Checklist = lazy(() => import('./pages/Checklist'));
const Lawyers = lazy(() => import('./pages/Lawyers'));
const ProcessingTimes = lazy(() => import('./pages/ProcessingTimes'));
const News = lazy(() => import('./pages/News'));
const Glossary = lazy(() => import('./pages/Glossary'));
const FAQ = lazy(() => import('./pages/FAQ'));
const FeeCalculator = lazy(() => import('./pages/FeeCalculator'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary-200)] border-t-[var(--color-primary-500)]" />
    </div>
  );
}

function SuspenseLayout({ children }) {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/categories" element={<SuspenseLayout><Categories /></SuspenseLayout>} />
      <Route path="/category/:slug" element={<SuspenseLayout><CategoryDetail /></SuspenseLayout>} />
      <Route path="/chat" element={<SuspenseLayout><Chat /></SuspenseLayout>} />
      <Route path="/timeline" element={<SuspenseLayout><Timeline /></SuspenseLayout>} />
      <Route path="/checklist" element={<SuspenseLayout><Checklist /></SuspenseLayout>} />
      <Route path="/lawyers" element={<SuspenseLayout><Lawyers /></SuspenseLayout>} />
      <Route path="/processing-times" element={<SuspenseLayout><ProcessingTimes /></SuspenseLayout>} />
      <Route path="/news" element={<SuspenseLayout><News /></SuspenseLayout>} />
      <Route path="/glossary" element={<SuspenseLayout><Glossary /></SuspenseLayout>} />
      <Route path="/faq" element={<SuspenseLayout><FAQ /></SuspenseLayout>} />
      <Route path="/fee-calculator" element={<SuspenseLayout><FeeCalculator /></SuspenseLayout>} />

      {/* 404 */}
      <Route path="*" element={
        <Layout>
          <div className="page-container text-center py-20">
            <h1 className="section-title">Page Not Found</h1>
            <p className="mt-4" style={{ color: 'var(--color-text-light)' }}>The page you're looking for doesn't exist.</p>
            <a href="/" className="btn-primary mt-6 inline-block no-underline">Go Home</a>
          </div>
        </Layout>
      } />
    </Routes>
  );
}
