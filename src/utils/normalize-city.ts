export function normalizeCity(city: string): string {
    return city
        .toLowerCase()                           // tudo minúsculo
        .normalize('NFD')                        // normaliza acentos
        .replace(/[\u0300-\u036f]/g, '')         // remove acentos
        .replace(/-/g, ' ')                      // troca hífen por espaço
        .trim();                                 // remove espaços extras
}