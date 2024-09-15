import { describe, it, expect, vi } from 'vitest';
import CatchAllPage from '@/app/[locale]/[...rest]/page';
import { notFound } from 'next/navigation';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('CatchAllPage', () => {
  it('calls notFound on render', () => {
    CatchAllPage();

    expect(notFound).toHaveBeenCalled();
  });
});
