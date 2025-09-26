import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../products';

const StockContext = createContext();

export function useStock() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
}

export function StockProvider({ children }) {
  const [stock, setStock] = useState({});
  const [lowStockThreshold] = useState(5);

  // Initialize stock with mock data
  useEffect(() => {
    const initialStock = {};
    productsData.forEach(product => {
      initialStock[product.id] = {
        quantity: Math.floor(Math.random() * 20) + 5, // Random stock between 5-24
        reserved: 0, // Items in carts but not yet purchased
        sold: Math.floor(Math.random() * 50), // Total sold
        restockDate: null
      };
    });
    setStock(initialStock);
  }, []);

  const getProductStock = (productId) => {
    return stock[productId] || { quantity: 0, reserved: 0, sold: 0, restockDate: null };
  };

  const getAvailableStock = (productId) => {
    const productStock = getProductStock(productId);
    return Math.max(0, productStock.quantity - productStock.reserved);
  };

  const isInStock = (productId, requestedQuantity = 1) => {
    return getAvailableStock(productId) >= requestedQuantity;
  };

  const isLowStock = (productId) => {
    return getAvailableStock(productId) <= lowStockThreshold && getAvailableStock(productId) > 0;
  };

  const reserveStock = (productId, quantity) => {
    if (!isInStock(productId, quantity)) {
      return false;
    }

    setStock(prevStock => ({
      ...prevStock,
      [productId]: {
        ...prevStock[productId],
        reserved: prevStock[productId].reserved + quantity
      }
    }));

    return true;
  };

  const releaseStock = (productId, quantity) => {
    setStock(prevStock => ({
      ...prevStock,
      [productId]: {
        ...prevStock[productId],
        reserved: Math.max(0, prevStock[productId].reserved - quantity)
      }
    }));
  };

  const purchaseStock = (productId, quantity) => {
    if (!isInStock(productId, quantity)) {
      return false;
    }

    setStock(prevStock => ({
      ...prevStock,
      [productId]: {
        ...prevStock[productId],
        quantity: prevStock[productId].quantity - quantity,
        reserved: Math.max(0, prevStock[productId].reserved - quantity),
        sold: prevStock[productId].sold + quantity
      }
    }));

    return true;
  };

  const restockProduct = (productId, quantity, restockDate = null) => {
    setStock(prevStock => ({
      ...prevStock,
      [productId]: {
        ...prevStock[productId],
        quantity: prevStock[productId].quantity + quantity,
        restockDate: restockDate
      }
    }));
  };

  const getLowStockProducts = () => {
    return Object.keys(stock).filter(productId => isLowStock(productId));
  };

  const getOutOfStockProducts = () => {
    return Object.keys(stock).filter(productId => getAvailableStock(productId) === 0);
  };

  const getStockStatus = (productId) => {
    const availableStock = getAvailableStock(productId);
    
    if (availableStock === 0) {
      return 'out_of_stock';
    } else if (availableStock <= lowStockThreshold) {
      return 'low_stock';
    } else {
      return 'in_stock';
    }
  };

  const getStockMessage = (productId) => {
    const status = getStockStatus(productId);
    const availableStock = getAvailableStock(productId);
    
    switch (status) {
      case 'out_of_stock':
        const productStock = getProductStock(productId);
        if (productStock.restockDate) {
          return `Esgotado - Reposição prevista para ${productStock.restockDate}`;
        }
        return 'Produto esgotado';
      case 'low_stock':
        return `Apenas ${availableStock} unidades disponíveis`;
      default:
        return `${availableStock} unidades disponíveis`;
    }
  };

  // Simulate stock updates (for demonstration)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update stock for some products
      const productIds = Object.keys(stock);
      if (productIds.length > 0) {
        const randomProductId = productIds[Math.floor(Math.random() * productIds.length)];
        const randomChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        
        if (randomChange !== 0) {
          setStock(prevStock => ({
            ...prevStock,
            [randomProductId]: {
              ...prevStock[randomProductId],
              quantity: Math.max(0, prevStock[randomProductId].quantity + randomChange)
            }
          }));
        }
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [stock]);

  const value = {
    stock,
    getProductStock,
    getAvailableStock,
    isInStock,
    isLowStock,
    reserveStock,
    releaseStock,
    purchaseStock,
    restockProduct,
    getLowStockProducts,
    getOutOfStockProducts,
    getStockStatus,
    getStockMessage,
    lowStockThreshold
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
}
