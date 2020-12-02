import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SpoilersContext from '~app/contexts/SpoilersContext';

import ToggleSpoilersButton from './index';

type CustomRenderOptions = {
  providerOptions: Partial<{
    showSpoilers: boolean;
    setShowSpoilers: (showSpoilers: boolean) => void;
  }>;
};

const customRender = (ui: React.ReactNode, { providerOptions, ...renderOptions }: CustomRenderOptions) =>
  render(
    <SpoilersContext.Provider
      value={{
        setShowSpoilers: jest.fn(),
        showSpoilers: false,
        ...providerOptions
      }}
    >
      {ui}
    </SpoilersContext.Provider>,
    renderOptions
  );

test('toggles show spoiler to true on click', () => {
  const setShowSpoilers = jest.fn();
  customRender(<ToggleSpoilersButton />, { providerOptions: { showSpoilers: false, setShowSpoilers } });

  userEvent.click(screen.getByRole('button'));

  expect(setShowSpoilers).toHaveBeenCalledWith(true);
});

test('toggles show spoiler to false on click', () => {
  const setShowSpoilers = jest.fn();
  customRender(<ToggleSpoilersButton />, { providerOptions: { showSpoilers: true, setShowSpoilers } });

  userEvent.click(screen.getByRole('button'));

  expect(setShowSpoilers).toHaveBeenCalledWith(false);
});

test('renders hide spoilers when showSpoilers is true', () => {
  customRender(<ToggleSpoilersButton />, { providerOptions: { showSpoilers: true } });

  expect(screen.getByText('Hide Spoilers')).toBeInTheDocument();
});

test('renders show spoilers when showSpoilers is true', () => {
  customRender(<ToggleSpoilersButton />, { providerOptions: { showSpoilers: false } });

  expect(screen.getByText('Show Spoilers')).toBeInTheDocument();
});
