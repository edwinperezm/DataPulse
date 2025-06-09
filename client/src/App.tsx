import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeApplier } from '@/components/theme/theme-applier';

// Import pages
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Clients from './pages/clients';
import Surveys from './pages/surveys';
import WidgetDashboard from './pages/widget-dashboard';
import AnalyticsDashboard from './pages/analytics-dashboard';
import NewClient from './pages/new-client';
import NotFoundPage from './pages/not-found';

// Import providers
import { AuthProvider, useAuth } from './providers/auth-provider';
import { ThemeProvider } from './context/theme-context';
import { queryClient } from './lib/react-query';

// Import layout
import { MainLayout } from './components/layout/main-layout';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  currentPath: string;
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, ErrorBoundaryState> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      currentPath: window.location.pathname
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { 
      hasError: true, 
      error,
      currentPath: window.location.pathname
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  componentDidUpdate(prevProps: any, prevState: ErrorBoundaryState) {
    // Reset error state when route changes
    if (this.state.hasError && window.location.pathname !== this.state.currentPath) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        currentPath: window.location.pathname
      });
    }
  }

  renderErrorDetails() {
    const { error, errorInfo } = this.state;
    if (!error) return null;

    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f9fafb', 
        borderRadius: '0.25rem', 
        marginBottom: '1rem',
        textAlign: 'left',
        overflow: 'auto',
        maxHeight: '200px',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Error Details:</p>
        <p style={{ fontWeight: 'bold', color: '#dc2626' }}>{error.toString()}</p>
        {errorInfo?.componentStack && (
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Component Stack:</p>
            <pre style={{ 
              fontSize: '0.75rem', 
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              backgroundColor: '#f3f4f6',
              padding: '0.5rem',
              borderRadius: '0.25rem'
            }}>
              {errorInfo.componentStack}
            </pre>
          </div>
        )}
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh', 
          backgroundColor: '#fef2f2', 
          padding: '2rem 1rem'
        }}>
          <div style={{ 
            padding: '2rem', 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem', 
                color: '#dc2626'
              }}>
                Something went wrong
              </h2>
              <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
                We encountered an error while rendering the application.
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Current route: {this.state.currentPath}
              </p>
            </div>
            
            {this.renderErrorDetails()}
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button 
                onClick={() => window.location.reload()}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  borderRadius: '0.375rem', 
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reload Page
              </button>
              
              <button 
                onClick={() => window.location.href = '/dashboard'}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#e5e7eb', 
                  color: '#374151', 
                  borderRadius: '0.375rem', 
                  border: '1px solid #d1d5db',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              >
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Dashboard
              </button>
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                If the problem persists, please contact support with the error details above.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Debug component to show initialization status
const DebugInfo = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    console.log('React app mounted successfully!');
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      padding: '8px 12px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      React Status: {mounted ? '✅ Mounted' : '⏳ Loading'}
    </div>
  );
};

// Simple loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#f0f4f8' 
  }}>
    <div style={{ 
      padding: '2rem', 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h2>Loading...</h2>
      <p>Please wait while we set up your dashboard</p>
    </div>
  </div>
);

// Simple fallback component for when routes don't match
const NotFound = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#f0f4f8' 
  }}>
    <div style={{ 
      padding: '2rem', 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>
        Page Not Found
      </h1>
      <p style={{ marginBottom: '1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <a 
        href="/" 
        style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          borderRadius: '0.25rem', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Go Home
      </a>
    </div>
  </div>
);

// Protected Route component to handle authentication
// Now bypassing authentication checks and always rendering the component
const ProtectedRoute = ({ component: Component, ...rest }: { component: React.ComponentType<any>, path: string }) => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <Loading />;
  }
  
  return <Component {...rest} />;
};

// Main App component
function App() {
  const [isReady, setIsReady] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log('[App] Ready, current location:', location);
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (location === '/') {
      console.log('[App] Redirecting to /dashboard');
      setLocation('/dashboard');
    }
  }, [location, setLocation]);

  if (!isReady) {
    return <Loading />;
  }

  // Check if the path contains .html or has query parameters
  const isInvalidPath = location.includes('.html') || location.includes('?');
  if (isInvalidPath) {
    return (
      <ErrorBoundary>
        <AuthProvider>
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        </AuthProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="deep-forest">
          <ThemeApplier />
          <AuthProvider>
            <ErrorBoundary>
              <MainLayout>
                <Switch>
                  {/* Public routes */}
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/clients" component={Clients} />
                  <Route path="/surveys" component={Surveys} />
                  <Route path="/widget-dashboard" component={WidgetDashboard} />
                  <Route path="/analytics-dashboard" component={AnalyticsDashboard} />
                  <Route path="/new-client" component={NewClient} />
                  
                  {/* Fallback routes */}
                  <Route path="/" component={Dashboard} />
                  <Route component={NotFoundPage} />
                </Switch>
                <DebugInfo />
                <ReactQueryDevtools initialIsOpen={false} />
              </MainLayout>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;