import path from 'path';
import { inspect } from 'util';

import jestOpenAPI from '..';

const dirContainingApiSpec = path.resolve('./__test__');

describe('Recreate bug (issue #257)', () => {
  beforeAll(() => {
    const pathToApiSpec = path.join(
      dirContainingApiSpec,
      'oneOfArrayIssue.yml',
    );
    jestOpenAPI(pathToApiSpec);
  });

  const res = {
    status: 200,
    req: {
      method: 'GET',
      path: '/recreate/bug',
    },
    body: {
      included: [
        { type: 'Apple', attributes: { rating: 5 } },
        { type: 'AppleOrange', attributes: { isTasty: true } },
        { type: 'Banana', attributes: { description: 'Yellow and sumptuous' } },
        { type: 'AppleOrange', attributes: { isTasty: false } },
        {
          type: 'Banana',
          attributes: { description: 'Another thing about a banana' },
        },
      ],
    },
  };

  it('passes', () => {
    expect(res).toSatisfyApiSpec();
  });
});
