import { Component, Input, OnInit } from '@angular/core';
import { GasStation } from 'src/app/interfaces/gas-station.interface';

@Component({
  selector: '[app-gas-item]',
  templateUrl: './gas-item.component.html',
  styleUrls: ['./gas-item.component.css']
})
export class GasItemComponent implements OnInit {

  @Input() gasSt :GasStation = {} as GasStation;

  constructor() { }

  ngOnInit(): void {
  }

}
