import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Article[];
  @Input() enFavoritos: boolean;

  constructor() {
    this.noticias = [];
    this.enFavoritos = false;
  }

  ngOnInit() {}
}
