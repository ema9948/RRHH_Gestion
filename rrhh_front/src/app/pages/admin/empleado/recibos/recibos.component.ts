import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EmpleadoService } from 'src/app/services/admin/empleado-services.service';
import { Recibo, Root } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css'],
})
export class RecibosComponent {
  private file!: File;
  public recibos!: Recibo[];
  public recibosFilter!: Recibo[];

  constructor(
    private serviceAdm: AdminService,
    private seriveEmp: EmpleadoService,
    private activateRou: ActivatedRoute
  ) {
    this.allFuctions();
  }

  private allFuctions(): void {
    this.getEmpleado();
  }

  public eliminarRecibo(recibo: Recibo) {
    this.seriveEmp
      .eliminarRecivo(this.idEmpleado(), recibo.uuid)
      .subscribe((res) => {
        if (res.code != 200)
          return SwalAlertCustom.alert('error', 'Proceso Fallido.');
        setTimeout(() => {
          const res = this.recibosFilter.filter((item) => item.id != recibo.id);
          this.recibosFilter = res;
        }, 300);
        return SwalAlertCustom.alert('success', 'Proceso Exitoso.');
      });
  }

  public guardar() {
    const id: number = this.idEmpleado();

    if (!this.file) return SwalAlertCustom.alert('error', 'Campo requerido');

    this.seriveEmp.agregarRecibo(id, this.file).subscribe(
      (res) => {
        if (res.code == 201)
          SwalAlertCustom.alert('success', 'Proceso Exitoso.');
        return this.getEmpleado();
      },
      (err) => {
        return SwalAlertCustom.alert('error', 'Proceso Fallido.');
      }
    );
  }

  private getEmpleado(): void {
    this.serviceAdm.getEmpleado(this.idEmpleado()).subscribe((res) => {
      this.recibos = res.body.recibos;
      this.recibosFilter = res.body.recibos;
    });
  }

  public filterDate(a: any, b: any) {
    const fechaA = new Date(a.value).getTime();
    const FechaB = new Date(b.value).getTime() || new Date().getTime();

    const result = this.recibos.filter((item) => {
      const dateX = new Date(item.createOn).getTime();
      return fechaA <= dateX && dateX <= FechaB;
    });

    if (result.length <= 0) {
      this.recibosFilter = this.recibos;
      return SwalAlertCustom.alert('error', 'Sin coincidencias.');
    }
    this.recibosFilter = result;
  }

  public reciboFirmado(e: any) {
    if (e.target.checked) {
      this.recibosFilter = this.recibos.filter(
        (item) => item.firmar == e.target.checked
      );
      return;
    }

    this.recibosFilter = this.recibos;
  }
  public changeFile(e: any) {
    this.file = e.target.files[0];
  }

  private idEmpleado() {
    let id!: number;
    this.activateRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }
}
