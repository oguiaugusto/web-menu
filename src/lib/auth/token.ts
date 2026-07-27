import { jwtVerify, SignJWT } from 'jose';
import { bytesToHex } from '@noble/hashes/utils.js'
import { sha256 } from '@noble/hashes/sha2.js'

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
  const bytes = crypto.getRandomValues(new Uint8Array(48));
  return bytesToHex(bytes);
}

export function hashToken(token: string) {
  const tokenBytes = new TextEncoder().encode(token);
  return bytesToHex(sha256(tokenBytes));
}
