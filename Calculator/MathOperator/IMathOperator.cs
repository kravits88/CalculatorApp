namespace Calculator.MathOperator;

public interface IMathOperator
{
    string Sign { get; }

    decimal Calculate(decimal x, decimal y);
}