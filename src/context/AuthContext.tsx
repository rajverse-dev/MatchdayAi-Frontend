import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authService } from "../services";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;

  logout: () => void;

  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeRole(role: string | null | undefined) {
  if (!role) return null;

  const cleaned = role.trim().toUpperCase();

  if (cleaned.startsWith("ROLE_")) {
    return cleaned;
  }

  return `ROLE_${cleaned}`;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [role, setRole] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const storedToken = localStorage.getItem("matchday_token");

    const storedUser = localStorage.getItem("matchday_user");

    const storedRole = localStorage.getItem("matchday_role");

    if (storedToken) {

      setToken(storedToken);

    }

    if (storedRole) {

      setRole(normalizeRole(storedRole));

    }

    if (storedUser) {

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser?.role) {
        setRole(normalizeRole(parsedUser.role));
      }

      setUser(parsedUser);

    }

    setIsLoading(false);

  }, []);

  const login = async (
    email: string,
    password: string
  ) => {

    const response = await authService.login({
      email,
      password,
    });

    const token = response.data.token;

    const role = normalizeRole(response.data.role);

    const emailAddress = response.data.email;

    const loggedUser = {
      email: emailAddress,
      role: role?.replace(/^ROLE_/, "").toLowerCase() as User["role"],
    } as User;

    setToken(token);

    setRole(role);

    setUser(loggedUser);

    localStorage.setItem(
      "matchday_token",
      token
    );

    localStorage.setItem(
      "matchday_role",
      role
    );

    localStorage.setItem(
      "matchday_user",
      JSON.stringify(loggedUser)
    );

  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => {

    await authService.register({
      name,
      email,
      password,
      phone,
    });

  };

  const logout = () => {

    authService.logout();

    setToken(null);

    setRole(null);

    setUser(null);

  };

  const updateUser = (
    updates: Partial<User>
  ) => {

    setUser((prev) => {

      if (!prev) return prev;

      const updated = {
        ...prev,
        ...updates,
      };

      localStorage.setItem(
        "matchday_user",
        JSON.stringify(updated)
      );

      return updated;

    });

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );

  }

  return context;

}