export const formatRelativeDate = (
  dateParam: Date | string | number,
): string => {
  const date = new Date(dateParam);

  if (isNaN(date.getTime())) return 'Fecha inválida';

  const now = new Date();

  // Normalizamos las fechas a medianoche para comparar "días" reales sin que afecte la hora
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Diferencia en milisegundos convertida a días
  const diffInDays = Math.round(
    (startOfNow.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) {
    return 'Hoy';
  }

  if (diffInDays === 1) {
    return 'Ayer';
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
