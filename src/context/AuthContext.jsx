import { createContext, useContext, useState } from "react";
import { mockStaff } from "../data/staffData.js";
import { demoPasswords } from "../data/credentialsData.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("cotamila_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated =
    currentUser !== null && currentUser.status === "Active";

  const login = (email, password) => {
    const user = mockStaff.find(
      (s) => s.email.toLowerCase() === email.toLowerCase(),
    );

    if (
      user &&
      user.status === "Active" &&
      demoPasswords[user.email] === password
    ) {
      setCurrentUser(user);
      localStorage.setItem("cotamila_user", JSON.stringify(user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("cotamila_user");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
