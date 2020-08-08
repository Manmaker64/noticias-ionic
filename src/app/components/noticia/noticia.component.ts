import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() ordenNoticia: number;
  // El valor viene desde el componente padre (false)
  @Input() enFavoritos: boolean;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private datalocalService: DataLocalService,
    private platform: Platform
  ) {
    this.noticia = null;
    this.ordenNoticia = 0;
  }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create( this.noticia.url, '_system' );
  }

  async lanzarMenu() {
    let guardarBorrarBtn: any;

    if (this.enFavoritos ) {
      // borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.borrarNoticia( this.noticia );
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.guardarNoticia( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        guardarBorrarBtn,
      {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.compartirNoticia();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancelar');
        }
      }]
    });

    await actionSheet.present();
  }

  compartirNoticia() {
    if ( this.platform.is('cordova') ) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      const navegador = (window.navigator as any);
      if ( navegador && navegador.share ) {
        navegador.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url
        })
          .then( () => console.log( 'Noticia compartida' ) )
          .catch( (error: any) => console.log( 'Error al Compartir', error ) );
      } else {
        alert( 'Share no soportado por el Navegador' );
      }
    }
  }
}
