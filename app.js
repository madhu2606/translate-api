// https://github.com/FreddieDeWitt/extended-google-translate-api
const express = require('express');
const app = express();
const port = 3000
const translate = require('extended-google-translate-api');
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function authenticated(req,res,next){
	// if(req.headers['token'] == '2103522'){
	// 	return next();
	// }else{
	// 	res.send({"status":400,"result":"","error":"Token invalid"}) ;
	// }
	return next();
}

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/translate',authenticated,(req,res) =>{
	console.log(req.body)
	var text = req.body.text;
	var srcL = req.body.src;
	var dstL = req.body.dst;
	try{

		translate(text,srcL,dstL).then((trans) => {
		    // console.log(res.translation);
		    res.send({"status":200,"result":trans.translation,"error":""});
		}).catch(error =>{

		res.send({"status":400,"result":"","error":error}) ;

		}
		);

	}
	catch(error){
		console.log(error)
		res.send({"status":400,"result":"","error":error}) ;
	}
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))