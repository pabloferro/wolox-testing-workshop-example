/* eslint-disable no-magic-numbers */
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { baseURL } from '~config/api';

import Login from './index';

const server = setupServer(
  rest.post(`${baseURL}login`, (req, res, ctx) =>
    res(
      ctx.json({
        sessionToken: 'xx.yy.zz.123',
        id: 1,
        username: 'Pablo'
      })
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it shows errors for each required field on submit', async () => {
  render(<Login />);

  userEvent.click(screen.getByRole('button'));

  expect(await screen.findAllByText('This field is required')).toHaveLength(2);
});

test('it logins on submit with correct credentials', async () => {
  const history = createMemoryHistory();
  history.push('/login');

  render(
    <Router history={history}>
      <Route path="/login">
        <Login />
      </Route>
    </Router>
  );

  userEvent.type(screen.getByLabelText(/Login:email/i), 'pablo.ferro@wolox.com.ar');
  userEvent.type(screen.getByLabelText(/Login:password/i), 'MiContraseña1234');
  userEvent.click(screen.getByRole('button'));

  await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
});

test('it logins on submit with wrong credentials', async () => {
  server.use(rest.post(`${baseURL}login`, (req, res, ctx) => res(ctx.status(401))));
  const history = createMemoryHistory();
  history.push('/login');

  render(
    <Router history={history}>
      <Route path="/login">
        <Login />
      </Route>
    </Router>
  );

  userEvent.type(screen.getByLabelText(/Login:email/i), 'pablo.ferro@wolox.com.ar');
  userEvent.type(screen.getByLabelText(/Login:password/i), 'BadPassword123');
  userEvent.click(screen.getByRole('button'));

  expect(await screen.findByText('Login:apiError')).toBeInTheDocument();
});
