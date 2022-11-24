namespace Calculator.MathOperator;

public class MathOperatorFactory : IMathOperatorFactory
{
    private readonly Func<IEnumerable<IMathOperator>> _factory;

    public MathOperatorFactory(Func<IEnumerable<IMathOperator>> factory)
    {
        _factory = factory;
    }

    public IMathOperator GetMathOperatorBySign(string sign)
    {
        return _factory().First(x => x.Sign == sign);
    }
}