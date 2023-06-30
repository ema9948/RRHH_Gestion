import { Component, Input } from '@angular/core';
import { Root } from 'src/utils/interface/interfaceGeneric';

@Component({
  selector: 'app-card-empleado',
  templateUrl: './card-empleado.component.html',
  styleUrls: ['./card-empleado.component.css'],
})
export class CardEmpleadoComponent {
  @Input('empleado')
  public empleado!: Root;
  constructor() {}
}
