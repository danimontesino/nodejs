const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type":"application/json"});

    const people = {
        id: 1,
        name: "Daniel"
    }

    res.write(JSON.stringify(people));
    res.end();
})
.listen(8080);