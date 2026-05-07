/* ────────────────────────────────────────────────────────
 * Success Response
 * ──────────────────────────────────────────────────────── */

export interface ISuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

/* ────────────────────────────────────────────────────────
 * Paginated Success Response
 * ──────────────────────────────────────────────────────── */

export interface IPaginatedSuccessResponse<T> extends ISuccessResponse<T[]> {
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

/* ────────────────────────────────────────────────────────
 * Error Response
 * ──────────────────────────────────────────────────────── */

export interface IErrorResponse {
  success: false;
  message: string;
  error?: string | Record<string, unknown>;
}
