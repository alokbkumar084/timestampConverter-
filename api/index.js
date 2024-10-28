const express = require('express');
const app = express();
app.use(express.json());

app.get('/functions/timestampConverter', (req, res) => {
  res.json({
    name: "timestampConverter",
    description: "Converts a Unix timestamp into a human-readable date format.",
    input: {
      type: "number",
      description: "The Unix timestamp to convert.",
      example: 1698513600
    },
    output: {
      type: "string",
      description: "The converted date in ISO 8601 format (e.g., '2024-10-28T12:00:00.000Z').",
      example: "2024-10-28T12:00:00.000Z"
    }
  });
});

app.post('/functions/timestampConverter',(req, res)=>{
  const { input } = req.body;

  // Check if input is a valid Unix timestamp (numeric value)
  if (!input || isNaN(input)) {
    return res.status(400).send({ error: "Invalid input. Please provide a Unix timestamp." });
  }

  // Convert the timestamp to a human-readable date
  const date = new Date(parseInt(input) * 1000);
  const output = date.toISOString(); // Returns date in "YYYY-MM-DDTHH:mm:ss.sssZ" format

  res.send({ output });
})

module.exports = app;