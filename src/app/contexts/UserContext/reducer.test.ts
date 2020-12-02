import { reducer, ActionTypes } from './reducer';

const USER_EXAMPLE = {
  id: 1,
  sessionToken: '1234',
  username: 'Pablo'
};

test('handles SET_USER', () => {
  expect(reducer(undefined, { type: ActionTypes.SET_USER, payload: USER_EXAMPLE })).toEqual({
    user: USER_EXAMPLE
  });
});

test('handles RESET_USER', () => {
  expect(reducer({ user: USER_EXAMPLE }, { type: ActionTypes.RESET_USER })).toEqual({
    user: null
  });
});
