import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { Recibo, Root } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css'],
})
export class RecibosEmpleadoComponent {
  public recibos!: Recibo[];
  public recibosFilter!: Recibo[];
  private empleado!: Root;

  constructor(
    private serviceEmpleado: EmpleadoService,
    private activatedRou: ActivatedRoute
  ) {
    this.allFunctions();
  }

  private allFunctions() {
    this.getRecibos();
  }

  private getRecibos() {
    const id = this.idEmpleado();
    this.serviceEmpleado.getEmpleado(id).subscribe((res: HttpResponse<any>) => {
      if (res.status != 200 || !res.body)
        return SwalAlertCustom.alert('error', 'Fallo en la Aplicacion.');
      const { recibos } = res.body;
      this.empleado = res.body;
      this.recibosFilter = recibos;
      this.recibos = recibos;
      return;
    });
  }

  public firmarRecibo(id: number) {
    this.serviceEmpleado.firmarRecibo(this.empleado, id).subscribe(
      (res) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Proceso Fallido.');

        this.recibosFilter = this.recibosFilter.filter((item) => {
          if (item.id == id) {
            item.firmar = true;
            return item;
          }
          return item;
        });
        return SwalAlertCustom.alert('success', 'Recibo Firmado.');
      },
      (erro) => {
        return SwalAlertCustom.alert('error', 'Proceso Fallido.');
      }
    );
  }

  public descargar(recibo: Recibo) {
    if (!recibo.firmar) return;
    this.serviceEmpleado.descargarRecibo(recibo.uuid).subscribe((res) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(res);
      a.href = objectUrl;
      a.download = recibo.name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
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

  public filterDate(a: any, b: any) {
    const fechaA = new Date(a.value).getTime();
    const fechaB = new Date(b.value).getTime();
    console.log(fechaA, fechaB);

    const filter = this.recibos.filter((item) => {
      const fechaX = new Date(item.createOn).getTime();
      return fechaA <= fechaX && fechaB >= fechaX;
    });

    if (filter.length <= 0) {
      this.recibosFilter = this.recibos;
      return SwalAlertCustom.alert('error', 'Sin Coincidencias.');
    }

    this.recibosFilter = filter;
  }
  private idEmpleado() {
    let id!: number;
    this.activatedRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }
}
