import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
const Swal = require('sweetalert2');

interface Estado {
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  correo: string;
  telefono: string;
  contrasena: string;
  estadoid: Estado;
  rolid: Rol;
}

interface Rol {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  private apiUrl1 = 'https://backend-do1k.onrender.com'; // Asegúrate de usar la URL correcta
  private apiUrl = 'https://backend-do1k.onrender.com/api'; // Asegúrate de usar la URL correcta

  public correo: string = '';
  public code: string = '';
  public newPassword: string = '';
  public confirmPassword: string = '';
  public show: boolean = false;
  public userId: number | null = null;
  public step: number = 1;

  public otpPart1: string = '';
  public otpPart2: string = '';
  public otpPart3: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  fetchUserIdByCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl1}/usuarios/find-by-correo?correo=${correo}`);
  }

  onSendRecoveryCode() {
    this.fetchUserIdByCorreo(this.correo).subscribe(user => {
      this.userId = user.id;
      this.sendRecoveryCode(this.correo).subscribe(response => {
        Swal.fire({
          icon: "success",
          title: "Código enviado exitosamente",
          text: "Revisa tu bandeja de entrada",
          showConfirmButton: false,
          timer: 1500
        });
        this.step = 2;
      }, error => {
        console.error('Error al enviar el código de recuperación:', error);
        Swal.fire({
          icon: "error",
          title: "No se pudo enviar el código",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }, error => {
      console.error('Error al obtener el usuario:', error);
    });
  }

  onVerifyCode() {
    if (!this.userId) {
      console.error('Usuario no encontrado');
      return;
    }

    this.code = this.otpPart1 + this.otpPart2 + this.otpPart3;

    this.verifyCode(this.userId, this.code).subscribe(response => {
      Swal.fire({
        icon: "success",
        title: "Código correcto",
        showConfirmButton: false,
        timer: 1500
      });
      this.step = 3;
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Código incorrecto",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  onResetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (!this.userId) {
      console.error('Usuario no encontrado');
      return;
    }

    this.resetPassword(this.userId, this.newPassword).subscribe(response => {
      Swal.fire({
        icon: "success",
        title: "Contraseña restablecida exitosamente",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/auth/login']); // Redirige al login

    }, error => {
      Swal.fire({
        icon: "Error",
        title: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 1500
      });    });
  }

  sendRecoveryCode(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-recovery/send-code`, { correo });
  }

  verifyCode(userId: number, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-recovery/verify-code`, { userId, code });
  }

  resetPassword(userId: number, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-recovery/reset-password`, { userId, newPassword });
  }

  onInput(event: Event, part: string) {
    const target = event.target as HTMLInputElement;
    if (target.value.length === 2) {
      this.focusNextInput(part);
    }
  }

  focusNextInput(currentPart: string) {
    if (currentPart === 'otpPart1') {
      const nextInput = document.querySelector('input[name="otpPart2"]') as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else if (currentPart === 'otpPart2') {
      const nextInput = document.querySelector('input[name="otpPart3"]') as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    const pasteData = event.clipboardData?.getData('text');
    if (pasteData && pasteData.length === 6) {
      this.otpPart1 = pasteData.slice(0, 2);
      this.otpPart2 = pasteData.slice(2, 4);
      this.otpPart3 = pasteData.slice(4, 6);
      event.preventDefault();
      const nextInput = document.querySelector('input[name="otpPart3"]') as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }
}
