using Inveon.Services.EmailAPI.Messaging;
using Inveon.Services.EmailAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IEmailRepository, EmailRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddHttpClient<IProductRepository, ProductRepository>(u => u.BaseAddress =
  new Uri(builder.Configuration["ServiceUrls:ProductAPI"]));

builder.Services.AddRazorTemplating();

builder.Services.AddHostedService<RabbitMQEmailConsumer>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
