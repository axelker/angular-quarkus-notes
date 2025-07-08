import { Routes } from "@angular/router";
import { NoteDetailPage } from "./pages/note-detail-page/note-detail-page";
import { NoteListPage } from "./pages/note-list-page/note-list-page";

export const routes: Routes = [
    {
        path: "",
        component: NoteListPage
    },
    {
        path: ":id",
        component: NoteDetailPage
    },
];
