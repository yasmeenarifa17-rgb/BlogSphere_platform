import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (savedUser) {
      setUser(savedUser);
    }

  }, []);

  const login = (email, password) => {

    if (!email || !password) {

      alert("Please fill all fields");

      return false;
    }

    const cleanEmail =
      email.trim().toLowerCase();

    // ADMIN LOGIN

    if (
      cleanEmail ===
        "yasmeenarifa17@gmail.com" &&
      password === "123456"
    ) {

      const adminUser = {
        email: cleanEmail,
        role: "admin",
      };

      setUser(adminUser);

      localStorage.setItem(
        "user",
        JSON.stringify(adminUser)
      );

      return true;
    }

    // NORMAL USER LOGIN

    const normalUser = {
      email: cleanEmail,
      role: "user",
    };

    setUser(normalUser);

    localStorage.setItem(
      "user",
      JSON.stringify(normalUser)
    );

    return true;
  };

  const register = (email, password) => {

    if (!email || !password) {

      alert("Please fill all fields");

      return false;
    }

    const cleanEmail =
      email.trim().toLowerCase();

    const newUser = {

      email: cleanEmail,

      role:
        cleanEmail ===
        "yasmeenarifa17@gmail.com"
          ? "admin"
          : "user",
    };

    setUser(newUser);

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    return true;
  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;