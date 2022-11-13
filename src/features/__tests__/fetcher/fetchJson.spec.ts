/**
 * @jest-environment jsdom
 */
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { z } from 'zod';
import { mockInternalServerError } from '../../../mocks/api/error/mockInternalServerError';
import { mockFetchUser } from '../../../mocks/api/external/github/mockFetchUser';
import { fetchJson } from '../../fetcher';
import { validation } from '../../validator';

const testUrl = 'https://api.github.com/users/keitakn';

const mockHandlers = [rest.get(testUrl, mockFetchUser)];

const mockServer = setupServer(...mockHandlers);

// 全ての型定義をするのは手間なので必要な値にだけ絞って型定義だけ行っています
type FetchGitHubUserResponseBody = {
  login: string;
  id: number;
  url: `https://api.github.com/users/${string}`;
  name: string;
  company: string;
  blog: string;
  location: string;
};

const fetchGitHubUserSchema = z.object({
  login: z.string().min(1).max(20),
  id: z.number().min(1).max(Number.MAX_SAFE_INTEGER),
  url: z.string().url(),
  name: z.string().min(1).max(20),
  blog: z.string().url(),
  location: z.string().min(1).max(20),
});

const isFetchGitHubUserResponseBody = (
  value: unknown
): value is FetchGitHubUserResponseBody => {
  return validation(fetchGitHubUserSchema, value).isValidate;
};

// eslint-disable-next-line max-lines-per-function
describe('src/features/fetcher.ts fetchJson TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it('should be able to fetch GitHub User', async () => {
    const expected = {
      login: 'keitakn',
      id: 11032365,
      node_id: 'ZZZZZZZZZZZZZZZZZZZZ',
      avatar_url: 'https://avatars.githubusercontent.com/u/11032365?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/keitakn',
      html_url: 'https://github.com/keitakn',
      followers_url: 'https://api.github.com/users/keitakn/followers',
      following_url:
        'https://api.github.com/users/keitakn/following{/other_user}',
      gists_url: 'https://api.github.com/users/keitakn/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/keitakn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/keitakn/subscriptions',
      organizations_url: 'https://api.github.com/users/keitakn/orgs',
      repos_url: 'https://api.github.com/users/keitakn/repos',
      events_url: 'https://api.github.com/users/keitakn/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/keitakn/received_events',
      type: 'User',
      site_admin: false,
      name: 'keita-koga',
      company: 'Freelance',
      blog: 'https://zenn.dev/keitakn',
      location: 'Tokyo',
      email: null,
      hireable: null,
      bio: null,
      twitter_username: 'keita_kn_web',
      public_repos: 70,
      public_gists: 7,
      followers: 54,
      following: 79,
      created_at: '2015-02-16T16:32:58Z',
      updated_at: '2022-10-23T08:26:58Z',
    };

    const result = await fetchJson<FetchGitHubUserResponseBody>(
      'https://api.github.com/users/keitakn',
      isFetchGitHubUserResponseBody
    );

    expect(result).toStrictEqual(expected);
  });

  it('should Error Throw, because Failed to fetch GitHub User', async () => {
    mockServer.use(rest.get(testUrl, mockInternalServerError));

    await expect(
      fetchJson(testUrl, isFetchGitHubUserResponseBody)
    ).rejects.toStrictEqual(
      new Error(
        'Internal Server Error src/features/fetcher.ts failed to fetchJson'
      )
    );
  });
});
