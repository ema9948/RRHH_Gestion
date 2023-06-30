import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';
import { inject } from '@angular/core';

export const guardsChildren: CanActivateFn = (route, state) => {
  const data = inject(AdminService).getToken();
  const rout = inject(Router);
  if (!data) {
    rout.navigate(['admin', 'login']);
  }
  return data ? true : false;
};
