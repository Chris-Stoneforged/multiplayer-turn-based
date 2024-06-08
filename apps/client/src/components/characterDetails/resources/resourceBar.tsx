import React, { useEffect, useState } from 'react';
import './resourceBar.css';
import ManaGem from '../../../assets/mana-gem.png';
import { IResourceState } from '@multiplayer-turn-based/common';

type ResourceBarProps = {
  resource: IResourceState;
  resourceType: 'Mana' | 'Actions';
};

export default function ResourceBar({
  resource,
  resourceType,
}: ResourceBarProps) {
  const [currentResourceAmount, setCurrentResourceAmount] = useState(
    resource.currentValue
  );

  useEffect(() => {
    const resourceAmountUnlisten = resource.listen(
      'currentValue',
      (currentValue: number, previousValue: number) =>
        setCurrentResourceAmount(currentValue)
    );

    return () => {
      resourceAmountUnlisten();
    };
  });

  let icon: string;
  switch (resourceType) {
    case 'Mana':
      icon = ManaGem;
  }

  const items = Array.from({ length: currentResourceAmount });

  return (
    <div className="resource_list">
      {items.map((_, index) => (
        <li key={index}>
          <img src={icon} alt="" className="mana_gem" />
        </li>
      ))}
    </div>
  );
}
