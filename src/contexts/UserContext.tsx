import React, { useState, useEffect } from "react";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export interface User {
  name?: string;
  sub?: string;
  email?: string;
  department?: string;
  company?: string;
  address?: string;
  postalcode?: string;
  isAdmin?: boolean;
}

export interface UserContextType {
  user: User;
  authState: string;
}

interface ProviderProps {
  children: React.ReactNode;
}

const UserContext = React.createContext<UserContextType>({
  user: {},
  authState: "",
});

function UserProvider({ children }: ProviderProps) {
  const [authState, setAuthState] = useState<string>("");
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData: any) => {
      setAuthState(nextAuthState);

      if (authData?.attributes) {
        const cognitoGroups =
          authData?.signInUserSession?.accessToken?.payload["cognito:groups"];
        const isAdmin = !!(
          cognitoGroups && cognitoGroups.includes("administrator")
        );

        setUser({
          name: authData?.attributes?.name || "",
          sub: authData?.attributes?.sub || "",
          email: authData?.attributes?.email || "",
          department: authData?.attributes["custom:department"] || "",
          company: authData?.attributes["custom:company"] || "",
          address: authData?.attributes?.address || "",
          postalcode: authData?.attributes["custom:postalcode"] || "",
          isAdmin,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, authState }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;
