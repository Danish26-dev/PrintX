import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Strands Agent running on http://localhost:${PORT}`);
  console.log('AI Reasoning engine ready - awaiting tasks from Backend');
});
