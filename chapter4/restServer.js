const http = require('http');
const fs = require('fs');
const users = {};

http.createServer((req, res) => {
    if(req.method === 'GET'){
        if(req.url === '/') {
            return fs.readFile('./restFront.html', (err, data) => {
                if (err){
                    throw err;
                }
                res.end(data);
            });
        }else if(req.url === '/aboiut'){
            return fs.readFile('./about.html', (err, data) => {
                if(err){
                    throw err;
                }
                res.end(data);
            });
        }else if(req.url === '/users') {
            return res.end(JSON.stringify(users));
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            if(err){
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND');
            }
            return res.end(data);
        });
    }else if (req.method === 'POST'){
        if(req.url === '/users'){
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('POST Bodyj: ', body);
                const {name} = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end('Success Register');
            });
        }
    }else if(req.method === 'PUT') {
        if (req.url.startsWith('/users/')){

        }
    }
})