import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculationService } from '../services/calculation.service';
import { of } from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculationServiceSpy: jasmine.SpyObj<CalculationService>;;

  beforeEach(async () => {
    calculationServiceSpy = jasmine.createSpyObj("CalculationService", ["calculate"]);;

    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      providers: [
        { provide: CalculationService, useValue: calculationServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert charactors', () => {
    component.inputDisplay = "20";

    component.insertChar("3");

    expect(component.inputDisplay).toBe("203");
  });

  it('should reset', () => {
    component.inputDisplay = "20";
    component.operator = '+';
    component.value1 = "3";
    component.value2 = "4";

    component.reset();

    expect(component.inputDisplay).toBe("");
    expect(component.operator).toBeNull();
    expect(component.value1).toBeNull();
    expect(component.value2).toBeNull();
  });

  it('should calculate', () => {
    component.inputDisplay = "3";
    component.operator = '+';
    component.value1 = "2";
    calculationServiceSpy.calculate.and.returnValue(of(5));

    component.evaluate(null);

    expect(component.value1).toBe("5");
  });

  it('should chain calculate', () => {
    component.inputDisplay = "3";
    component.operator = '+';
    component.value1 = "2";
    calculationServiceSpy.calculate.and.returnValue(of(5));

    component.execOperator('-');
    expect(component.value1).toBe("5");

    component.inputDisplay = "1";
    calculationServiceSpy.calculate.and.returnValue(of(4));
    component.execOperator('*');
    expect(component.value1).toBe("4");
    expect(component.operator).toBe('*');
  });


});
