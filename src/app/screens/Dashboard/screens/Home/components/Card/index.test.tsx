import React from 'react';
import { render, screen } from '@testing-library/react';

import SpoilersContext from '~app/contexts/SpoilersContext';

import Card, { IData } from './index';

const SUPER_PABLO: IData = {
  id: 1,
  description: 'Super Pablo',
  height: '123',
  name: 'Super Pablo',
  photo: '',
  realName: 'Pablo Ferro',
  weight: '456'
};

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

test('shows the real name when showSpoilers is true', () => {
  customRender(<Card data={SUPER_PABLO} />, { providerOptions: { showSpoilers: true } });

  expect(screen.getByText(/Pablo Ferro/i)).toBeInTheDocument();
});

test("doesn't show the real name when showSpoilers is false", () => {
  customRender(<Card data={SUPER_PABLO} />, { providerOptions: { showSpoilers: false } });

  expect(screen.queryByText(/Pablo Ferro/i)).toBeNull();
  expect(screen.getByText('???')).toBeInTheDocument();
});

test("doesn't show the real name when it has no provider", () => {
  render(<Card data={SUPER_PABLO} />);

  expect(screen.queryByText(/Pablo Ferro/i)).toBeNull();
  expect(screen.getByText('???')).toBeInTheDocument();
});
