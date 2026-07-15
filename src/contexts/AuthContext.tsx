import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import authService from "../services1.0/auth.service";



import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../services1.0/auth.service";

interface AuthContextType {
  user: User | null;

  loading: boolean;

  authenticated: boolean;

  login: (
    credentials: LoginRequest
  ) => Promise<void>;

  register: (
    data: RegisterRequest
  ) => Promise<void>;

  logout: () => void;

  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    if (!authService.isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const currentUser =
        await authService.me();

      setUser(currentUser);
    } catch {
      authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    credentials: LoginRequest
  ) {
    await authService.login(credentials);

    const currentUser =
      await authService.me();

    setUser(currentUser);
  }

  async function register(
    data: RegisterRequest
  ) {
    await authService.register(data);
  }

  function logout() {
    authService.logout();

    setUser(null);
  }

  async function refreshUser() {
    try {
      const currentUser =
        await authService.me();

      setUser(currentUser);
    } catch {
      logout();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated:
          !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}