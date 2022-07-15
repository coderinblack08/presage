import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/routers/_app";

export const trpc = createReactQueryHooks<AppRouter>();
