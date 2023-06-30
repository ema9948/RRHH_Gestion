import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.css'],
})
export class SlicesComponent {
  @Input('id')
  public id!: Number;

  constructor(private route: Router) {}
  public logOut() {
    sessionStorage.clear();
    return this.route.navigate(['admin', 'login']);
  }
}
