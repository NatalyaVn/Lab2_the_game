function change() 
{
  if (this.style.backgroundColor == 'blue')
    this.style.backgroundColor = 'white';
  else
    this.style.backgroundColor = 'blue';
}

var obj = document.getElementById('m');
for (var i = 0; i < obj.children.length; i++) 
{ 
  obj.children[i].addEventListener('click', change);
}

var n = 7, m = 7 , k = 0;
var mas = [];
for (var i = 0; i < m; i++)
{
  mas[i] = [];
  for (var j = 0; j < n; j++)
  {
      mas[i][j] = obj.children[k++];
      mas[i][j].style.backgroundColor = 'white';
  }
}

function start()
{ 
  k = 0;
  var mas_color = [];
  for (var i = 0; i < m; i++)
    for (var j = 0; j < n; j++)
        mas_color[k++] = mas[i][j].style.backgroundColor;
  
  var sum = 0; k = 0;
  for (i = 0; i < m; i++)
  {
    for (j = 0; j < n; j++)
    {
      for(var a = i-1; a <= i+1; a++)
          for(var b = j-1; b <= j+1; b++)
          {
            if(a>=0 && b>=0 && a<=4 && b<=4)
              if(!(a==i && b==j))
              {
                if (mas[a][b].style.backgroundColor == 'blue') 
                  sum++;
              }
          }
      if(mas[i][j].style.backgroundColor == 'blue')
      {
        if(!(sum == 2 || sum == 3))
          mas_color[k] = 'white';
      }
      else
        if(sum==3)
          mas_color[k] =  'blue';
      k++;
      sum = 0;
    }
  }
  
  k = 0;
  for (var i = 0; i < m; i++)
    for (var j = 0; j < n; j++)
      mas[i][j].style.backgroundColor = mas_color[k++];
}

var timer = 0;
function start_int()
{
  for (var i = 0; i < m; i++)
    for (var j = 0; j < n; j++){
      mas[i][j].removeEventListener('click', change);
      mas[i][j].addEventListener('mouseover', changeColorAfterTimeout);
      mas[i][j].addEventListener('mouseout', resetColorTimeout);
    }
  timer = setInterval(start, 2500);
  setTimeout(function() {
    clearInterval(timer);
  }, 60000);
}

var timerChangeColor = 0;
function changeColorAfterTimeout(){
  var el = this;
  timerChangeColor = setTimeout(function(){
    el.style.backgroundColor='white';
  }, 2000);
}

function resetColorTimeout(){
  clearTimeout(timerChangeColor);
}

function end()
{
  clearInterval(timer);
    for (var i = 0; i < m; i++)
    for (var j = 0; j < n; j++){
      mas[i][j].addEventListener('click', change);
      mas[i][j].removeEventListener('mouseover', changeColorAfterTimeout);
      mas[i][j].removeEventListener('mouseout', resetColorTimeout);
    }
  
  for (var i = 0; i < m; i++)
    for (var j = 0; j < n; j++)
      mas[i][j].style.backgroundColor = 'white';
}

var button1 = document.getElementById("start");
button1.onclick = start_int;
var button2 = document.getElementById("restart");
button2.onclick = end;
