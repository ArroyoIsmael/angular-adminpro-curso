import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
//MANTENIMIENTOS...
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashborad'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'} },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica'} },
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS'} },
          //MANTENIMIENTOS...
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
