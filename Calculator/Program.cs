using Calculator.MathOperator;
using Calculator.MathOperator.Default;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IMathOperator, AddMathOperator>();
builder.Services.AddTransient<IMathOperator, SubstractMathOperator>();
builder.Services.AddTransient<IMathOperator, MultiplyMathOperator>();
builder.Services.AddTransient<IMathOperator, DivisionMathOperator>();
builder.Services.AddSingleton<Func<IEnumerable<IMathOperator>>>(x => () => x.GetService<IEnumerable<IMathOperator>>()!);
builder.Services.AddSingleton<IMathOperatorFactory, MathOperatorFactory>();

builder.Services.AddControllersWithViews();

builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
