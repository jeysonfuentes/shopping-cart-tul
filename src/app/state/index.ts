import { ShoppingCartEffects } from '../shopping-cart/state/shopping-cart.effects';
import { AuthEffects } from './auth/auth.effects';

export const AppEffectsArray: any[] = [AuthEffects, ShoppingCartEffects];
