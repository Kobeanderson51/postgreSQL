const { Pool } = require('pg');
let dbConfig = {
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/dvdrental', 
    ssl: {rejectUnauthorized: false}
};

const pool = new Pool(dbConfig);

exports.getActors = (req, res) => {
    pool.query('SELECT * FROM actor LIMIT 5', (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("getActors");
        for (let row of result.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(result.rows);
    });
};

exports.getFilmById = async (req, res) => {
    const id = parseInt(req.params.id);
    const sqlConfig = {
        text: 'SELECT * FROM film WHERE film_id = $1',
        values: [id]
    };
    try {
        const result = await pool.query(sqlConfig);
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};


