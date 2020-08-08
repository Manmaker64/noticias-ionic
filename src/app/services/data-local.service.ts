import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  protected noticias: Article[];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.noticias = [];
    this.cargarFavoritos();
  }

  async presentToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia( noticia: Article ) {
    // Comprueba que la noticia no ha sido guardada antes en favoritos
    const existe = this.noticias.find( noti => noti.title === noticia.title );
    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set( 'favoritos', this.noticias );
    }
    this.presentToast( 'Agregado a Favoritos' );
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get( 'favoritos' );
    if ( favoritos ) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set( 'favoritos', this.noticias );
    this.presentToast( 'Borrado de Favoritos' );
  }

  getNoticias() {
    return this.noticias;
  }
}
