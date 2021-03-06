import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TenantsPage } from '../pages/tenants/tenants';
import { RegisterPage } from '../pages/register/register';
import { LoginGuard } from '../routeguard/loginguard';

export const routes: any[] =
[
    {
          path: 'welcome',
          component: WelcomePage
    },
    {
          path: 'login',
          component: LoginPage
    },
    {
          path: 'register',
          component: RegisterPage
    },
    {
          path: 'home',
          component: HomePage,
          canActivate: [LoginGuard]
    },
    {
          path: 'tenants',
          component: TenantsPage
    },
    { 
        path: '', 
        redirectTo: '/welcome', 
        pathMatch: 'full' 
    }
]