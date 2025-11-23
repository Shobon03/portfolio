export const base = import.meta.env.BASE_PATH;
export const link = (path: string) => `${base}${path.replace(/^\//, '')}`;
export const joinPath = (path: string) => {
  const base = import.meta.env.BASE_PATH;
  // Remove a barra inicial do path se ela existir para evitar "//"
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
