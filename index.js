const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/quiz-result', async (req, res) => {
  const quizData = req.body;

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a college recommendation assistant." },
          { role: "user", content: `Based on this quiz result: ${JSON.stringify(quizData)}, recommend ideal colleges, subjects, and cocurricular activities.` }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    res.json(openaiResponse.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to process quiz result.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
