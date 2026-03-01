import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
  console.log(`Strands Agent URL: ${process.env.STRANDS_AGENT_URL}`);
});
