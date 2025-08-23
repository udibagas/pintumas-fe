export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page_url: string | null;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    page: number;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
