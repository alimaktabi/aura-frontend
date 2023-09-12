export const IS_PRODUCTION =
  (import.meta.env.VITE_VERCEL_ENV || import.meta.env.NODE_ENV) ===
  'production';
export const __DEV__ =
  (import.meta.env.VITE_VERCEL_ENV || import.meta.env.NODE_ENV) !==
  'development';
