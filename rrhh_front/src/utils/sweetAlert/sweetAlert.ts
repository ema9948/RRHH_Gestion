import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export class SwalAlertCustom {
  private static toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  public static alert(ico: any, message: string) {
    this.toast.fire({
      icon: ico,
      title: message,
    });
  }
}

export class SwalAlertDeleteMessage {
  public static message() {
    return;
  }
}
