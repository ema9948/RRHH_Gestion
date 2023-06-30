import { Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminService } from '../services/admin/admin.service';

export const filterAdmin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const data = inject(AdminService).getToken();
  const rout = inject(Router);
  if (!data) {
    rout.navigate(['admin', 'login']);
  }
  return data ? true : false;
};

export const filterEmpleado: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const data = inject(AdminService).getToken();
  const rout = inject(Router);
  if (!data) {
    rout.navigate(['login']);
  }
  return data ? true : false;
};
