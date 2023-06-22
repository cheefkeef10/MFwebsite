var input,search,pr,result,result_arr, locale_HTML, result_store;

function func() {
 	locale_HTML = document.body.innerHTML;   // сохран€ем в переменную весь body (ѕервоначальный)
}
setTimeout(func, 1000);  //ждем подгрузки Jsona и выполн€ем

function FindOnPage(name, status) {

	input = document.getElementById(name).value; //получаем значение из пол€ в html
	
	if(input.length<3&&status==true)
	{
		alert('ћинимальное кол-во букв в поиске равно 3');
		function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
	}
	
	if(input.length>=3)
	{
		function FindOnPageGo() {

			search = '/'+input+'/g';  //делаем из строки регу€рное выражение
			pr = document.body.innerHTML;   // сохран€ем в переменную весь body
			result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
			result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)

			var warning = true;
			for(var i=0;i<result.length;i++) {
				if(result[i].match(eval(search))!=null) {
					warning = false;
				}
			}
			if(warning == true) {
				alert('Ќе найдено.');
			}

			for(var i=0; i<result.length;i++) {
				result_arr[i] = result[i].replace(eval(search), '<span style="background-color:yellow;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохран€ем в новый массив
			}
			for(var i=0; i<result.length;i++) {
				pr=pr.replace(result[i],result_arr[i])  //замен€ем в переменной с html текст на новый из новогом ассива
			}
			document.body.innerHTML = pr;  //замен€ем html код
		}
	}
	function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
	if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и ¬ыдел€ем найденное
	if(!status) { FindOnPageBack(); } //—нимаем выделение
}