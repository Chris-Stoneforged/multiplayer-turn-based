import React from 'react';
import './abilityButton.css';

export default function AbilityButton({ room }: any) {
  const onButtonClick = () => {
    room.send('use_action', {
      abilityId: 0,
      targetData: {
        selectedTargets: [],
      },
    });
  };

  return (
    <button className="ability_button" onClick={onButtonClick}>
      {' '}
      Cast{' '}
    </button>
  );
}
