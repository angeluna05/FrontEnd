import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public show: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router
  ) { 
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.http.post('https://backend-do1k.onrender.com/api/login', loginData).subscribe(
        (response: any) => {
          // Guardar el token en localStorage
          localStorage.setItem('authToken', response.token);

          // Redireccionar según el rol
          switch (response.rolName) {
            case 'ADMIN':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'EMPLEADO':
              this.router.navigate(['/employee-dashboard']);
              break;
            case 'JOVEN':
              this.router.navigate(['/youth-dashboard']);
              break;
            default:
              console.error('Rol no reconocido');
              // Puedes redirigir a una página de error o mostrar un mensaje.
              this.router.navigate(['/login']);
              break;
          }
        },
        (error) => {
          console.error('Error en el inicio de sesión', error);
          // Mostrar mensaje de error si es necesario
        }
      );
    }
  }
}
