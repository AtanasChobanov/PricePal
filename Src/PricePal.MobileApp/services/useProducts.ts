import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

// Global cache - persists across component mounts/unmounts
class ProductCache {
  private products: any[] = [];
  private productMap = new Map<string, any>();
  private isLoaded = false;
  private loadPromise: Promise<any> | null = null;

  async loadProducts(): Promise<any[]> {
    // If already loaded, return cached data
    if (this.isLoaded) {
      return this.products;
    }

    // If currently loading, return the existing promise
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Start loading
    this.loadPromise = this.fetchFromAPI();
    
    try {
      const products = await this.loadPromise;
      this.products = products;
      this.isLoaded = true;
      
      // Build product map for quick lookups
      this.productMap.clear();
      products.forEach((product: any) => {
        this.productMap.set(product.name, product);
      });
      
      return products;
    } finally {
      this.loadPromise = null;
    }
  }

  private async fetchFromAPI(): Promise<any[]> {
    const response = await axios.get("https://pricepal-9scz.onrender.com/products");
    return response.data;
  }

  getProduct(productName: string): any | null {
    return this.productMap.get(productName) || null;
  }

  getAllProducts(): any[] {
    return this.products;
  }

  isDataLoaded(): boolean {
    return this.isLoaded;
  }

  // Force refresh cache
  async refresh(): Promise<any[]> {
    this.isLoaded = false;
    this.loadPromise = null;
    return this.loadProducts();
  }

  // Clear cache (for logout, etc.)
  clear() {
    this.products = [];
    this.productMap.clear();
    this.isLoaded = false;
    this.loadPromise = null;
  }
}

// Single global instance
const productCache = new ProductCache();

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    
    const loadData = async () => {
      // If data is already loaded, set it immediately
      if (productCache.isDataLoaded()) {
        if (mountedRef.current) {
          setProducts(productCache.getAllProducts());
          setLoading(false);
        }
        return;
      }

      try {
        const data = await productCache.loadProducts();
        
        if (mountedRef.current) {
          setProducts(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (mountedRef.current) {
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error("Unknown error occurred"));
          }
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Get single product (for product page) - INSTANT if cached
  const getProduct = useCallback((productName: string): any | null => {
    return productCache.getProduct(productName);
  }, []);

  // Refresh data manually
  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productCache.refresh();
      if (mountedRef.current) {
        setProducts(data);
      }
    } catch (err: unknown) {
      if (mountedRef.current) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error occurred"));
        }
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Check if data is available without loading
  const isDataAvailable = useCallback(() => {
    return productCache.isDataLoaded();
  }, []);

  return { 
    products, 
    loading, 
    error, 
    getProduct,      // NEW: Get single product instantly
    refreshProducts, // NEW: Manual refresh
    isDataAvailable  // NEW: Check if data is ready
  };
};

// Hook specifically for product pages - NO LOADING STATE
export const useProduct = (productName: string) => {
  const { getProduct, isDataAvailable } = useProducts();
  
  const product = getProduct(productName);
  const dataReady = isDataAvailable();

  return {
    product,
    found: !!product,
    dataReady
  };
};

// Export cache manager for advanced usage
export const clearProductCache = () => productCache.clear();
export const refreshProductCache = () => productCache.refresh();