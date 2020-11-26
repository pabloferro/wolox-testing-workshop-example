import React, { useContext } from 'react';

import SpoilersContext from '~contexts/SpoilersContext';

function ToggleSpoilersButton({ className }: { className: string }) {
  const { showSpoilers, setShowSpoilers } = useContext(SpoilersContext);
  return (
    <button className={className} type="button" onClick={() => setShowSpoilers(!showSpoilers)}>
      {showSpoilers ? 'Hide' : 'Show'} Spoilers
    </button>
  );
}

export default ToggleSpoilersButton;
