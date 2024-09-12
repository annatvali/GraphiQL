import { vi } from 'vitest';

export * from 'next/headers';

export const cookies = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
};
