import { Pagination } from './parametric/pagination.model';
export interface Response<TValue> {
  data: TValue
  code: number
  codeName: string
  pagination?: Pagination
}
