import React, { useEffect, useState } from 'react';
import './healthBar.css';
import { IResourceState } from '@multiplayer-turn-based/common';

type HealthBarProps = {
  health: IResourceState;
};

export default function HealthBar({ health }: HealthBarProps) {
  const [currentHealth, setCurrentHealth] = useState(health.currentValue);
  const [currentMaxHealth, setCurrentMaxHealth] = useState(health.maxValue);

  useEffect(() => {
    health.listen('currentValue', (currentValue: any, previousValue: any) =>
      setCurrentHealth(currentValue)
    );
    health.listen('maxValue', (currentValue: any, previousValue: any) =>
      setCurrentMaxHealth(currentValue)
    );
  });

  return (
    <div
      className="health-bar-container"
      style={{ width: `${currentMaxHealth * 15}px` }}
    >
      <div
        className="health-bar"
        style={{ width: `${(currentHealth / currentMaxHealth) * 100}%` }}
      ></div>
      <div className="health-text">
        {currentHealth}/{currentMaxHealth}
      </div>
    </div>
  );
}
