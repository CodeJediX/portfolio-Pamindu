import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
const port=Number(process.env.PORT||4174);
createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  let path=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(path!==resolve(root)&&!path.startsWith(resolve(root)+sep)){res.writeHead(403);res.end();return;}
  if((await stat(path)).isDirectory()) {
    if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return;}
    path=resolve(path,'index.html');
  }
  res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(await readFile(path));
 } catch {res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio preview: http://127.0.0.1:${port}`));
