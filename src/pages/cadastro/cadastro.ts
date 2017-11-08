import { Agendamento } from './../../domain/agendamemto';
import { HomePage } from './../home/home';
import { Http } from '@angular/http';
import { Carro } from './../../domain/carro';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public agendamento: Agendamento;
  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController) {

    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');
    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage) }]
    });
  }

  agenda() {
    this._http
      .get(`https://aluracar.herokuapp.com/salvarpedido?carro=${this.agendamento.carro.nome}&nome=${this.agendamento.nome}&preco=${this.agendamento.valor}&endereco=${this.agendamento.endereco}&email=${this.agendamento.email}&dataAgendamento=${this.agendamento.data}`)
      .toPromise()
      .then(() => {
        this._alerta.setSubTitle('Agendamento realizado com sucesso!');
        this._alerta.present();
      })
      .catch(erro => {
        console.log(erro);
        this._alerta.setSubTitle('Não foi possível realizar o agendamento. Tente mais tarde');
        this._alerta.present();
      });
  }

}
