import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  public categorias: { mostrar: string, name: string }[];
  public noticias: Article[];

  constructor( private noticiasService: NoticiasService ) {
    this.categorias = [
      { mostrar: 'general', name: 'general' },
      { mostrar: 'negocios', name: 'business' },
      { mostrar: 'entretenimiento', name: 'entertainment' },
      { mostrar: 'salud', name: 'health' },
      { mostrar: 'ciencia', name: 'science' },
      { mostrar: 'deportes', name: 'sports' },
      { mostrar: 'tecnología', name: 'technology' }
    ];
    this.noticias = [];
  }

  ngOnInit() {
    this.segment.value = this.categorias[0].name;

    this.cargarNoticias( this.segment.value );
  }

  cambioCategoria( evento: any ) {
    this.noticias = [];
    this.cargarNoticias( evento.detail.value );
  }

  cargarNoticias( categoria: string, evento?: any ) {
    this.noticiasService.getTopHeadlinesCategory( categoria )
                        .subscribe( resp => {
                          this.noticias.push( ...resp.articles );
                          if ( evento ) {
                            evento.target.complete();
                          }
                        });
  }

  loadData( evento: any ) {

    this.cargarNoticias( this.segment.value );
  }
}
