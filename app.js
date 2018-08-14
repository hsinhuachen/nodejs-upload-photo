
var fs = require('fs');
var express = require('express');
var multer = require('multer')
var app = express();
var createFolder = function(folder){
	try{
		fs.accessSync(folder); 
	}catch(e){
		fs.mkdirSync(folder);
	} 
};

var uploadFolder = './upload/';
createFolder(uploadFolder);
// 通過 filename 屬性定製
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadFolder);  // 儲存的路徑，備註：需要自己建立
	}, filename: function (req, file, cb) {
		// 將儲存檔名設定為 欄位名   時間戳，比如 logo-1478521468943
		cb(null, file.fieldname  + '-' +  Date.now() + ".jpg"); 
	}
});

// 通過 storage 選項來對 上傳行為 進行定製化
var upload = multer({ storage: storage })
// 單圖上傳
app.post('/upload', upload.single('logo'), function(req, res, next){
	var file = req.file;
	res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
	var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
	res.send(form);
});
app.listen(3000);