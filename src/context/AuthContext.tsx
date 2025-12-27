import { createContext, useContext, useState } from "react";
import API from "../services/api";
import { stopLocationTracking } from "../utils/locationTracker";
import { startLocationTracking } from "../utils/locationTracker";


const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ LOGIN (Backend connected)
  const login = async (email, password) => {
    try {
      const response = await API.post("/users/login", {
        email,
        password,
      });

      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        startLocationTracking(response.data.data.id);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  // ✅ SIGNUP (Backend connected)
  const signup = async (name, phone, email, password) => {
    try {
      const response = await API.post("/users/register", {
        name,
        phone,
        email,
        password,
      });

      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  // ✅ LOGOUT
const logout = () => {
  stopLocationTracking();   // 🔥 CRITICAL
  setUser(null);
  localStorage.removeItem("user");
};


  // 🔸 Local-only updates (until backend is connected)
  const updateSwapPreferences = (mode, amount) => {
    if (user) {
      const updatedUser = { ...user, swapMode: mode, amount };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const updateProfile = (name, email, phone) => {
    if (user) {
      const updatedUser = { ...user, name, email, phone };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateSwapPreferences,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
