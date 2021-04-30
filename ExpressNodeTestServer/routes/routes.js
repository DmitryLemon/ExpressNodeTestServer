const StartTime = Date.now();


let clients = [
    {
        id: 1,
        name: "Kekes Voldemarovich",
        age: "44",
    },
    {
        id: 2,
        name: "Sonya Sonyevna",
        age: "21",
    },
    {
        id: 3,
        name: "Polina Polinina",
        age: "10",
    },
];

const router = app => {

    let timohavideos = [
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/MWNipER36l8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZArQIidz9b4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/nkpB3AT9XFI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/sPt8Yu7te3c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/3AwO-zi6WDc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/58jjMgiCevM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]

    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    app.get('/', (req, res) => {
        let uphr = Math.floor((Date.now() - StartTime) / 3.6e6);
        let upmn = Math.floor((Date.now() - StartTime) / 6e4) - (uphr * 60);
        let upsc = (Date.now() - StartTime) / 1000 - (uphr * 3600 + upmn * 60);
        let rand = random(0, timohavideos.length);
        let timoharand = timohavideos[rand];
        res.send('<html>'
            + '<head><style>.accordion {background - color: #eee;color: #444;cursor: pointer;padding: 18px;  width: 100%;  border: none;  text-align: left;  outline: none;  font-size: 15px;  transition: 0.4s;}.active, .accordion:hover {                background - color: #ccc;}.panel {                padding: 0 18px;  display: none;  background-color: white;  overflow: hidden;}</style></head >'
            + '<body> Hello World! <br> <br>'
            + 'Server uptime: ' + uphr + ' hr ' + upmn + ' min ' + upsc.toFixed(3) + ' sec<br><br><a href="/clients">Look at these client dudes!</a><br><br>'
            + '<button class="accordion">Press for lulz</button><div class="panel">  <p><br><img src="img/postoyanno.jpg" alt="blya, kartinka poteryalas">' + '<br>' + timoharand + '</p></div>'
            + '<script>        var acc = document.getElementsByClassName("accordion");        var i; for (i = 0; i < acc.length; i++) {acc[i].addEventListener("click", function() {    this.classList.toggle("active");    var panel = this.nextElementSibling;    if (panel.style.display === "block") {panel.style.display = "none";    } else {      panel.style.display = "block";    }  });}</script>'
            + '</body></html>');
    });

    app.get("/clients/:id", isAuthorized, (req, res) => {

        res.json(clients.find(p => p.id === +req.params.id));
    });



    app.route('/clients')
        .get((req, res) => {
            console.log(req.ip + ' looked at the dudes');
            res.send(JSON.stringify(clients) + '<br><br><a href="/">Back to main</a>');
        })
        .post((req, res) => {
            const newClient = { id: clients.length + 1, ...req.body }
            clients = [...clients, newClient]
            res.json(newClient);
        })
        .put((req, res) => {
            let updatedClient;
            clients = clients.map(p => {
                if (p.id === req.body.id) {
                    updatedClient = { ...p, ...req.body };
                    return updatedClient;
                }
                return p;
            })
            res.json(updatedClient);
        })
        .delete((req, res) => {
            const deletedClient = clients.find(p => p.id === +req.body.id);
            clients = clients.filter(p => p.id !== +req.body.id);
            res.json(deletedClient);
        })

    function isAuthorized(req, res, next) {
        const auth = req.headers.authorization;
        if (auth === 'password') {
            next();
        } else {
            res.status(401);
            res.send('Access denied: Not authorized');
        }
    }
}

// Export the router
module.exports = router;