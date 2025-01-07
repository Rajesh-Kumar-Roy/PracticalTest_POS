import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator-modal.component.html',
  styleUrl: './calculator-modal.component.css'
})
export class CalculatorModalComponent {
  display: string = '';

  ngOnInit(): void {
    this.display = '';
  }

  // Method to handle button input from the calculator buttons
  input(value: string): void {
    this.display += value;
  }

  // Method to clear the display
  clear(): void {
    this.display = '';
  }

  // Method to calculate the result
  calculate(): void {
    try {
      // Evaluate the expression and round the result to 2 decimal places
      this.display =  String(this.evaluateExpression(this.display));
    } catch (error) {
      this.display = 'Error';
    }
  }

  // Custom method to evaluate the arithmetic expression safely
  evaluateExpression(expr: string): number {
    // Regular expression to match valid arithmetic expressions (only numbers and +, -, *, /, . operators)
    const sanitizedExpr = expr.replace(/[^-()\d/*+.]/g, '');
    // Create a Function that returns the result of the expression
    return new Function(`return ${sanitizedExpr}`)();
  }

  // Handle  keys in the window
  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent): void {
    const key = event.key;

    // Handle special cases: "Enter" for calculation and "Backspace" for deleting the last character
    if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Backspace') {
      this.display = this.display.slice(0, -1);  // Removes the last character
    } else if (key.length === 1) {
      // For all other keys that are a single character, append them to the display
      this.input(key);
    }

    // Prevent default behavior for "Enter" and "Backspace"
    // if (key === 'Enter' || key === 'Backspace') {
    //   event.preventDefault();
    // }
  }
}
