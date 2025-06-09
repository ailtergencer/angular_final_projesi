import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  kayitOl(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        alert('Kayıt başarılı!');
        console.log(user);
      })
      .catch((error) => {
        alert('Hata: ' + error.message);
      });
  }
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  cikisYap() {
    return this.afAuth.signOut();
  }
}
