import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent,
    },
    {
        path:"user/:userId",
        component: UserPageComponent,
    },
    {
        path:"**",
        component: PageNotFoundComponent
    }
];
