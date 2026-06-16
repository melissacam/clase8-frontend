import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PokemonDetail } from './pages/pokemon-detail/pokemon-detail';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'pokemon/:nombre', component: PokemonDetail },
    { path: '**', redirectTo: '' }
    

];
