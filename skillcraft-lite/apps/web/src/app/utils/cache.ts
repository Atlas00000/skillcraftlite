interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheEntry<any>>;
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public getSize(): number {
    return this.cache.size;
  }
}

export const cache = Cache.getInstance();

// Example usage:
// const data = await fetchWithCache('/api/courses', 10 * 60 * 1000); // 10 minutes TTL
export async function fetchWithCache<T>(
  url: string,
  ttl: number = 5 * 60 * 1000,
  options?: RequestInit
): Promise<T> {
  const cacheKey = `fetch:${url}:${JSON.stringify(options)}`;
  const cachedData = cache.get<T>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(cacheKey, data, ttl);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Example usage:
// const user = await fetchWithCache<User>('/api/user/1');
// const courses = await fetchWithCache<Course[]>('/api/courses'); 