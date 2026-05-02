/* ────────────────────────────────────────────────────────
 * Error Enums
 * ──────────────────────────────────────────────────────── */
export enum EQueryErrorStatus {
  FETCH_ERROR = "FETCH_ERROR",
  PARSING_ERROR = "PARSING_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  CUSTOM_ERROR = "CUSTOM_ERROR"
}

/* ────────────────────────────────────────────────────────
 * API Error Types
 * ──────────────────────────────────────────────────────── */

export interface IAPIErrorResponse {
  code?: number;
  success: false;
  data?: null;
  message: string;
  error?: string | Record<string, unknown> | unknown[];
}
