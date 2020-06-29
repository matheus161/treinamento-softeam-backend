const app = require("./src/app");

app.listen(3001, (err) => {
    if (err) {
        return console.log("err: ", err);
    }
    return console.log(`Server running at http://localhost:3001`)
});

