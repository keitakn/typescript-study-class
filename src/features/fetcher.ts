export const fetchJson = async <T>(url: string): Promise<T> => {
  const options: RequestInit = {
    method: 'GET',
  };

  const response = await fetch(url, options);
  if (response.status !== 200) {
    throw new Error(
      `${response.statusText} src/features/fetcher.ts failed to fetchJson`
    );
  }

  return (await response.json()) as T;
};
