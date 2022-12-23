import { Component } from '@angular/core';
import { range } from 'rxjs';
import { evaluate } from 'mathjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  term:string;
  mobile: boolean;

  constructor(private currPlat: Platform) {
    this.term = "";
    if(currPlat.is("mobile")){
      this.mobile = true;
    }
    else{
      this.mobile = false;
    }
  }

  ionViewDidEnter(){
    const buttonsList = document.getElementsByName("ion-button");

    if (this.mobile){
      buttonsList.forEach((button) => {
        button.addEventListener("touchstart", (e) => {
          this.buttonClicked(button.innerText);
        });
      });
    }
    else{
      buttonsList.forEach((button) => {
        button.addEventListener("mousedown", (e) => {
          this.buttonClicked(button.innerText);
        });
      });
      console.log("other");
    }
  }

  buttonClicked(symbol: string){
    let writtenSymbols = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "(", ")"]
    
    switch (symbol){
      case (writtenSymbols.find(x => x == symbol)):
        this.term += symbol;
        this.updateValueCard(this.term);
        break;

      case "C":
        this.term = "";
        this.updateValueCard(this.term);
        break;

      case "=":
        this.calc();
        break;
      
        case "<":
          this.term = this.term.substring(0, this.term.length - 1);
          this.updateValueCard(this.term);
          break;
    }
  }

  updateValueCard(text: string){
    if (text == ""){
      document.getElementById("termCard").innerHTML = "0";
    }
    else{
      document.getElementById("termCard").innerHTML = text;
    }    
  }

  updateSolutionCard(text: string){
    document.getElementById("solutionCard").innerText = text;
  }

  calc(){
    try{
      let result:string = evaluate(this.term);

      if (result.toString() == "NaN"){
        console.log(result);
      }
      else{
        this.updateSolutionCard(result);
        console.log("written");
      }
        
      
    }
    catch(e){
      console.log("errror");
    }
  }   
}


  // buttonClicked(symbol: string){
  //   this.term += symbol;
  //   this.updateValueCard();
  // }

  // plusButtonClicked(){
  //   this.term += "+";
  //   this.updateValueCard();
  // }

  // minusButtonClicked(){
  //   this.term += "-";
  //   this.updateValueCard();
  // }

  // multButtonClicked(){
  //   this.term += "*";
  //   this.updateValueCard();
  // }

  // divideButtonClicked(){
  //   this.term += "/";
  //   this.updateValueCard();
  // }

  // cButtonClicked(){
  //   this.term = "";
  //   this.updateValueCard();
  // }

  // equalsButtonClicked(){
  //   this.calc();
  // }