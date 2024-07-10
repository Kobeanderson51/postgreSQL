const express = require('express');
const app = express();
const db = require('./config/database'); // Assuming this is where your database configuration is stored
const PORT = process.env.PORT || 3005;


app.get('/getActor', db.getActors);
app.get('/getFilmById/:id', db.getFilmById);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
