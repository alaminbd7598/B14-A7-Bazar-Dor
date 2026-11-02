export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: 'credential' | 'google' | 'github';
  createdAt: string;
}

interface StoredAccount extends AuthUser {
  password?: string;
}

export interface AuthResponse<T = AuthUser> {
  data: T | null;
  error: { message: string; code?: string } | null;
}

const USERS_STORAGE_KEY = 'bazardor_better_auth_users_v1';
const SESSION_STORAGE_KEY = 'bazardor_better_auth_session_v1';

const DEFAULT_DEMO_USERS: StoredAccount[] = [
  {
    id: 'usr_alamin_01',
    name: 'Al Amin',
    email: 'alaminbd7598@gmail.com',
    password: 'password123',
    provider: 'credential',
    createdAt: '2026-10-01T10:00:00.000Z',
  },
];

function getStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    // fallback in non-browser tests
  }
  return null;
}

let memoryUsers: StoredAccount[] = [...DEFAULT_DEMO_USERS];
let memorySession: AuthUser | null = null;

function loadUsers(): StoredAccount[] {
  const storage = getStorage();
  if (!storage) return memoryUsers;
  try {
    const raw = storage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      storage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
      return [...DEFAULT_DEMO_USERS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_DEMO_USERS];
  } catch {
    return [...DEFAULT_DEMO_USERS];
  }
}

export function getAvailableAccounts(): AuthUser[] {
  return loadUsers().map(toPublicUser);
}

function saveUsers(users: StoredAccount[]): void {
  memoryUsers = users;
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // ignore storage errors
    }
  }
}

function toPublicUser(acc: StoredAccount): AuthUser {
  return {
    id: acc.id,
    name: acc.name,
    email: acc.email,
    image: acc.image,
    provider: acc.provider,
    createdAt: acc.createdAt,
  };
}

export function getCurrentSessionUser(): AuthUser | null {
  const storage = getStorage();
  if (!storage) return memorySession;
  try {
    const raw = storage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function setCurrentSessionUser(user: AuthUser | null): void {
  memorySession = user;
  const storage = getStorage();
  if (storage) {
    try {
      if (user) {
        storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } else {
        storage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }
}

/**
 * BetterAuth-compatible client implementation (`authClient`)
 * Follows https://better-auth.com/docs/concepts/users-accounts#update-user
 */
export const authClient = {
  signUp: {
    email: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }): Promise<AuthResponse<AuthUser>> => {
      const trimmedName = (name || '').trim();
      const trimmedEmail = (email || '').trim().toLowerCase();

      if (!trimmedName) {
        return {
          data: null,
          error: { message: 'অনুগ্রহ করে আপনার নাম লিখুন।', code: 'NAME_REQUIRED' },
        };
      }
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return {
          data: null,
          error: { message: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।', code: 'INVALID_EMAIL' },
        };
      }
      if (!password || password.length < 8) {
        return {
          data: null,
          error: {
            message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।',
            code: 'PASSWORD_TOO_SHORT',
          },
        };
      }

      const users = loadUsers();
      const exists = users.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (exists) {
        return {
          data: null,
          error: {
            message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট খোলা আছে। সাইন ইন করুন।',
            code: 'USER_ALREADY_EXISTS',
          },
        };
      }

      const newAccount: StoredAccount = {
        id: `usr_${Date.now()}`,
        name: trimmedName,
        email: trimmedEmail,
        password,
        provider: 'credential',
        createdAt: new Date().toISOString(),
      };

      users.push(newAccount);
      saveUsers(users);

      return { data: toPublicUser(newAccount), error: null };
    },
  },

  signIn: {
    email: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<AuthResponse<AuthUser>> => {
      const trimmedEmail = (email || '').trim().toLowerCase();
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return {
          data: null,
          error: { message: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।', code: 'INVALID_EMAIL' },
        };
      }
      if (!password || password.length < 8) {
        return {
          data: null,
          error: {
            message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।',
            code: 'INVALID_PASSWORD',
          },
        };
      }

      const users = loadUsers();
      const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);

      if (!existing) {
        return {
          data: null,
          error: {
            message: 'এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে আগে সাইন আপ করুন।',
            code: 'USER_NOT_FOUND',
          },
        };
      }

      if (existing.password && existing.password !== password) {
        return {
          data: null,
          error: {
            message: 'ভুল পাসওয়ার্ড দিয়েছেন। আবার চেষ্টা করুন।',
            code: 'INVALID_CREDENTIALS',
          },
        };
      }

      const pubUser = toPublicUser(existing);
      setCurrentSessionUser(pubUser);
      return { data: pubUser, error: null };
    },

    social: async ({
      provider,
      name,
      email,
    }: {
      provider: 'google' | 'github';
      callbackURL?: string;
      name?: string;
      email?: string;
    }): Promise<AuthResponse<AuthUser>> => {
      const users = loadUsers();
      const socialEmail = (
        email?.trim() ||
        (provider === 'google' ? 'alaminbd7598@gmail.com' : 'alaminbd7598@github.com')
      ).toLowerCase();
      const socialName =
        name?.trim() ||
        (provider === 'google' ? 'Al Amin' : 'Al Amin (GitHub)');

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(socialEmail)) {
        return {
          data: null,
          error: { message: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।', code: 'INVALID_EMAIL' },
        };
      }

      let account = users.find((u) => u.email.toLowerCase() === socialEmail);
      if (!account) {
        account = {
          id: `usr_${provider}_${Date.now()}`,
          name: socialName,
          email: socialEmail,
          provider,
          createdAt: new Date().toISOString(),
        };
        users.push(account);
        saveUsers(users);
      } else if (name?.trim()) {
        account.name = socialName;
        account.provider = provider;
        saveUsers(users);
      }

      const pubUser = toPublicUser(account);
      setCurrentSessionUser(pubUser);
      return { data: pubUser, error: null };
    },
  },

  /**
   * BetterAuth updateUser method (Challenge C3)
   * https://better-auth.com/docs/concepts/users-accounts#update-user
   */
  updateUser: async ({
    name,
    image,
  }: {
    name: string;
    image?: string;
  }): Promise<AuthResponse<AuthUser>> => {
    const current = getCurrentSessionUser();
    if (!current) {
      return {
        data: null,
        error: { message: 'তথ্য আপডেট করতে প্রথমে সাইন ইন করুন।', code: 'UNAUTHORIZED' },
      };
    }

    const trimmedName = (name || '').trim();
    if (!trimmedName || trimmedName.length < 2) {
      return {
        data: null,
        error: { message: 'অনুগ্রহ করে একটি সঠিক নাম লিখুন (কমপক্ষে ২ অক্ষর)।', code: 'INVALID_NAME' },
      };
    }

    const users = loadUsers();
    const idx = users.findIndex(
      (u) => u.id === current.id || u.email.toLowerCase() === current.email.toLowerCase()
    );

    const updatedUser: AuthUser = {
      ...current,
      name: trimmedName,
      ...(image !== undefined ? { image } : {}),
    };

    if (idx !== -1) {
      users[idx] = {
        ...users[idx],
        name: trimmedName,
        ...(image !== undefined ? { image } : {}),
      };
      saveUsers(users);
    }

    setCurrentSessionUser(updatedUser);
    return { data: updatedUser, error: null };
  },

  signOut: async (): Promise<{ error: null }> => {
    setCurrentSessionUser(null);
    return { error: null };
  },

  getSession: async (): Promise<{ data: { user: AuthUser } | null }> => {
    const user = getCurrentSessionUser();
    return { data: user ? { user } : null };
  },
};
