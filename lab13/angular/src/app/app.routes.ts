import { Routes } from '@angular/router';

import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';
import { AddPersonComponent } from './add-person.component';
import { NotFoundComponent } from './not-found.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'add', component: AddPersonComponent },
  { path: '**', component: NotFoundComponent }
];
