const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));
app.listen(8080);

app.use((req, res, next)=>{
	res.sendFile( path.join(__dirname.toString(),  'public/index.html'));
});
