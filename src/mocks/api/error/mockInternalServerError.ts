import { ResponseResolver, MockedRequest, restContext } from 'msw';

export const mockInternalServerError: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) =>
  res(
    ctx.status(500),
    ctx.json({
      message: 'Internal Server Error',
    })
  );
