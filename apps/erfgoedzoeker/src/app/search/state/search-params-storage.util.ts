import { Params } from '@angular/router';

export const saveSearchParamsToSessionStorage = (params: Params): void => {
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem('lastSearchParams', JSON.stringify(params));
  }
};

export const loadSearchParamsFromSessionStorage = (): Params | null => {
  const stored = sessionStorage.getItem('lastSearchParams');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('[SearchStore] Failed to parse sessionStorage:', e);
    return null;
  }
};
