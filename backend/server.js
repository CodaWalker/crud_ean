import express from 'express';
import server from 'json-server';
import cors from 'cors';
import bodyParser from 'body-parser';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const port = 4000;

app.use(cors());

//app.use(bodyParser.json());

app.get('/', urlencodedParser, function (req, res) {
    res.send('Welcome, ' + 'User' +
        `<div>`+
            `<div class="container">`+
                `<h3>JSON Server</h3>`+
                `<div id="resources">`+
                    `<div>`+
                    `<h4>Resources</h4>`+
                        `<ul>`+
                            `<li>`+
                                `<a href="products" target="_blank"><button>Products</button></a>`+
                            `</li>`+
                        `</ul>`+
                    `</div>`+
                `</div>`+
            `</div>`+
        `</div>`
    )
});

app.use('/', server.router('products.json'));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened ', err)
    }
    console.log('server is listening on ' + port)
});
