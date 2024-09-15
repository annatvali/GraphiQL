import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useStickyHeader } from '@/app/hooks/useStickyHeader';

describe('useStickyHeader', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useStickyHeader());
    expect(result.current).toBe(false);
  });

  it('should return true when window scrollY is greater than 50', async () => {
    const { result } = renderHook(() => useStickyHeader());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => expect(result.current).toBe(true));
  });

  it('should return false when window scrollY is less than 50', async () => {
    const { result } = renderHook(() => useStickyHeader());

    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => expect(result.current).toBe(false));
  });

  it('should remove event listener when component is unmounted', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useStickyHeader());

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
