import { format, parseISO, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// ----------------------------------------------------------------------

/* eslint-disable no-empty */
export function toDate(date, fmt) {
  try {
    let newDate = date;
    if (fmt === 'dd/MM/yyyy') {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      newDate = date.replace(pattern, '$3-$2-$1');
    }
    return new Date(parseISO(newDate));
  } catch {
    return date;
  }
}

export function fDate(date, fmt) {
  try {
    let newDate = date;
    if (fmt === 'dd/MM/yyyy') {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      newDate = date.replace(pattern, '$3-$2-$1');
    }
    return format(new Date(newDate), 'dd MMM yyyy', { locale: ptBR });
  } catch {
    return date;
  }
}

export function fTimestamp(date) {
  try {
    return format(new Date(date * 1000), 'dd MMM yyyy', { locale: ptBR });
  } catch {
    return date;
  }
}

export function fMYDate(date, fmt = 'dd/MM/yyyy') {
  try {
    let newDate = date;
    if (fmt === 'dd/MM/yyyy') {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      newDate = date.replace(pattern, '$3-$2-$1');
    }
    return format(new Date(newDate), 'MMMM yyyy', { locale: ptBR });
  } catch {
    return date;
  }
}

export function fDateTime(date, fmt) {
  try {
    let newDate = date;
    if (fmt === 'dd/MM/yyyy') {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      newDate = date.replace(pattern, '$3-$2-$1');
    }
    return format(new Date(newDate), 'dd MMM yyyy HH:mm', { locale: ptBR });
  } catch {
    return date;
  }
}

export function fDateTimeSuffix(date, fmt) {
  try {
    let newDate = date;
    if (fmt === 'dd/MM/yyyy') {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      newDate = date.replace(pattern, '$3-$2-$1');
    }
    return format(new Date(newDate), 'dd/MM/yyyy hh:mm p');
  } catch {
    return date;
  }
}

export function fToNow(date, fmt) {
  try {
    let newDate = date;
    if (fmt === 'dd/MM/yyyy') {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      newDate = date.replace(pattern, '$3-$2-$1');
    }
    return formatDistanceToNow(new Date(newDate), {
      addSuffix: true,
      locale: ptBR
    });
  } catch {
    return date;
  }
}
/* eslint-enable no-empty */
