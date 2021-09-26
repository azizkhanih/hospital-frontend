export interface ResponseBaseModel<T> {
  data: T;
  code: string;
  error: string;
  meta: number;
}
