export interface Auto {
  id: string;
  plate_state_code: string; // /^[A-Z]{2}$/
  plate_disctrict_code: string; // /^\d{2}$/
  plate_series_code: string; // /^[A-Z]{1,2}$/
  plate_vehicle_number: string; // /^\d{4}$/
  created_at: string;
  updated_at: string;
}
