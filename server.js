const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(()=> {
        const server = express();
        
        //typically with nextJS there is no need to write routes like that,
        //because nextJS automatically creates the routes for files in /pages
        server.get('/page2', (req, res) => {
            return app.render(req, res, '/page2');
        })

        server.get('/page3', (req, res) => {
            return app.render(req, res, '/amiright');
        })

        server.get('*', (req, res) => {
            return handle(req, res);
        })

        server.listen(port, (err) => {
            if(err) throw err;
            console.log(`Ready on http://localhost;${port}`);
        })
    })
