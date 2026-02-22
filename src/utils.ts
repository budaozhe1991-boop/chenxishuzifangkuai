import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTarget(): number {
  // Generate a target sum between 10 and 30
  return Math.floor(Math.random() * 21) + 10;
}

export function generateBlockValue(): number {
  // Generate a block value between 1 and 9
  return Math.floor(Math.random() * 9) + 1;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
