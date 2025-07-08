import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "notes",
        pathMatch: "full"
    },
    {
        path: 'notes',
        loadChildren: () =>
        import('./features/routes').then(m => m.routes),
    },
     {
        path: "**",
        redirectTo: "notes",
        pathMatch: "full"
    },
];

