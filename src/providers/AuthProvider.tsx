import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/models";
import * as SecureStore from "expo-secure-store";

type Session = {
  user: User;
  accessToken: string;
};

type AuthContextType = {
  signIn: (handle: string) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const signIn = (handle: string) => {
    const session: Session = {
      user: { id: "1", handle, name: "Ayush", avatar: "" },
      accessToken: "token",
    };

    setSession(session);
    saveSession(session);
  };
  const signOut = () => {
    setSession(null);
    saveSession(null);
  };

  const saveSession = async (value: Session | null) => {
    if (value) {
      await SecureStore.setItemAsync("session", JSON.stringify(value));
    } else {
      await SecureStore.deleteItemAsync("session");
    }
  };

  const loadSession = async () => {
    let sessionData = await SecureStore.getItemAsync("session");
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    } else {
      setSession(null);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
