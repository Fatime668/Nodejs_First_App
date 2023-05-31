const http = require('http')

http.createServer(function(req,res){
    res.write('Fatima')
    res.end()
})
.listen(8080)