import { Carro } from './../../domain/carro';
import { EscolhaPage } from './../escolha/escolha';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public carros: Carro[];

  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {

  }

  ngOnInit(): void {
    let loader = this._loadingCtrl.create({
      content: 'Buscando novos carros. Aguarde...'
    });

    loader.present();

    this._http
      .get('https://aluracar.herokuapp.com/')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carros = carros;
        loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        loader.dismiss();
        this._alertCtrl
          .create({
            title: 'Falha na conexão!',
            buttons: [{text: 'Estou ciente!'}],
            subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
          }).present();
      });
  }

  seleciona(carro) {
    this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });
  }

}
