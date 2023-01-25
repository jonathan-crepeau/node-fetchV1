const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res) => {
    res.sendFile('/views/index.html', {
        root: `${__dirname}/../`
    });
});

router.get('/test', (req, res) => {
    res.json({
        status: 200,
        message: "Views test route successful.."
    });
});

router.get('/pokemon', async (req, res) => {
    
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/17/', {method: 'GET'});
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: "Internal server error, something went wrong."
        });
    }
});

router.get('/petfinder', async (req, res) => {

    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));


    // try {
    //     let response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    //     });
    //     response = await response.json();
    //     res.status(200).json(response);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({
    //         status: 500,
    //         message: "Internal server error, something went wrong."
    //     });
    // }
});

module.exports = router;