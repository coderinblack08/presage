export const URLSafeString = (s: string | string[]) =>
  typeof s === "string" ? s : Array.isArray(s) ? s[0] : null;
