export const formatDate = (date: string) => {
  // Örnek: '2025-01-01' => '01/01/2025' formatına çevir
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};
