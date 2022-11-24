import { Component, OnInit } from '@angular/core';
import { Operator } from '../operator';
import { CalculationService } from '../services/calculation.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  inputDisplay = "";

  value1: string | null = null;
  value2: string | null = null;
  operator: Operator | null = null;

  result: string | null = null;

  constructor(private calculationService: CalculationService) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.inputDisplay = "";
    this.value1 = null;
    this.value2 = null;
    this.operator = null;
  }

  execOperator(operator: Operator): void {

    if (this.operator) {
      //already have operator so evaluate current values and use input operator for next chain operation
      this.evaluate(operator);
    }
    else if (this.value1 === null) {
      this.value1 = this.inputDisplay;
      this.inputDisplay = "";
    }

    this.operator = operator;
  }

  insertChar(character: string): void {
    if (character === "." && this.inputDisplay.includes(character))//don't allow multiple decimal point
      return;

    this.inputDisplay += character;
  }

  evaluate(nextOperator: Operator | null): void {

    if (this.inputDisplay === "") //missing input or changing sign only
      return;

    if (this.operator === '/' && this.inputDisplay === "0") //block divide by zero but could use better handling
    {
      this.inputDisplay = "";
      return;
    }

    this.value2 = this.inputDisplay;

    this.calculationService
      .calculate(Number(this.value1), Number(this.value2), this.operator!)
      .subscribe((result) => {
        this.reset();
        this.value1 = result.toString();
        this.operator = nextOperator;
      });
  }

}
