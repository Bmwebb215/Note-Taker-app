const express = require('express');
const app = express();
const path = require('path');
const noteRoutes = require('./routes/notes');

const PORT = process.env.PORT || 3001;


app.use(express.json());// allows access to req.body
app.use(express.urlencoded({ extended: true }));  // allows access to req.body

app.use(express.static('public')); // allows access to public folder
app.use('/notes', noteRoutes);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
