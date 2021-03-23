//document ready
function ready(callBack) {
  if (document.readyState !== 'loading'){
    callBack();
  } else {
    document.addEventListener('DOMContentLoaded', callBack);
  }
}

//pedir autorização para notificações
function askNotification() {
  Notification.requestPermission(function(result) {
    console.log("Esolha para notificação: ", result);
    //se a opção de notificações for aceita
    //garanted, denied, dafaut
    if (result !== "granted") {
      console.log("Sem permissão para notificações");
    } 
    document.querySelector("#btnNot").style.display = 'none';
  });
}


//registrar service worker
ready(function () {

  //verifica suporte a Service Worker
  if ( 'serviceWorker' in navigator ) {
    //nome do arquivo e do escopo que deverá ser instalado
  	navigator.serviceWorker.register("sw.js", { scope: '/vdp/2/' })
  	.then(function(register){

      //verifica, pode-se fazer algo caso esteja em algum desses estados
  		if ( register.installing )
  			console.log('Service Worker instalando com sucesso em '+register.scope);
  		else if( register.waiting ) 
  			console.log('Service Worker waiting em '+register.scope);
  		else if ( register.active ) {
  			console.log('Service Worker ativo em '+register.scope);
      }

  	}).catch(function(error){

      //se houver falha vc pode avisar, enviar o erro para uma URL, gerar log
  		console.log('Falha ao registrar Service Worker '+error);

  	});

  }

});


//botão de instalação do aplicativo a2hs (Add to home screen) - PWA
let deferredPrompt;
//div com as opções e a mensagem
const a2hs = document.querySelector('#a2hs');
//botao de confirmação para adicionar
const btnAdd = document.querySelector('#btnAdd');


//funcação para verificar e mostrar opção de instalação - beforeinstallprompt
//só irá funcionar caso o PWA esteja funcionando corretamente
this.addEventListener('beforeinstallprompt', (e) => {
    
    console.log('beforeinstallprompt...');

    //mostrar div com a opções
    a2hs.style.display = 'block';
    e.preventDefault();
    deferredPrompt = e;

    //ao clicar no botão de adicionar
    btnAdd.addEventListener('click', (e) => {
        
        console.log("Clicado...");

        //esconder a div com a sopções
        a2hs.style.display = 'none';

        deferredPrompt.prompt();

        //verificar se foi aceito
        deferredPrompt.userChoice.then((choiceResult) => {

            //se foi aceito irá acionar a instalação
            if (choiceResult.outcome === 'accepted') {

                //aqui vc pode enviar informações de aceite para uma URL ou Analytics
                console.log('Instalação aceita');
                
            } else {
                console.log('Instalação não aceita');
            }
            deferredPrompt = null;
        });
    });
});


//se esta instalado, para não repetir a ação qdo já estiver instalado
window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs instalado');
  a2hs.style.display = 'none';
});

