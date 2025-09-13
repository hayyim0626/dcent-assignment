export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total: number;
}
