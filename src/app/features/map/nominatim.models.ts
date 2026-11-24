export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ReverseResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: Record<string, string>;
  [key: string]: unknown;
}

export interface ReverseLookup {
  result: ReverseResult;
  fromCache: boolean;
  elapsedMs: number;
}
