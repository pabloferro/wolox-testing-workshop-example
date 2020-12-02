import React from 'react';
import { act, render, screen } from '@testing-library/react';

import ActivityCheck from '~components/ActivityCheck';

const ACTIVITY_CHECK_INTERVAL = 3000;

beforeEach(() => {
  jest.useFakeTimers();
});

test('it renders nothing when the timer starts', () => {
  const { container } = render(<ActivityCheck />);

  expect(container.children).toHaveLength(0);
});

test('it renders the first message after 3 seconds', () => {
  render(<ActivityCheck />);

  act(() => {
    jest.advanceTimersByTime(ACTIVITY_CHECK_INTERVAL);
  });

  expect(screen.getByText(/Home:check1/i)).toBeInTheDocument();
});

test('it renders the second message after 6 seconds', () => {
  render(<ActivityCheck />);

  act(() => {
    jest.advanceTimersByTime(ACTIVITY_CHECK_INTERVAL * 2);
  });

  expect(screen.getByText(/Home:check2/i)).toBeInTheDocument();
});
