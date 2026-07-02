function toLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day || 1);
}

export function formatMonthYear(dateString, language) {
  return toLocalDate(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
  });
}

export function formatExperienceDateRange(startDate, endDate, language) {
  const start = formatMonthYear(startDate, language);
  const end = endDate
    ? formatMonthYear(endDate, language)
    : language === 'en'
      ? 'Present'
      : 'Presente';

  return `${start} - ${end}`;
}
