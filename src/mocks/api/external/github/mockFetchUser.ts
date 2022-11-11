import { ResponseResolver, MockedRequest, restContext } from 'msw';

export const mockFetchUser: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
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
    })
  );
