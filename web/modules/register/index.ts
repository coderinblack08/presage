import { supabase } from "../../lib/supabase";

export const register = async ({ email, password, username }) => {
  const { error, user } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    alert(error.message);
    return false;
  }
  await supabase.auth.update({ data: { username } });
  await supabase
    .from("profiles")
    .insert({ id: user.id, username, displayName: username, email });
  return true;
};

export * from "./registerSchema";
