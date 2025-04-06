import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';

// Import pages
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Clients from './pages/clients';
import Surveys from './pages/surveys';
import WidgetDashboard from './pages/widget-dashboard';
import AnalyticsDashboard from './pages/analytics-dashboard';
import NotFoundPage from './pages/not-found';

// Import providers
import { AuthProvider, useAuth } from './providers/auth-provider';
import { queryClient } from './lib/react-query';

// Import layout
import { MainLayout } from './components/layout/main-layout';

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundColor: '#fee2e2', 
          padding: '1rem'
        }}>
          <div style={{ 
            padding: '2rem', 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>
              Something went wrong
            </h1>
            <p style={{ marginBottom: '1rem' }}>
              We encountered an error while rendering the application.
            </p>
            {this.state.error && (
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
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Error:</p>
                <pre style={{ fontSize: '0.875rem' }}>{this.state.error.toString()}</pre>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              style={{ 
                display: 'inline-block', 
                padding: '0.5rem 1rem', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                borderRadius: '0.25rem', 
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Reload Page
            </button>
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
  const [location] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log('App is ready!');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  // Redirect root path to /dashboard
  if (location === '/') {
    window.location.href = '/dashboard';
    return null;
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
        <AuthProvider>
          <Switch>
          {/* Auth routes without main layout */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          {/* Main routes with layout */}
          <Route>
            <MainLayout>
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/clients" component={Clients} />
                <Route path="/surveys" component={Surveys} />
                <Route path="/analytics-dashboard" component={AnalyticsDashboard} />
                <Route path="/widget-dashboard" component={WidgetDashboard} />
                <Route component={NotFoundPage} />
              </Switch>
            </MainLayout>
          </Route>
          </Switch>
          {process.env.NODE_ENV !== 'production' && <DebugInfo />}
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;