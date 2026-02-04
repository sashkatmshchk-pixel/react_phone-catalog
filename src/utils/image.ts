const BASE = import.meta.env.BASE_URL;

export function resolveImage(path?: string): string {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  const clean = path.startsWith('/') ? path.slice(1) : path;

  return `${BASE}img/${clean.replace(/^img\//, '')}`;
}