export class SearchParams {
  public readonly page?: number | null;
  public readonly perPage?: number | null;
  public readonly filterBy?: string | null;
  public readonly filterValue?: string | null;
  public readonly sortBy?: string | null;
  public readonly sortOrder?: 'asc' | 'desc' | null;
}
