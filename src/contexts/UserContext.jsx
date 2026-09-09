// src/contexts/UserContext.jsx
import { createContext, useContext } from "react";

const UserContext = createContext(null); //초기값

export function UserProvider({ user, children }) { //Children:뭐라도 받아서 쓴다는 의미
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
