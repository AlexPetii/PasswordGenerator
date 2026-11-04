
import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/api/password', async (req, res) => {
  const length = Number(req.query.length);

  if (!Number.isInteger(length) ||
      length < 4 || length > 64) {
    return res.status(400).json({
      error: 'Invalid length'
    });
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/passwordgenerator?length=${length}`,
      {
        headers: {
          'X-Api-Key': process.env.API_NINJAS_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error('API Ninjas not available');
    }

    res.json(await response.json());
  } catch {
    res.status(502).json({
      error: 'Error with external API'
    });
  }
});

app.listen(3000, () => {
  console.log('API Server: http://localhost:3000');
});
