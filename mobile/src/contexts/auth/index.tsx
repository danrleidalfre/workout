import { getTokenStorage, removeTokenStorage, setTokenStorage } from "@/storages/token";
import { setUserStorage, User } from "@/storages/user";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextData = {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getTokenStorage();
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

  const login = async (token: string) => {
    await setTokenStorage(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeTokenStorage();
    setIsAuthenticated(false);
  };

  const setUser = async (user: User) => {
    await setUserStorage(user);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}