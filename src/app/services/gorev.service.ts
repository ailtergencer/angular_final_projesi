import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Gorev } from '../models/gorev.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GorevService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Kullanıcıya özel görev ekleme
  gorevEkle(gorev: Gorev) {
    return this.afAuth.currentUser.then((user) => {
      if (!user) {
        console.error('Kullanıcı oturumda değil');
        return;
      }

      const gorevData = {
        ...gorev,
        userId: user.uid, // Görevi oluşturan kullanıcı ID'si
      };

      return this.firestore.collection('gorevler').add(gorevData);
    });
  }

  // Sadece o kullanıcıya ait görevleri çek
  gorevleriGetir(): Observable<Gorev[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        return this.firestore
          .collection<Gorev>('gorevler', (ref) =>
            ref.where('userId', '==', user.uid)
          )
          .snapshotChanges()
          .pipe(
            map((actions) =>
              actions.map((a) => {
                const data = a.payload.doc.data() as Gorev;
                const id = a.payload.doc.id;
                return { id, ...data };
              })
            )
          );
      })
    );
  }

  // Görev silme
  gorevSil(id: string) {
    return this.firestore.collection('gorevler').doc(id).delete();
  }

  // Görev güncelleme
  gorevGuncelle(id: string, data: Partial<Gorev>) {
    return this.firestore.collection('gorevler').doc(id).update(data);
  }
}
