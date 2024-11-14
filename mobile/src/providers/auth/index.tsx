import { api } from "@/libs/axios";
import { getTokenStorage, removeTokenStorage, setTokenStorage } from "@/storages/token";
import { getUserStorage, removeUserStorage, setUserStorage, User } from "@/storages/user";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextData = {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => Promise<void>;
  getUser: () => Promise<User>;
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
    await removeUserStorage()
    setIsAuthenticated(false);
  };

  const setUser = async (user: User) => {
    await setUserStorage(user);
  }

  const getUser = async () => {
    return await getUserStorage();
  }

  useEffect(() => {
    const subscribe = api.interceptToken(logout)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setUser, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}