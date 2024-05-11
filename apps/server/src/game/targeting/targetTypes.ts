export type TargetType = 'Selected' | 'Random' | 'All' | 'Self';

export type TargetClass = 'Hero' | 'Minion' | 'All';

export type TargetAlliance = 'Friendly' | 'Enemy' | 'All';

export type FilterMethod = () => boolean;

export type TargetConfig = {
  targetType: TargetType;
  targetClass: TargetClass;
  targetAlliance: TargetAlliance;
  targetCount: number;
  filterMethod?: FilterMethod;
};

export type TargetData = {
  selectedTargets: string[];
};
