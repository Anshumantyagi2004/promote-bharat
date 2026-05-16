"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { setUser } from "./slices/authSlice";

function InitAuth({ children }) {
  const dispatch = useDispatch();

  const loadUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        dispatch(setUser(null)); // IMPORTANT FIX
      }
    } catch (err) {
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    loadUser();
    const interval = setInterval(() => {
      loadUser();
    }, 60000); // 60 sec

    return () => clearInterval(interval);
  }, []);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <InitAuth>{children}</InitAuth>
    </Provider>
  );
}