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
    // If an object is passed (from Signup), use it directly
    if (username && typeof username === "object") {
      const newUser = username;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }

    // If a string username is passed, try to rehydrate from localStorage
    if (typeof username === "string") {
      const savedRaw = localStorage.getItem("user");
      if (savedRaw) {
        try {
          const saved = JSON.parse(savedRaw);
          if (saved.username === username) {
            setUser(saved);
            return true;
          }
        } catch {
          // ignore parse errors
        }
      }

      // If password provided, create a minimal user object
      if (password) {
        const newUser = { username };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return true;
      }
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