export type PagedResponse<T> = {
    items: T[];
    total:number;
    page:number;
    size:number;
}