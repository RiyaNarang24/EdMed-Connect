"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  bloodGroup?: string;
  role: string;
  hospital?: string | null;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;

 login: (
  user: User,
  token: string
) => void;

updateUser: (
  user: User
) => void;

logout: () => void;

  isAuthenticated: boolean;

  isPatient: boolean;

  isHospitalAdmin: boolean;

  isSuperAdmin: boolean;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem("user");

      const storedToken =
        localStorage.getItem("token");

      if (
        storedUser &&
        storedUser !== "undefined" &&
        storedUser !== "null" &&
        storedToken
      ) {

        setUser(
          JSON.parse(storedUser)
        );

        setToken(storedToken);

      }

    }

    catch (error) {

      console.error(
        "Invalid auth data:",
        error
      );

      localStorage.removeItem("user");

      localStorage.removeItem("token");

    }

  }, []);

  const login = (
    user: User,
    token: string
  ) => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "token",
      token
    );

    setUser(user);

    setToken(token);

  };
const updateUser = (
  user: User
) => {

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  setUser(user);

};
  const logout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setToken(null);

    window.location.href = "/login";

  };

  const isAuthenticated =
    !!user && !!token;

  const isPatient =
    user?.role === "patient";

  const isHospitalAdmin =
    user?.role === "hospital-admin";

  const isSuperAdmin =
    user?.role === "super-admin";

  return (

    <AuthContext.Provider
  value={{
    user,
    token,
    login,
    updateUser,
    logout,
    isAuthenticated,
    isPatient,
    isHospitalAdmin,
    isSuperAdmin,
  }}
>

      {children}

    </AuthContext.Provider>

  );

}

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "AuthProvider missing"
    );

  }

  return context;

};