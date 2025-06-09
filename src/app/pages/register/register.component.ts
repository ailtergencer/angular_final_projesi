import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  sifre: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  kayitOl() {
    this.authService
      .register(this.email, this.sifre)
      .then(() => {
        alert('Kayıt başarılı!');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Kayıt Hatası:', error);
        alert('Kayıt başarısız: ' + error.message);
      });
  }
}
