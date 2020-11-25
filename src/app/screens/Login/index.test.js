import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from './index';

describe('when the inputs are empty', () => {
  test('it shows errors for each required field on submit', async () => {
    render(<Login />);

    userEvent.click(screen.getByRole('button'));

    expect(await screen.findAllByText('This field is required')).toHaveLength(2);
  });
});

describe('when the credentials are correct', () => {
  test('it logins on submit', async () => {
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
});

describe('when the credentials are incorrect', () => {
  test('it logins on submit', async () => {
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
});
