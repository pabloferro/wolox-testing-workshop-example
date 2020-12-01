import { createContext } from 'react';

const SpoilersContext = createContext<{
  showSpoilers: boolean;
  // eslint-disable-next-line func-call-spacing
  setShowSpoilers: (showSpoilers: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ showSpoilers: false, setShowSpoilers: () => {} });

export default SpoilersContext;
