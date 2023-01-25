const test = (req, res) => {
    res.json({
        status: 200,
        message: "Test controller for Views successful.."
    });
}

const root = (req, res) => {
    res.sendFile('/views/index.html', {
        root: `${__dirname}/../`
    });
}

module.exports = {
    test,
    root
}