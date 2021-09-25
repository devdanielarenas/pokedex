import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  message(title, icon, text?, timer = 2000): any {
    Swal.fire({
      position: 'center',
      icon,
      title,
      text,
      showConfirmButton: false,
      timer
    });
  }

  messageAction(title, icon, text?): any {
    return Swal.fire({
      icon,
      title,
      text,
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`
    })
      .then((data) => {
        return data.isConfirmed ? true : false;
      });
  }

}
