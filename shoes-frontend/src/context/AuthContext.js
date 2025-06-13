import { createContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user"); // Remove corrupted data
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const authValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
