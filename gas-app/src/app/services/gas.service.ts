import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GasResponse } from '../interfaces/gas-station.interface';

@Injectable({
  providedIn: 'root'
})
export class GasService {

  constructor(private http : HttpClient) { }

  public getGasStList() : Observable<GasResponse>{
    return this.http.get<GasResponse>(environment.apiBaseUrl)
  }
}
