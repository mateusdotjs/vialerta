import { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(undefined);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function login(email, password) {
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setUser({ id: data.user.id, name: data.user.user_metadata.name });
    setLoggedIn(true);
    setLoading(false);
    return navigate("/home");
  }

  async function logout() {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setLoggedIn(false);
  }

  async function createUser(name, email, password) {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoggedIn(true);
    setLoading(false);
    return navigate("/home");
  }

  useEffect(() => {
    async function checkLogin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({ id: user.id, name: user.user_metadata.name });
        setLoggedIn(true);
      }
      setLoading(false);
    }
    setLoading(true);
    checkLogin();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        login,
        loggedIn,
        logout,
        createUser,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
