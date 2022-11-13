export type TypeGuardFunction<T> = (value: unknown) => value is T;

export const fetchJson = async <T>(
  url: string,
  typeGuardFunction: TypeGuardFunction<T>
): Promise<T> => {
  const options: RequestInit = {
    method: 'GET',
  };

  const response = await fetch(url, options);
  if (response.status !== 200) {
    throw new Error(
      `${response.statusText} src/features/fetcher.ts failed to fetchJson`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const responseBody = await response.json();
  if (!typeGuardFunction(responseBody)) {
    throw new Error('src/features/fetcher.ts responseBody type si invalid');
  }

  return responseBody;
};
