import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';


export const profileGuard: CanActivateFn = (route, state) => {

  let routeToPage = new Router();

  if (localStorage.getItem('token') == null) {

    return true;

  }

  else {

    routeToPage.navigateByUrl('/chat');
    return false;
  }

};

export const authGuard: CanActivateFn = (route, state) => {

  let routeToPage = new Router();

  if (localStorage.getItem('token') == null) {

    routeToPage.navigateByUrl('');
    return false;

  }

  else {

    return true;
  }

};

