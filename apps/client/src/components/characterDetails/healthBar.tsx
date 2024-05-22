import React, { useEffect, useState } from 'react';
import './healthBar.css';
import { IResource } from '@multiplayer-turn-based/common';

type healthBarProps = {
  health: IResource;
};

export default function HealthBar({ health }: healthBarProps) {
  const [currentHealth, setCurrentHealth] = useState(health.currentValue);

  useEffect(() => {
    //health.onChange(() => setCurrentHealth(current => health.currentValue));
  });

  const percentage: number = health.currentValue / health.maxValue;
  return (
    <div
      className="health-bar-container"
      style={{ width: `${health.maxValue * 15}px` }}
    >
      <div
        className="health-bar"
        style={{ width: `${percentage * 100}%` }}
      ></div>
      <div className="health-text">
        {health.currentValue}/{health.maxValue}
      </div>
    </div>
  );
}
