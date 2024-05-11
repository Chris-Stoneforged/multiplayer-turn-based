import { TargetConfig, TargetData } from './targetTypes';

export function resolveTargets(): string[] {
  // TODO:
  return ['blah', 'blah'];
}

export function validateTargetData(
  targetConfig: TargetConfig,
  targetData: TargetData
): boolean {
  if (targetConfig.targetType === 'Selected') {
    if (targetData.selectedTargets.length !== targetConfig.targetCount) {
      return false;
    }

    // TODO: Make sure targets are valid
  }

  return true;
}
