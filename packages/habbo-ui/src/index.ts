/** Available React editions. Import components and styles through their year entry. */
export const editions = ['2003', '2006', '2008'] as const;
export type Edition = typeof editions[number];
