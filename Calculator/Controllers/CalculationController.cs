using Calculator.MathOperator;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationController : ControllerBase
    {
        private readonly IMathOperatorFactory _mathOperatorFactory;

        public CalculationController(IMathOperatorFactory mathOperatorFactory)
        {
            _mathOperatorFactory = mathOperatorFactory;
        }

        [HttpGet]
        public decimal Get(decimal value1, decimal value2, string operatorSign)
        {
            return _mathOperatorFactory.GetMathOperatorBySign(operatorSign).Calculate(value1, value2);
        }

    }
}
