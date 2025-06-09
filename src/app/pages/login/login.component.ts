import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  sifre: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  girisYap() {
    this.authService
      .login(this.email, this.sifre)
      .then(() => {
        // Başarılı giriş sonrası yönlendirme
        this.router.navigate(['/gorevler']);
      })
      .catch((error) => {
        // Hatalı giriş
        console.error('Giriş Hatası:', error);
        alert('E-posta veya şifre yanlış.');
      });
  }
}
