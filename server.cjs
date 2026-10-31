const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const files={'/':'index.html','/app.js':'app.js','/style.css':'style.css'};
http.createServer((req,res)=>{const file=files[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);return res.end('Not found')}res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html');fs.createReadStream(path.join(__dirname,file)).pipe(res)}).listen(3000,'127.0.0.1',()=>console.log('Dashboard: http://localhost:3000'));
