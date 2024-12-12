import { ReportType } from '@jet/enums/report-type.enum';
import { Auto } from './auto.interface';
import { User } from './user.interface';

export interface Report {
  id: string;
  auto_id: Auto['id'];
  auto_plate_state_code: string; // /^[A-Z]{2}$/
  auto_plate_district_code: string; // /^\d{2}$/
  auto_plate_series_code: string; // /^[A-Z]{1,2}$/
  auto_plate_vehicle_number: string; // /^\d{4}$/
  reporter_id: User['id'];
  area_from: string | null; // <= 300
  area_to: string | null; // <= 300
  fare_difference_in_inr: number | null; // >= 0
  meter_distance_in_km: number | null; // >= 0
  meter_fare_in_inr: number | null; // >= 23
  meter_waiting_time_in_min: number | null; // >= 0
  is_tamper_indicator_on: boolean | null;
  time_in: string | null;
  time_out: string | null;
  type: ReportType;
  created_at: string;
  updated_at: string;
}
