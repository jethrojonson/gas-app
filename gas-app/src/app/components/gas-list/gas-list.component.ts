import { Component, OnInit } from '@angular/core';
import { GasStation } from 'src/app/interfaces/gas-station.interface';
import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit {

  gasStList : GasStation[] = [];

  constructor(private gasService : GasService) { }

  ngOnInit(): void {
    this.getGasStList();
  }

  public getGasStList(){
    this.gasService.getGasStList().subscribe(resp => {
      this.gasStList = resp['ListaEESSPrecio']
    })
  }

}
