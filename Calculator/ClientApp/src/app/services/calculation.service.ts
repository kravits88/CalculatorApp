import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operator } from '../operator';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private readonly endPoint = "/api/calculation";


  constructor(private httpClient: HttpClient) { }

  calculate(value1: number, value2: number, operator: Operator): Observable<number> {
    return this.httpClient.get<number>(`${this.endPoint}?value1=${value1}&value2=${value2}&operatorSign=${encodeURIComponent(operator)}`);
  }
}
