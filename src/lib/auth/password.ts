import bcrypt from 'bcryptjs';

export async function hash(password: string) {
  const salt = await bcrypt.genSalt(11);
  return bcrypt.hash(password, salt);
}

export async function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
