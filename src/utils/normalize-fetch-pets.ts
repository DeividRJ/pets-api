export function normalizeFetchPets(
  name?: string,
  description?: string,
  size?: string
): {
  name?: string;
  description?: string;
  size?: string;
} {
  const normalize = (value?: string) =>
    value
      ? value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove acentos
          .replace(/-/g, ' ')              // Substitui hífen por espaço
          .trim()
      : undefined;

  return {
    name: normalize(name),
    description: normalize(description),
    size: normalize(size),
  };
}