export const getLocalISOString = (date: Date = new Date()): string => {
  const offset = parseInt(import.meta.env.VITE_TIMEZONE_OFFSET || '7', 10);
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const localDate = new Date(utc + (3600000 * offset));
  return localDate.toISOString().split('T')[0];
};

export const getLocalTimeGreeting = (): string => {
  const offset = parseInt(import.meta.env.VITE_TIMEZONE_OFFSET || '7', 10);
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localDate = new Date(utc + (3600000 * offset));
  const hour = localDate.getHours();

  if (hour < 12) return 'Good Morning!';
  if (hour < 18) return 'Good Afternoon!';
  return 'Good Evening!';
};
