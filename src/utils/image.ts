export function resolveImage(src: string): string {
  if (!src) {
    return '/img/placeholder.webp';
  }

  if (src.startsWith('/img/')) {
    return src;
  }

  if (src.startsWith('/')) {
    return `/img${src}`;
  }

  return `/img/${src}`;
}