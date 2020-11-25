import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';

import Login from './index';

// describe('when the inputs are empty', () => {
//   test('it shows errors for required fields on submit', async () => {
//     render(<Login />);

//     fireEvent.click(await screen.findByRole('button'));

//     // expect(await screen.findByText('This field is required')).toBeInTheDocument();
//   });
// });

describe('when the inputs are correct', () => {
  test.only('it logins on submit', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    fireEvent.change(await screen.findByLabelText(/Login:email/i), {
      target: { value: 'pablo.ferro@wolox.com.ar' }
    });

    fireEvent.change(await screen.findByLabelText(/Login:password/i), {
      target: { value: 'MiContraseña1234' }
    });

    fireEvent.click(await screen.findByRole('button'));
    expect(await screen.findByText('Hello, Pablo'), undefined, { timeout: 5000 }).toBeInTheDocument();
  });
});
