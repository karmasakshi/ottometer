import { Report } from "./report.interface";

export interface NewReport extends Omit<Report, 'id'|'auto_id'| 'created_at'| 'updated_at'> {
   
  }