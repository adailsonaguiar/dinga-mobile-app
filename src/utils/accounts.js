export const accounts = {
  '000': {
    color: '#fff',
    label: 'Carteira',
    accountType: 'Dinheiro em espécie',
    value: '000',
  },
  204: {
    color: '#CB0327',
    label: 'Bradesco - 204',
    accountType: 'Corrente/poupança',
    value: '204',
  },
  104: {
    color: '#0270AF',
    label: 'Caixa Econômica - 104',
    accountType: 'Corrente/poupança',
    value: '104',
  },
  260: {
    color: '#8A38BA',
    label: 'Nuconta - 260',
    accountType: 'Poupança / Investimento',
    value: '260',
  },
  '033': {
    color: '#CC0000',
    label: 'Santander - 033',
    accountType: 'Corrente/poupança',
    value: '033',
  },
  341: {
    color: '#EC7000',
    label: 'Itaú - 341',
    accountType: 'Corrente/poupança',
    value: '341',
  },
};

export function getArrayAccounts() {
  return Object.values(accounts);
}

export const getAccountIndentity = () => {
  const accountIndetify = {};
  getArrayAccounts().map((account) => {
    accountIndetify[account.value] = account;
  });
  return accountIndetify;
};
