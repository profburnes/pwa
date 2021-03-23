ready(function () {

	var el = document.querySelector('.header-nav');

	el.onclick = function() {

		var nav = document.querySelector('.header-menu');
	    nav.classList.toggle('active');

	}

	var btnDis = document.querySelector('#btnDis');

	btnDis.onclick = function() {

		var div = document.querySelector('#a2hs');
	    div.style.display = 'none';

	}

	var request = new XMLHttpRequest();
    request.open('GET', 'tirinhas.json', true);

    request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var data = JSON.parse(request.responseText);
	  } 

	  preencherPagina(data);
	};

	request.onerror = function() {
	  console.log("Erro ao carregar JSON")
	};

	request.send();

	function preencherPagina(data) {

		data.forEach(function (dado){
			var obj = document.querySelector('article');
			var html = '<div class="tirinha"><h1>'+dado.titulo+'</h1><img src="../'+dado.tirinha+'" alt="'+dado.titulo+'" width="100%"></div>';
			obj.insertAdjacentHTML('beforeend', html);
		})

	}


});