import { ReportType } from '@jet/enums/report-type.enum';
import { Auto } from './auto.interface';
import { User } from './user.interface';

export interface Report {
  id: string;
  areaFrom: string;
  areaTo: string;
  autoId: Auto['id'];
  distanceInKm: number;
  fareDifferenceInInr: number;
  fareShownInInr: number;
  isTamperIndicatorActive: boolean;
  reporterId: User['id'];
  timeIn: string;
  timeOut: string;
  type: ReportType;
  createdAt: string;
  updatedAt: string;
}
