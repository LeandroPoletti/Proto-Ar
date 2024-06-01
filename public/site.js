function logar(){
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if(login == 'admin' && senha == '1234'){
        alert('Usuario Logado com Sucesso!');
        location.href= 'home.html';
    }else{
        alert('Usuarios ou senha incorretas');
    }
    
}
    