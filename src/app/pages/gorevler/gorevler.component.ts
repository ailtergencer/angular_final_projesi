import { Component, OnInit } from '@angular/core';
import { GorevService } from 'src/app/services/gorev.service';
import { Gorev } from 'src/app/models/gorev.model';

@Component({
  selector: 'app-gorevler',
  templateUrl: './gorevler.component.html',
  styleUrls: ['./gorevler.component.css'],
})
export class GorevlerComponent implements OnInit {
  yeniGorev: Partial<Gorev> = {
    ad: '',
    tamamlandi: false,
    kategori: '',
  };

  gorevListesi: Gorev[] = [];
  kategoriler: string[] = ['iş', 'okul', 'kişisel'];
  secilenKategori: string = '';

  constructor(private gorevService: GorevService) {}

  ngOnInit(): void {
    this.gorevService.gorevleriGetir().subscribe((gorevler) => {
      this.gorevListesi = gorevler;
    });
  }

  get filtrelenmisGorevler(): Gorev[] {
    if (!this.secilenKategori) return this.gorevListesi;
    return this.gorevListesi.filter(
      (gorev) => gorev.kategori === this.secilenKategori
    );
  }

  gorevEkle() {
    if (!this.yeniGorev.ad?.trim() || !this.yeniGorev.kategori) return;

    const yeni: Gorev = {
      ad: this.yeniGorev.ad,
      tamamlandi: false,
      kategori: this.yeniGorev.kategori,
    };

    this.gorevService.gorevEkle(yeni).then(() => {
      this.yeniGorev = { ad: '', kategori: '', tamamlandi: false };
    });
  }

  gorevSil(id: string | undefined) {
    if (!id) return;
    this.gorevService.gorevSil(id);
  }

  gorevDurumDegistir(gorev: Gorev) {
    if (!gorev.id) return;
    this.gorevService.gorevGuncelle(gorev.id, {
      tamamlandi: !gorev.tamamlandi,
    });
  }
}
