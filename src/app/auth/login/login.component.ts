import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const Swal = require('sweetalert2');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public show: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        correo: this.loginForm.get('email')?.value,
        contrasena: this.loginForm.get('password')?.value
      };
      this.http.post('https://backend-do1k.onrender.com/api/login', loginData).subscribe(
        (response: any) => {
          // Guardar el token en localStorage
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('rolName', response.rolName);
          localStorage.setItem('correo', response.user.correo); 
          localStorage.setItem('username', response.user.nombre);  
          localStorage.setItem('usuarioid', response.user.id);  // Guardar el ID como string
          console.log(response);  // Verifica la estructura del objeto completo

          if (response.user.estadoid.nombre == "Activo" && response.user.rolid.estadoid.nombre == "Activo") {
            if(response.rolName == 'ADMIN'){
              // Redireccionar según el rol
              this.router.navigate(['dashboard/default']);
            } else if(response.rolName == 'JOVEN'){
              this.router.navigate(['index']).then(success => {
                if (success) {
                  console.log('Redirección exitosa');
                } else {
                  console.error('Error en la redirección');
                }
              });
            } else if(localStorage.getItem('rolName') == 'EMPLEADO'){
              this.router.navigate(['asistencia']);
            }
          } else if(response.user.estadoid.nombre == "Inactivo" || response.user.rolid.estadoid.nombre == "Inactivo"){
            Swal.fire({
              icon: "error",
              title: "Lo sentimos, estás Inactivo. Comunícate con el administrador del sistema.",
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            showConfirmButton: false,
            timer: 1500
          });
          console.error('Error en el inicio de sesión: ', loginData);
        }
      );
    }
  }
}
