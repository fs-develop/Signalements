import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageReportsComponent } from './components/manage-reports/manage-reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'reporting', pathMatch: 'full' },
  { path: 'reporting', component: ManageReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
