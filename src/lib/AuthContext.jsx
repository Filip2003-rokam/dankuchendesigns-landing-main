import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext();

/** Lokalna „admin“ sesija (bez Supabase Auth) — nakon ispravne šifre u Admin panelu. */
export const AuthProvider = ({ children }) => {
  const [adminLocal, setAdminLocal] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('adminAuth') === 'true';
  });

  const loginAdmin = useCallback(() => {
    localStorage.setItem('adminAuth', 'true');
    setAdminLocal(true);
  }, []);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem('adminAuth');
    setAdminLocal(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        adminLocal,
        loginAdmin,
        logoutAdmin,
        isLoadingAuth: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
