import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
