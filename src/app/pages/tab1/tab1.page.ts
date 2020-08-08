import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public noticias: Article[];

  constructor( private noticiasService: NoticiasService ) {
    this.noticias = [];
  }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( evento: any ) {
    this.cargarNoticias( evento );
  }

  cargarNoticias( evento?: any ) {
    this.noticiasService.getTopHeadLines()
                        .subscribe( resp => {
                          if (resp.articles.length === 0 && evento) {
                            evento.target.disabled = true;
                            evento.target.complete();
                            return;
                          }
                          this.noticias.push( ...resp.articles );
                        });
  }
}
