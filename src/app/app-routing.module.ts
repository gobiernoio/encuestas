import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'encuesta', loadChildren: './encuesta/encuesta.module#EncuestaPageModule' },
  { path: 'finalizar', loadChildren: './finalizar/finalizar.module#FinalizarPageModule' },
  { path: 'configuracion', loadChildren: './configuracion/configuracion.module#ConfiguracionPageModule' },
  { path: 'misencuestas', loadChildren: './misencuestas/misencuestas.module#MisencuestasPageModule' },
  { path: 'registro-detalle', loadChildren: './registro-detalle/registro-detalle.module#RegistroDetallePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
