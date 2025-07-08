export interface Note {
    id:number | null;
    name:string;
    content:string;
    createdAt?:Date;
}