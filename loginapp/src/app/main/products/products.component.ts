import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';
import { Bitcoin } from '../bitcoin';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  bitcoins$: Observable<Bitcoin[]>;
  user: any;

  constructor(
    private mainService: MainService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getBitcoins();

  }

  public getBitcoins() {
    this.bitcoins$ = this.mainService.getBitcoin();

  }



  public buyBitcoin(event: Event, price: String, product: any) {
    this.user = JSON.parse(localStorage.getItem('user_data'));
    console.log("DADOS DO USUARIO", this.user);
    console.log("price: ", price);
    console.log("id: ", product._id);
    const idSoldBitcoin = product._id;
    const balanceFormated = parseInt(this.user.balance, 10);
    const priceFormated = price.split('.');
    console.log("PRICEFORMATED: ", priceFormated);
    const newPrice = parseInt(priceFormated[0], 10);

    if (balanceFormated >= newPrice) {
      let balanceUpdated = balanceFormated - newPrice;
      this.user.balance = balanceUpdated.toString();
      console.log("balancedUpdated", this.user);

      this.soldBitcoin(product);
      this.registerShopping(product, this.user._id);
      this.updateUser(this.user);
    } else {
      this.snackBar.open("Saldo insuficiente", "OK", { duration: 2000 });

    }
  }

  public updateUser(user: any) {
    this.mainService.updateUser(this.user)
        .subscribe(
          response => {
            //console.log("RESPONSE: ", response);
            localStorage.setItem('user_data', JSON.stringify(response));
            //console.log("CURRENTLY USER: ", this.user);
          },
          error => {
            // alert("E-mail já cadastrado!");
            console.log("ERRO: ", error);
          }

        );
  }

  public registerShopping(product: any, id: any) {

    product.id_user = id;

    this.mainService.registerShopping(product)
        .subscribe(
          response => {
            console.log("RESPONSE: " ,response);

          },
          error => {
            // alert("E-mail já cadastrado!");
            console.log("ERRO: ", error);
          }

        );
  }

  public soldBitcoin(product: any) {
    this.mainService.soldBitcoin(product)
        .subscribe(
          response => {
            console.log("RESPONSE: " ,response);
            this.snackBar.open("Compra realizada com sucesso.", "OK", { duration: 2000 });
            this.getBitcoins();
          },
          error => {
            // alert("E-mail já cadastrado!");
            console.log("ERRO: ", error);
          }

        );
  }

}
