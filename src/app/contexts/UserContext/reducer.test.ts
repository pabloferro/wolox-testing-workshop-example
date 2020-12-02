import { reducer, Action } from './reducer';

test('handles SET_USER', () => {
  expect(reducer(, emptyAction as Action)).toEqual({
    user: null
  });
});
