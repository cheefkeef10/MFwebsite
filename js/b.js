
var mstatus=true; 

//mstatus - определяет раскрывается(true) или закрывается(false) меню  


var timer1=false; 
// сюда будет записываться задержка закрытия

var mstep=3;
// кол-во пикселей на которые будет передвигаться меню за 1 итерацию

var cm=null;
// сюда будет запоминаться последний активный слой



var hide_delay=500;
// задержка перед тем как активный слой станет невидимым

var tstat=0;
// имеются ли видимые слои (0 - нет, 1 - да)

var ser="WEB1 0.67";

// Определяем браузер пользователя

isNS4 = (document.layers) ? true : false;
isIE4 = (document.all && !document.getElementById) ? true : false;
isIE5 = (document.all && document.getElementById) ? true : false;
isNS6 = (!document.all && document.getElementById) ? true : false;


// Функция отображающая и скрывающая слои

// Вход:
// objElement - идентификатор(id) слоя;
// bolVisible - булева переменная:
// true  - отобразить слой;
// false - скрыть слой.

// Выход:
// 1


// P.S: В зависимости от типа браузера
// сценарий для манипуляции с видимостью слоёв
// несколько различается.

function switchDiv(objElement,bolVisible){
if(isNS4||isIE4){
     if(!bolVisible) {
       objElement.visibility ="hidden"
     } else {
       objElement.visibility ="visible"
     }     
 } else if (isIE5 || isNS6) {
      if(!bolVisible){
         objElement.style.display = "none";
         
      } else {
        objElement.style.display = "";
        
        }

      }

return 1;
}



// Функция возвращающая значение указанного ей 
// свойства объекта (не обязательно слоя).

// Вход:
// el    - идентификатор элемента;
// sProp - свойство (left,top...)

// Выход:
// Значение какого-нибудь свойства объекта.



function getPos(el,sProp) {
	var iPos = 0;
	while (el!=null) {
		iPos+=el["offset" + sProp]
		el = el.offsetParent
	}
	return iPos

}



// Функция выдаёт объект с указанным
// ей названием.

// Вход:
// myid - название объекта

// Выход: объект.

function getelementbyid(myid) {
   if (isNS4){
        objElement = document.layers[myid];
     }else if (isIE4) {
        objElement = document.all[myid];
     }else if (isIE5 || isNS6) {
             objElement = document.getElementById(myid);
     }
return(objElement);
}



// Функция отображающая|скрывающая
// слои.

// Данная Функция не меняет координаты слоёв,
// не делает их прозрачными, а вызывает функцию movefx,
// которая этим занимается. 


// Вход:
// el - яйчейка таблицы на которой 
// находится указатель;
// m  - наименование слоя, который надо
// отобразить под этой яйчейкой.

function show(el,m) {

if (m!=null) {
m=getelementbyid(m);
}

// получаем элемент в m


        if ((el==null) && (cm)) {
        mstatus=false;
        movefx()
// закрываем меню через movefx

        } else if ((m!=cm) && (m)) {
        if (cm!=null) switchDiv(cm,false);
// пользователь перешёл на другой пункт основного меню
// немедлено сделать невидимым предыдущий (cm) видимый в данный момент слой.  

        switchDiv(m,true); // сделать видимым  слой m
        fxel=el;             
        fxm=m;
        fxrect=0; // текущая высота области отсечения (см. ниже)

        // запоминаем значения в глобальных переменных
        // для использования в дальнейшем

        mstatus=true; // будем открывать меню с помощью movefx
        movefx()
	}
        
        if (m) cm=m; 
        // запоминаем значение m в cm 

  if (tstat==1) {
  clearTimeout(timer1);
  tstat=0
// если таймер timer1 запущен, останавливаем его
  }
 
}


// Функция "закрывающая" меню.

// Функция принимает на вход b типа boolean
// при true закрывает меню учитывая задержку hide_delay;
// при false (или каком-либо другом значении кроме true) 
// закрывает меню немедлено
 
// и возвращает 1.

function hidemenu(b) {
 if (b)  {
 tstat=1;
 timer1=setTimeout("show(null)",hide_delay);
 } else {
 tstat=0;
 show(null);
 }

}



// Функция останавливающая таймер запущенный
// прошлой функцией. Таким образом,
// меню не пропадает.

// Функция ничего не принимает на вход
// и возвращает 1.

function cancelhide() {

if (!mstatus) {
mstatus=1;
// если меню закрывалось, открываем его вновь
}
 
tstat=0;
clearTimeout(timer1);
// останавливаем таймер
 

}



// Функция отвечающая за эффектное выпадение меню. 
// Ничего не принимает на вход
// Возвращает 1.


function movefx() {

if ((mstatus) && (fxrect>fxm.offsetHeight)) {
fxrect=fxm.offsetHeight;
return 1;

// Если меню открывается и область высота области отсечения больше
// высоты самого слоя, то делаем высоту области равной высоте слоя
// и выходим из функции.
 
} 



if ((!mstatus) && (fxrect<0)) {
fxrect=0;
switchDiv(fxm,false);
mstatus=true;
cm=null;
return 1;

// Если меню закрывается и область отсечения меньше 0 
// (признак того, что меню полностью закрылось)
// делаем область = 0
// делаем слой невидимым
// ставим mstatus=true (чтобы при следующем вызове show 
// меню снова открывалось)
// выходим из функции (возвращая 1) 
}

if ((isIE5)||(isIE4)||(isNS4)||(isNS6)) {
 if (!isNS4) {
 fxm.style.left = getPos(fxel,"Left")+"px";
 fxm.style.clip='rect(' + (fxm.offsetHeight-fxrect) + ' '+ fxm.offsetWidth + ' ' + fxm.offsetHeight +' '+ 0 +')';
 fxm.style.top = getPos(fxel,"Top")+(fxel.offsetHeight-fxm.offsetHeight+fxrect+2)+"px"; 
 } else {
 fxm.left=getPos(fxel,"Left");
 fxm.clip.top=fxm.offsetHeight-fxrect;
 fxm.clip.bottom=fxm.offsetHeight;
 fxm.clip.left=0;
 fxm.clip.right=fxm.offsetWidth;
 fxm.top=getPos(fxel,"Top")+(fxel.offsetHeight-fxm.offsetHeight+fxrect+2); 
 }

// это всё описано вначале данной статьи :)

  if (mstatus) {
  fxrect=fxrect+mstep;
  setTimeout('movefx()',1);
// Если меню открывается,
// прибавляем к высоте области отсечения значение mstep;
// запускаем таймер для повторного выполнения movefx через 1 м.сек.
  } else {
  fxrect=fxrect-mstep;
  setTimeout('movefx()',1);

// Иначе (меню закрывается), отнимаем от высоты области отсечения 
// значение mstep.
  }

 return 1; 
} else {
  if (mstatus) {
  fxm.style.left =getPos(fxel,"Left")+"px";
  fxm.style.top = (getPos(fxel,"Top")+ fxel.offsetHeight) +"px";
   } else {
  switchDiv(fxm,false);
  cm=null;
  mstatus=true;
  }
return 1 
}


}

