import { TypeofExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { preventOverflow } from '@popperjs/core';
import { GasStation } from 'src/app/interfaces/gas-station.interface';
import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css'],
})
export class GasListComponent implements OnInit {
  gasStList: GasStation[] = [];
  gasStListFuelFiltered: GasStation[] = [];

  isFuelFiltered: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;
  minPriceSelected: number = 0;
  maxPriceSelected: number = 0;

  fuelType: GasStation = {} as GasStation;
  fuelTypeSelected: keyof typeof this.fuelType = 'C.P.';

  constructor(private gasService: GasService) {}

  ngOnInit(): void {
    this.getGasStList();
  }

  public getGasStList() {
    this.gasService.getGasStList().subscribe((resp) => {
      this.gasStList = resp['ListaEESSPrecio'].slice(0, 400);
    });
  }

  public getMinMaxPrice(fuelType: keyof typeof this.fuelType) {
    let min = 100;
    let max = 0;
    let current = 0;

    this.gasStList.forEach((gasSt) => {
      if (+gasSt[fuelType].replace(',', '.') != 0) {
        current = +gasSt[fuelType].replace(',', '.');
        min < current ? min : (min = current);
        max > current ? max : (max = current);
      }
    });
    this.maxPrice = max;
    this.maxPriceSelected = max;
    this.minPrice = min;
    this.minPriceSelected = min;
    this.fuelTypeSelected = fuelType;
    this.isFuelFiltered = true;
    this.getFuelFilteredList();
    this.sortList(this.gasStListFuelFiltered);
  }

  public getFuelFilteredList() {
    this.gasStListFuelFiltered = this.gasStList.filter((gasolinera) =>
      +(gasolinera[this.fuelTypeSelected].replace(',', '.')) >
        this.minPriceSelected &&
        +(gasolinera[this.fuelTypeSelected].replace(',', '.')) <
          this.maxPriceSelected
    );
  }

  public sortList(lista : GasStation[]){
    lista.sort((a,b) => +a[this.fuelTypeSelected].replace(',', '.') - +b[this.fuelTypeSelected].replace(',', '.'))
  }
}
