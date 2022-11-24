namespace Calculator.MathOperator;

public interface IMathOperatorFactory
{
    IMathOperator GetMathOperatorBySign(string sign);
}