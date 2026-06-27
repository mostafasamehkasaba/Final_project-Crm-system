"use client";

import React, { createContext, useState } from "react";

type UserContextType = {
  UserToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
}

export default function UserContextProvider({ children }: Props) {
  const [UserToken, setUserToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userToken2");
  });

  return (
    <UserContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
