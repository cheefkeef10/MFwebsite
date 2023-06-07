
var mstatus=true; 

//mstatus - ���������� ������������(true) ��� �����������(false) ����  


var timer1=false; 
// ���� ����� ������������ �������� ��������

var mstep=3;
// ���-�� �������� �� ������� ����� ������������� ���� �� 1 ��������

var cm=null;
// ���� ����� ������������ ��������� �������� ����



var hide_delay=500;
// �������� ����� ��� ��� �������� ���� ������ ���������

var tstat=0;
// ������� �� ������� ���� (0 - ���, 1 - ��)

var ser="WEB1 0.67";

// ���������� ������� ������������

isNS4 = (document.layers) ? true : false;
isIE4 = (document.all && !document.getElementById) ? true : false;
isIE5 = (document.all && document.getElementById) ? true : false;
isNS6 = (!document.all && document.getElementById) ? true : false;


// ������� ������������ � ���������� ����

// ����:
// objElement - �������������(id) ����;
// bolVisible - ������ ����������:
// true  - ���������� ����;
// false - ������ ����.

// �����:
// 1


// P.S: � ����������� �� ���� ��������
// �������� ��� ����������� � ���������� ����
// ��������� �����������.

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



// ������� ������������ �������� ���������� �� 
// �������� ������� (�� ����������� ����).

// ����:
// el    - ������������� ��������;
// sProp - �������� (left,top...)

// �����:
// �������� ������-������ �������� �������.



function getPos(el,sProp) {
	var iPos = 0;
	while (el!=null) {
		iPos+=el["offset" + sProp]
		el = el.offsetParent
	}
	return iPos

}



// ������� ����� ������ � ���������
// �� ���������.

// ����:
// myid - �������� �������

// �����: ������.

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



// ������� ������������|����������
// ����.

// ������ ������� �� ������ ���������� ����,
// �� ������ �� �����������, � �������� ������� movefx,
// ������� ���� ����������. 


// ����:
// el - ������� ������� �� ������� 
// ��������� ���������;
// m  - ������������ ����, ������� ����
// ���������� ��� ���� ��������.

function show(el,m) {

if (m!=null) {
m=getelementbyid(m);
}

// �������� ������� � m


        if ((el==null) && (cm)) {
        mstatus=false;
        movefx()
// ��������� ���� ����� movefx

        } else if ((m!=cm) && (m)) {
        if (cm!=null) switchDiv(cm,false);
// ������������ ������� �� ������ ����� ��������� ����
// ��������� ������� ��������� ���������� (cm) ������� � ������ ������ ����.  

        switchDiv(m,true); // ������� �������  ���� m
        fxel=el;             
        fxm=m;
        fxrect=0; // ������� ������ ������� ��������� (��. ����)

        // ���������� �������� � ���������� ����������
        // ��� ������������� � ����������

        mstatus=true; // ����� ��������� ���� � ������� movefx
        movefx()
	}
        
        if (m) cm=m; 
        // ���������� �������� m � cm 

  if (tstat==1) {
  clearTimeout(timer1);
  tstat=0
// ���� ������ timer1 �������, ������������� ���
  }
 
}


// ������� "�����������" ����.

// ������� ��������� �� ���� b ���� boolean
// ��� true ��������� ���� �������� �������� hide_delay;
// ��� false (��� �����-���� ������ �������� ����� true) 
// ��������� ���� ���������
 
// � ���������� 1.

function hidemenu(b) {
 if (b)  {
 tstat=1;
 timer1=setTimeout("show(null)",hide_delay);
 } else {
 tstat=0;
 show(null);
 }

}



// ������� ��������������� ������ ����������
// ������� ��������. ����� �������,
// ���� �� ���������.

// ������� ������ �� ��������� �� ����
// � ���������� 1.

function cancelhide() {

if (!mstatus) {
mstatus=1;
// ���� ���� �����������, ��������� ��� �����
}
 
tstat=0;
clearTimeout(timer1);
// ������������� ������
 

}



// ������� ���������� �� ��������� ��������� ����. 
// ������ �� ��������� �� ����
// ���������� 1.


function movefx() {

if ((mstatus) && (fxrect>fxm.offsetHeight)) {
fxrect=fxm.offsetHeight;
return 1;

// ���� ���� ����������� � ������� ������ ������� ��������� ������
// ������ ������ ����, �� ������ ������ ������� ������ ������ ����
// � ������� �� �������.
 
} 



if ((!mstatus) && (fxrect<0)) {
fxrect=0;
switchDiv(fxm,false);
mstatus=true;
cm=null;
return 1;

// ���� ���� ����������� � ������� ��������� ������ 0 
// (������� ����, ��� ���� ��������� ���������)
// ������ ������� = 0
// ������ ���� ���������
// ������ mstatus=true (����� ��� ��������� ������ show 
// ���� ����� �����������)
// ������� �� ������� (��������� 1) 
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

// ��� �� ������� ������� ������ ������ :)

  if (mstatus) {
  fxrect=fxrect+mstep;
  setTimeout('movefx()',1);
// ���� ���� �����������,
// ���������� � ������ ������� ��������� �������� mstep;
// ��������� ������ ��� ���������� ���������� movefx ����� 1 �.���.
  } else {
  fxrect=fxrect-mstep;
  setTimeout('movefx()',1);

// ����� (���� �����������), �������� �� ������ ������� ��������� 
// �������� mstep.
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

