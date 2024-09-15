import { describe, expect, it, vi, beforeEach } from 'vitest';
import { initializeApp, getApps, App } from 'firebase-admin/app';

vi.mock('firebase-admin/app', async () => {
  const original = await vi.importActual('firebase-admin/app');
  const mockInitializeApp = vi.fn();

  return {
    ...original,
    initializeApp: mockInitializeApp,
    getApps: vi.fn(),
    cert: vi.fn(),
  };
});

vi.mock('firebase-admin/auth', async () => {
  const original = await vi.importActual('firebase-admin/auth');
  const mockGetAuth = vi.fn();

  return {
    ...original,
    getAuth: mockGetAuth,
  };
});

describe('Firebase Admin Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize Firebase Admin app with correct config', async () => {
    const mockGetApps = vi.mocked(getApps);
    const mockInitializeApp = vi.mocked(initializeApp);
    const mockFirebaseAdminApp = {} as unknown as App;

    mockGetApps.mockReturnValue([]);
    mockInitializeApp.mockReturnValue(mockFirebaseAdminApp);

    await import('@/lib/firebase/server/config');

    expect(mockInitializeApp).toHaveBeenCalledWith({ credential: undefined }, 'firebase-admin-app');
  });

  it('should not initialize Firebase Admin app if already initialized', async () => {
    const mockGetApps = vi.mocked(getApps);
    const mockInitializeApp = vi.mocked(initializeApp);
    const mockFirebaseAdminApp = {} as unknown as App;

    mockGetApps.mockReturnValue([mockFirebaseAdminApp]);

    await import('@/lib/firebase/server/config');

    expect(mockInitializeApp).not.toHaveBeenCalled();
  });
});
