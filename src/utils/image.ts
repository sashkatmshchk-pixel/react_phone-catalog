export function resolveImage(path?: string): string {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  const clean = path.startsWith('/') ? path.slice(1) : path;

  return `/react_phone-catalog/${clean}`;
}