import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";

const UserContext = React.createContext({});

interface ProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState({ attributes: {} });

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => console.log("Failed fetching current user: ", err));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export { UserProvider };
export default UserContext;
