export const base = import.meta.env.BASE_URL;
export const link = (path: string) => `${base}${path.replace(/^\//, '')}`;
export const joinPath = (path: string) => {
  const base = import.meta.env.BASE_URL;
  // Remove a barra inicial do path se ela existir para evitar "//"
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
