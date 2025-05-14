import React, { Suspense } from 'react';
import LoadingState from '../components/LoadingState';

interface LazyLoadProps {
  children: React.ReactNode;
  type?: 'card' | 'list' | 'table' | 'profile';
}

export function lazyLoad(Component: React.ComponentType<any>) {
  return function LazyLoadedComponent(props: any) {
    return (
      <Suspense fallback={<LoadingState type="card" />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export function LazyLoadWrapper({ children, type = 'card' }: LazyLoadProps) {
  return (
    <Suspense fallback={<LoadingState type={type} />}>
      {children}
    </Suspense>
  );
}

// Example usage:
// const LazyProfile = lazyLoad(() => import('../pages/Profile'));
// const LazyDashboard = lazyLoad(() => import('../pages/Dashboard')); 