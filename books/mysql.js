var mysql = require("mysql");
module.exports={
    'sel':(res)=>{
            //服务器端发送数据库
            var conn = mysql.createConnection({
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'h52002'
            });

            var sql="select id,name,author,price,vip,url from books";
            conn.query(sql,function (err, result) {
                res.end(JSON.stringify(result));
            });
            
            conn.end();
            },
    'login':(res,u_name,u_pwd)=>{
        var conn = mysql.createConnection({
            host     : '127.0.0.1',
            user     : 'root',
            password : '',
            database : 'h52002'
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<head><meta charset="utf-8"/></head>');
        var sql = "select name,pwd,vip from man";
        conn.query(sql, function (err, result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].name == u_name && result[i].pwd == u_pwd) {
                    // res.writeHead(200, {'Content-Type': 'text/html'});  
                    // res.write('<head><meta charset="utf-8"/></head>'); 
                    res.end(`<script>location='/';sessionStorage['name']='${u_name}';sessionStorage['vip']='${result[i].vip}';</script>`);
                }
            }
                res.end("<script>alert('登录失败请重新登录');location='/html/login.html';</script>");
        });
             conn.end();
        },

    'del':(res,id)=>{
            
            var conn = mysql.createConnection({
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'h52002'
            });

            var sql=`delete from books where id=${id}`;
            conn.query(sql,function (err, result) {
                // console.log(result);
                res.end("OK");
            });
            conn.end();
    },
    'derail':(res,x)=>{
            var conn = mysql.createConnection({
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'h52002'
            });
            var sql=`select brief,content from books where id=${x}`;
            conn.query(sql,function (err, result) {
                res.end(JSON.stringify(result));
            });
            
            conn.end();
            },

    'update01':(res,id)=>{
            var conn = mysql.createConnection({
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'h52002'
            });
            var sql=`select * from books where id=${id}`;
            conn.query(sql,function (err, result) {
                res.end(JSON.stringify(result));
            });
            
            conn.end();
            },

    'update':(res,arr,aaa)=>{
                var conn = mysql.createConnection({
                    host     : '127.0.0.1',
                    user     : 'root',
                    password : '',
                    database : 'h52002'
                });
               
                var sql=`update books set name=?,author=?,price=?,quantity=?,brief=?,content=?,vip=?,url=? where id='${aaa}'`;
                conn.query(sql,arr,function (err, result) {
                    // console.log(result);
                    res.end(`<script>location='/';</script>`);
                });
                
                conn.end();
                },

        
    'insert':(res,arr)=>{
        var conn = mysql.createConnection({
            host     : '127.0.0.1',
            user     : 'root',
            password : '',
            database : 'h52002'
        });
       console.log(arr);
        var sql=`insert into books values(0,?,?,?,?,?,?,?,?)`;
        conn.query(sql,arr,function (err, result) {
            console.log(result);
            res.end(`<script>location='/';</script>`);
        });
        
        conn.end();
        },


}


