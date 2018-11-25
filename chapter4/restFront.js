function getUser(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML = '';
            Object.keys(users).map(function (key){
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                var edit = document.createElement('button');
                edit.textContent = 'Edit';
                edit.addEventListener('click', function() {
                    var name = prompt('Input a name for change');
                    if(!name){
                        return alter('Input name');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        }else{
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT', '/users/' + key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name: name}));
                });
                var remove = document.createElement('button');
                remove.textContent = 'Delete';
                remove.addEventListener('click', function(){
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        }else{
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(usrerDiv);
            });
        }else{
            console.error(xhr.responseText);
        };
        xhr.open('GET', '/users');
        xhr.send();
    }
    window.onload = getUser;
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        var name = e.target.username.value;
        if(!name){
            return('Input you name');
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if(xhr.status === 201){
                console.log(xhr.responseText);
                getUser();
            }else{
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST', '/users');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ name: name }));
        e.tartget.username.value = '';
    });
}