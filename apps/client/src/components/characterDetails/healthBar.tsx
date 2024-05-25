import React, { useEffect, useState } from 'react';
import './healthBar.css';
import { IResourceState } from '@multiplayer-turn-based/common';

type HealthBarProps = {
  health: IResourceState;
  alighnLeft: boolean;
};

export default function HealthBar({
  health,
  alighnLeft: alightLeft,
}: HealthBarProps) {
  const [currentHealth, setCurrentHealth] = useState(health.currentValue);
  const [currentMaxHealth, setCurrentMaxHealth] = useState(health.maxValue);

  useEffect(() => {
    const currentHealthUnListen = health.listen(
      'currentValue',
      (currentValue: number, previousValue: number) =>
        setCurrentHealth(currentValue)
    );
    const maxHealtUOnListen = health.listen(
      'maxValue',
      (currentValue: number, previousValue: number) =>
        setCurrentMaxHealth(currentValue)
    );

    return () => {
      currentHealthUnListen();
      maxHealtUOnListen();
    };
  });

  return (
    <div
      className="health-bar-container"
      style={{
        width: `${currentMaxHealth * 15}px`,
      }}
    >
      <div
        className="health-bar"
        style={{
          width: `${(currentHealth / currentMaxHealth) * 100}%`,
        }}
      ></div>
      <div className="health-text">
        {currentHealth}/{currentMaxHealth}
      </div>
    </div>
  );
}
