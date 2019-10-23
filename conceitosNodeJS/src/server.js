import app from './app';

const port = process.env.PORT || 3333;
app.listen(3333, () => console.log(`Server on, on port ${port}`));
