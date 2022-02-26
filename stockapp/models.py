from django.db import models
from django.db.models import Case, F, Value, When
from django.contrib.auth.models import User


class Stock(models.Model):
    money_to_invest = models.CharField(max_length=100)
    stock_price = models.CharField(max_length=100)
    company = models.CharField(max_length=50)
    profit_or_loss = models.CharField(max_length=20)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.author.username} | Stock Price {self.stock_price} | Company {self.company} | {self.profit_or_loss}'
