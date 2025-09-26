import React, { useState, useEffect } from 'react';

export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return React.Children.map(children, child => 
    React.cloneElement(child, { currentPath, navigate })
  );
}

export function Route({ path, component: Component, currentPath, navigate, ...props }) {
  if (currentPath === path) {
    return <Component navigate={navigate} {...props} />;
  }
  return null;
}

export function Link({ to, children, className, navigate, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
