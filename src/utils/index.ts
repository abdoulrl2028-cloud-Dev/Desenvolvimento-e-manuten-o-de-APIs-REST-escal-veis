export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = { ...obj };
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim();
    }
  });
  return sanitized;
};

export const paginate = (
  page: number = 1,
  limit: number = 10
): { skip: number; limit: number } => {
  return {
    skip: (page - 1) * limit,
    limit,
  };
};

export const formatResponse = <T>(
  data: T,
  message?: string,
  success: boolean = true
): Record<string, any> => {
  return {
    success,
    data,
    message: message || (success ? 'Sucesso' : 'Erro'),
    timestamp: new Date().toISOString(),
  };
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
