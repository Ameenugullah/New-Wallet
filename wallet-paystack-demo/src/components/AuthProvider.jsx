import { createContext, useState } from "react";


// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// Create the provider component
const AuthProvider = ({ children }) => {
  // Initialize user directly from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function
  const login = (username, password) => {
    if (username && password) {
      const newUser = { username };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;