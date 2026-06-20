export const LEVEL_SYSTEM = {
  // how many points per level
  pointsPerLevel: 100,

// maximum level achievable
  maxLevel: 50
};

export function calculateLevel(points) {
  return Math.floor(points / LEVEL_SYSTEM.pointsPerLevel) + 1;
}

export function pointsToNextLevel(points) {
  const currentLevelBase =
    Math.floor(points / LEVEL_SYSTEM.pointsPerLevel) *
    LEVEL_SYSTEM.pointsPerLevel;

  return LEVEL_SYSTEM.pointsPerLevel - (points - currentLevelBase);
}

export function levelProgress(points) {
  const progress =
    ((points % LEVEL_SYSTEM.pointsPerLevel) /
      LEVEL_SYSTEM.pointsPerLevel) *
    100;

  return Math.round(progress);
}