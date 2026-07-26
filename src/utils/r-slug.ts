export function rSlug(slug: string, path = '') {
  return `/r/${slug}${path ? '/' + path.replace(/^\/+/, '') : ''}`;
}
