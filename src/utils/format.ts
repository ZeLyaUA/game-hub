/**
 * Форматирует число, добавляя разделители тысяч
 * Пример: 25438 => 25 438
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}

/**
 * Форматирует дату в локализованный формат
 * Пример: 2025-04-20 => 20 апреля 2025
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Форматирует длительность в минутах в читаемый формат
 * Пример: 4 => 4 мин
 */
export function formatReadTime(minutes: number): string {
  return `${minutes} мин`;
}
