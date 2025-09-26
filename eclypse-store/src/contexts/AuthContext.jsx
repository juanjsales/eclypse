import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: 1,
      email: 'maria@exemplo.com',
      password: '123456',
      name: 'Maria Silva',
      avatar: null,
      favorites: [],
      orders: [
        {
          id: 'ORD-001',
          date: '2024-01-15',
          status: 'Entregue',
          total: 89.90,
          items: [
            { id: 1, name: 'Eclipse Solar', price: 89.90, quantity: 1 }
          ]
        }
      ]
    },
    {
      id: 2,
      email: 'joao@exemplo.com',
      password: '123456',
      name: 'João Santos',
      avatar: null,
      favorites: [1, 3],
      orders: []
    }
  ];

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('eclypse-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('eclypse-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('eclypse-user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Email ou palavra-passe incorretos' };
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'Este email já está registado' };
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      email: userData.email,
      name: userData.name,
      avatar: null,
      favorites: [],
      orders: []
    };
    
    mockUsers.push({ ...newUser, password: userData.password });
    
    setUser(newUser);
    localStorage.setItem('eclypse-user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eclypse-user');
  };

  const updateProfile = async (profileData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('eclypse-user', JSON.stringify(updatedUser));
    setIsLoading(false);
    return { success: true };
  };

  const addToFavorites = (productId) => {
    if (!user) return;
    
    const updatedFavorites = user.favorites.includes(productId)
      ? user.favorites.filter(id => id !== productId)
      : [...user.favorites, productId];
    
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem('eclypse-user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    addToFavorites,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
