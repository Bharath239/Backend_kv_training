interface CalculatorInterface {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    power(a: number, b: number): number;
  }
  
export default class calculator implements CalculatorInterface{
      add(a: number,b: number): number{
          return a+b;
      }
      subtract(a: number, b: number): number {
          return a-b;
      }
      multiply(a: number, b: number): number {
          return a*b;
      }
      divide(a: number, b: number): number {
          if(b==0){
              throw new Error("Division by zero is not possible");
          }
          return a/b;
      }
      power(a: number, b: number): number {
          return a**b;
      }
  }
  