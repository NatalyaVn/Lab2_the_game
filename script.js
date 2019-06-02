var N = 7, M = N-1;//N*N - размерность массива
var timer = 0;//таймер игры
var timerChangeColor = 0;//таймер для наведения мышки на клетку
var obj = document.getElementById('m');
var k = 0;//счетчик
var mas = [];
for (var i = 0; i < N; i++)//создание двумерного массива
{
  mas[i] = [];
  for (var j = 0; j < N; j++)
  {
    obj.children[k].addEventListener('click', change);//на каждый div-объект навешиваем событие click    
    mas[i][j] = obj.children[k++];//заносим объекты в двумерный массив
    mas[i][j].setAttribute('data-old-color', 'white');
  }
}

function change(){ //ф-я расстановки цвета
  if (this.style.backgroundColor == 'blue'){//при щелчке по клетке меняем цвет на другой
    this.style.backgroundColor = 'white';
    this.setAttribute('data-old-color', 'white');
  }
  else{
    this.style.backgroundColor = 'blue';
    this.setAttribute('data-old-color', 'blue');
  }
}

var button1 = document.getElementById("start");//нажатие на кнопку "Начать игру"
button1.onclick = start;
var button2 = document.getElementById("restart");//нажатие на кнопку "Начать с начала"
button2.onclick = end;

function start(){//нажатие на кнопку "Начать игру"
  for (var i = 0; i < N; i++)//на каждый div 
    for (var j = 0; j < N; j++){
      mas[i][j].removeEventListener('click', change);//убираем событие click
      mas[i][j].addEventListener('mouseover', changeColorMouseOver);//вешаем события наведения
      mas[i][j].addEventListener('mouseout', resetColorTimeout);
    }
  timer = setInterval(iteration, 3000);//каждые 3с выполняется функция iteration
}

function iteration(){//одна итерация
  var sum = 0;//сумма живых клеток вокруг
  for (i = 0; i < N; i++)//для кажд клетки
  {
    for (j = 0; j < N; j++)
    {
      for(var a = i-1; a <= i+1; a++)//у каждой клетки просмотриваем все клетки вокруг
          for(var b = j-1; b <= j+1; b++)
            if(a>=0 && b>=0 && a<=M && b<=M){//проверка на выход за границы поля
                if(a < i || a == i && b < j){//если это клетка ДО текущей
                  if (mas[a][b].getAttribute('data-old-color') == 'blue')//смотрим предыдущее состояние клетки
                    sum++;
                }
                else if (a > i || a == i && b > j)//если это клетка ПОСЛЕ текущей
                {
                  if (mas[a][b].style.backgroundColor == 'blue')//смотрим нынешнее состояние клетки
                    sum++;
                }
            }
      mas[i][j].setAttribute('data-old-color', mas[i][j].style.backgroundColor);//устанавливаем текущий цвет в old-color
      if(mas[i][j].getAttribute('data-old-color') == 'blue')//проверка условий выживания
      {
        if(!(sum == 2 || sum == 3))
          mas[i][j].style.backgroundColor = 'white';
      }
      else
        if(sum==3)
          mas[i][j].style.backgroundColor = 'blue';
      sum = 0;//обнуляем сумму
    }
  }
}

function end(){//нажатие на кнопку "Начать с начала"
  clearInterval(timer);//останавливаем таймер игры
    for (var i = 0; i < N; i++)
      for (var j = 0; j < N; j++){
        mas[i][j].addEventListener('click', change);//вешаем событие click
        mas[i][j].removeEventListener('mouseover', changeColorMouseOver);//убираем события наведения
        mas[i][j].removeEventListener('mouseout', resetColorTimeout);
        mas[i][j].style.backgroundColor = 'white';//обесцвечиваем все клетки
        mas[i][j].setAttribute('data-old-color', 'white');
      }
}

function changeColorMouseOver(){//при событии наведения
  var el = this;
  timerChangeColor = setTimeout(function(){//устанавливаем счетчик на 2с
    el.style.backgroundColor='white';//при истечении 2с клетка становится белой/мертвой
    el.setAttribute('data-old-color', 'white');
  }, 2000);
}

function resetColorTimeout(){//при событии снятия 
  clearTimeout(timerChangeColor);//обнуляем счетчик
}