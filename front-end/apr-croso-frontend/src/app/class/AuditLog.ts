export interface AuditLog {
  id: number;
  entityName: string;
  entityId: number;
  fieldName: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
}