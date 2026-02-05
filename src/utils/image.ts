export function resolveImage(path?: string): string {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  let clean = path.startsWith('/') ? path.slice(1) : path;

  clean = clean.replace(/^img\//, '');

  return `/img/${clean}`;
}