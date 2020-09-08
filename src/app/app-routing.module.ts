import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResponsiveLayoutComponent } from './responsive-layout/responsive-layout.component';


const routes: Routes = [
{ path: 'chart', component: ChartComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'template', component: ResponsiveLayoutComponent},
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
