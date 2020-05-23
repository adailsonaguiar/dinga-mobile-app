import bb_icon from '../assets/contas/bbicon.png';
import nu_icon from '../assets/contas/nuicon.png';
import standard_icon from '../assets/contas/standard_icon.png';

const accounts = () => {
  return {
    '000': {
      label: 'Carteira',
      description: 'Dinheiro em espécie',
      code: '000',
      icon: standard_icon,
    },
    '001': {
      label: 'Banco do Brasil - 001',
      description: 'Conta Corrente',
      code: '001',
      icon: bb_icon,
    },
    '104': {
      label: 'Caixa Econômica - 104',
      description: 'Conta Corrente',
      code: '104',
      icon: standard_icon,
    },
    '260': {
      label: 'Nuconta - 260',
      description: 'Conta Poupança / Investimento',
      code: '260',
      icon: nu_icon,
    },
    '204': {
      label: 'Bradesco - 204',
      description: 'Conta Corrente',
      code: '204',
      icon: standard_icon,
    },
    '033': {
      label: 'Santander - 033',
      description: 'Conta Corrente',
      code: '033',
      icon: standard_icon,
    },
    '341': {
      label: 'Itaú - 341',
      description: 'Conta Corrente',
      code: '341',
      icon: standard_icon,
    },
  };
};

export default accounts;
