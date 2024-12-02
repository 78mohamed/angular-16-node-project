// Example of poor security practices in Node.js
const http = require('http');
const url = require('url');

// Mock database (insecure)
const users = {
  admin: "supersecretpassword",
};

http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  // Insecure authentication (critical flaw: plaintext password comparison)
  if (queryObject.username && queryObject.password) {
    if (
      users[queryObject.username] &&
      users[queryObject.username] === queryObject.password
    ) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome, " + queryObject.username);
    } else {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Invalid credentials");
    }
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing username or password");
  }
}).listen(8080);

console.log("Server running on port 8080");
