import { replace } from 'lodash';
import numeral from 'numeral';

numeral.locale('pt-BR');

// ----------------------------------------------------------------------

export function fCurrency(number) {
  try {
    const formatMoneyBR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format;
    return formatMoneyBR(number);
  } catch {
    return number;
  }
}

export function fPercent(number) {
  try {
    return numeral(number / 100).format('0.0%');
  } catch {
    return number;
  }
}

export function fNumber(number) {
  try {
    return numeral(number).format();
  } catch {
    return number;
  }
}

export function fShortenNumber(number) {
  try {
    return replace(numeral(number).format('0.00a'), '.00', '');
  } catch {
    return number;
  }
}

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
}

export function fData(number) {
  try {
    return bytesToSize(number);
  } catch {
    return number;
  }
}
