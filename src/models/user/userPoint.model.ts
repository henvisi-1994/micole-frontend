export interface UserPoint {
  totalPoints: number;
  availablePoints: number;
  level?: string;
  levelIcon?: string;
  lowerBound?: number;
  upperBound?: number;
  levelDescription?: string;
}
