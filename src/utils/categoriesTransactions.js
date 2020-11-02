const categories = {
  0: {
    color: '#2660A4',
    label: 'Alimentação',
    value: 1,
  },
  1: {
    color: '#FF6B35',
    label: 'Veículos',
    value: 2,
  },
  2: {
    color: '#FFBC42',
    label: 'Educação',
    value: 3,
  },
  3: {
    color: '#AD343E',
    label: 'Comras online',
    value: 4,
  },
  4: {
    color: '#AD3444',
    label: 'Outros',
    value: 4,
  },
};

export function getArrayCategories() {
  return Object.values(categories);
}

export default categories;
