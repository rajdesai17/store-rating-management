import bcrypt from 'bcryptjs';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};