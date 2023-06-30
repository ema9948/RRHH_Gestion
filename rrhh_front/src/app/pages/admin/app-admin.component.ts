import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
})
export class AppAdminComponent {
  constructor(private admin: AdminService, private activated: ActivatedRoute) {
    this.allfunction();
  }
  private allfunction() {}
}
