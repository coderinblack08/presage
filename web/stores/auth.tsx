import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";

const UserContext = createContext<{
  user?: User | null;
  profile?: definitions["profiles"] | null;
  session?: Session | null;
  loading: boolean;
  refresh: any;
}>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  refresh: null,
});

export const UserProvider: React.FC = (props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {
    data: profile,
    error,
    isValidating,
    mutate,
  } = useSWR<definitions["profiles"]>(
    user?.id ? ["profiles", user.id] : null,
    async (_, userId) =>
      supabase
        .from<definitions["profiles"]>("profiles")
        .select("*")
        .eq("id", userId)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return data as definitions["profiles"];
        }),
    { revalidateOnFocus: false }
  );
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setSession(session);
      setUser(session?.user ?? null);
    }
    const { data: authListener, error } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );
    if (error) {
      throw error;
    }
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    profile,
    loading: !session || !user || isValidating,
    refresh: mutate,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Hook isn't located inside UserProvider");
  }
  return context;
};
