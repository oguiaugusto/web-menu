import { jwtVerify, SignJWT } from 'jose';
import crypto from 'node:crypto';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signAccessToken(id: string) {
  return new SignJWT()
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(id)
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function generateToken() {
  return crypto.randomBytes(48).toString('hex');
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
