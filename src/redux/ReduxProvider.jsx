"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { setUser } from "./slices/authSlice";

function InitAuth({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) {
        dispatch(setUser(data.user));
      }
    };

    loadUser();
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