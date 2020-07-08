var http=require('http');
var url=require('url');
var fs=require('fs');
var jj=require("./mysql");
var server=http.createServer();
server.listen(1010);
var aaa;
server.on('request',(req,res)=>{
    var objurl=url.parse(req.url,true);
    var arr=objurl.pathname.split('.');
    if(objurl.pathname=='/' || objurl.pathname=="/index"){
        fs.readFile("./index.html",(err,buf)=>{
            res.end(buf);
            
        })
    }
    else if(arr[arr.length-1]=="js" || arr[arr.length-1]=="css"){
        fs.readFile(".//"+arr.join('.'),(err,buf)=>{
            res.end(buf);
        })
    }
    else if(arr[arr.length-1]=="jpg" || arr[arr.length-1]=="png" || arr[arr.length-1]=="jpeg"){
        fs.readFile(".//"+arr.join('.'),(err,buf)=>{
            res.end(buf);
        })
    }
    else if(objurl.pathname=="/rend"){
        jj.sel(res);
    }
    else if(objurl.pathname.split('.')[1]=='html'){
       fs.readFile(".//"+arr[0]+'.'+arr[1],(err,buf)=>{
        res.end(buf);
       })
    }
    else if(objurl.pathname.split(':')[0]=='data'){
        fs.readFile(".//"+arr[0]+':'+arr[1],(err,buf)=>{
         res.end(buf);
        })
     }
    else if(objurl.pathname=="/login"){
        var u_name=objurl.query.name;
        var u_pwd=objurl.query.pwd;
        jj.login(res,u_name,u_pwd);
    }
    else if(objurl.pathname=="/del"){
        var id=objurl.query.hide;
        jj.del(res,id);
        // console.log(id);
       
    } else if(objurl.pathname=="/detail"){
        var x=objurl.query.hide;
        jj.derail(res,x);
        // console.log(id);
       
    }
    else if(objurl.pathname=="/update01"){
        var id=objurl.query.id;
        aaa=id;
        jj.update01(res,id);
      
       
    }
    else if(objurl.pathname=="/update"){
        // console.log(objurl);
        var arr=[];
        arr.push(objurl.query.name);
        arr.push(objurl.query.author);
        arr.push(objurl.query.price);
        arr.push(objurl.query.quantity);
        arr.push(objurl.query.brief);
        arr.push(objurl.query.content);
        arr.push(objurl.query.vip);
        arr.push(objurl.query.url);
        jj.update(res,arr,aaa);
    }
    else if(objurl.pathname=="/insert"){
        // console.log(objurl);
        var arr=[];
        arr.push(objurl.query.name);
        arr.push(objurl.query.author);
        arr.push(objurl.query.price);
        arr.push(objurl.query.quantity);
        arr.push(objurl.query.brief);
        arr.push(objurl.query.content);
        arr.push(objurl.query.vip);
        arr.push(objurl.query.url);
        jj.insert(res,arr);
    }
});

console.log("服务器已开启");