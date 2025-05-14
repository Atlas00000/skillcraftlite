import crypto from 'crypto';

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateExpirationDate(): Date {
  const date = new Date();
  date.setHours(date.getHours() + 24); // Token expires in 24 hours
  return date;
} 