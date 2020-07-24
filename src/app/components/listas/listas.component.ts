import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista-model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList) childLista: IonList;

  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
    if (this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
   }

   borraroLista(lista: Lista){
     this.deseosService.borrarLista(lista);
   }

   async editarTitulo(lista: Lista){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar titulo',
      inputs: [{
        name: 'titulo',
        value: lista.titulo,
        type: 'text',
      }],
      buttons: [
        {
          text: 'Editar',
          handler: (data) => {
            lista.titulo = data.titulo;

            this.deseosService.guardarStorage();
            this.childLista.closeSlidingItems();
          }
        },
        {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.childLista.closeSlidingItems();
        }
        }
      ]
    });

    alert.present();
   }

}
