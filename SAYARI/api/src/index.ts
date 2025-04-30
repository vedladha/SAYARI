import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'The Sayari API is running!' });
});

// this endpoint will read all the answers to a particular question
app.get('/questions/:id/answers', async (req: Request, res: Response) => {
    const question = parseInt(req.params.id, 10);

    try {
    const result = await pool.query(
    `SELECT id, question_id, user_id, body, creation, score, accepted, created_at
    FROM answers
    WHERE question_id = $1
    ORDER BY creation ASC`,
    [question]
    );
        res.json({ answers: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// this endpoint will add a new answer to the question 
app.post('/questions/:id/answers', async (req: Request, res: Response) => {
    const question = parseInt(req.params.id, 10);
    const { user_id, body, creation } = req.body;

    if (user_id === undefined || typeof user_id !== 'number' || typeof body !== 'string' || creation === undefined || typeof creation !== 'number') {
    return res.status(400).json({ error: 'Some of the data fields required are missing' });
}

    try {
    const insert = await pool.query(
        `INSERT INTO answers (question_id, user_id, body, creation)
        VALUES ($1, $2, $3, $4)
        RETURNING id, question_id, user_id, body, creation, score, accepted, created_at`,
        [question, user_id, body, creation]
    );
    res.status(201).json({ answer: insert.rows[0] });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}
});

// Does both the read and the write 
app.get('/questions/:id', async (req: Request, res: Response) => {
    const question = parseInt(req.params.id, 10);

    try {
    // Fetches the question
    const req = await pool.query(
    `SELECT id, user_id, title, body, creation, score, created_at
    FROM questions
    WHERE id = $1`,
    [question]
    );
    if (req.rowCount === 0) {
        return res.status(404).json({ error: 'Question not found' });
    }

    // Fetch its answers
    const ans = await pool.query(
    `SELECT id, question_id, user_id, body, creation, score, accepted, created_at
    FROM answers
    WHERE question_id = $1
    ORDER BY creation ASC`,
    [question]
    );

    res.json({
        question: req.rows[0],
        answers: ans.rows,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    }
});

const port = Number(process.env.PORT) || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
