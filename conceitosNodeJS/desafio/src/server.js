const express = require('express');

const server = express();

const port = process.env.PORT || 3333;
server.use(express.json());
let count = 0;

const projects = [
  {
    id: '1',
    title: 'Desafio NodeJS',
    tasks: ['nodejs', 'express'],
  },
  {
    id: '2',
    title: 'Trocar Fralda',
    tasks: ['Trocar Fralda', 'Banhar Helena'],
  },
  {
    id: '3',
    title: 'Dar Mamadeira',
    tasks: ['Fazer mamadeira Helena'],
  },
  {
    id: '4',
    title: 'Por pra Arrotar',
    tasks: ['Fazer Helena arrotar'],
  },
  {
    id: '5',
    title: 'Por Helena pra Domir',
    tasks: ['Por Helena pra Domir'],
  },
];

server.use((req, res, next) => {
  console.log(`Esta é a requisição de número: ${count}`);
  count += 1;
  next();
});

function checkId(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(x => x.id === id);

  if (!projects[index]) {
    return res.status(400).json({ error: 'Id não existe' });
  }
  return next();
}

// Rota GET
server.get('/', (req, res) => {
  return res.json(projects);
}); // Listagem Ok

// Rota POST
server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({
    id,
    title,
    tasks: [tasks],
  });

  return res.json(projects);
}); // Criação Ok

// Rota PUT
server.put('/projects/:id', checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(x => x.id === id);
  projects[index].title = title;
  res.json(projects[index]);
}); // Atualização Ok

// Rota Delete
server.delete('/projects/:id', checkId, (req, res) => {
  const { id } = req.params;

  projects.splice(id - 1, 1);

  return res.json(projects);
}); // Deleção Ok

server.listen(port, () => {
  return console.log(`Server onLine and listen on port ${port}`);
});

// Inclusão de nova Tarefa
server.post('/projects/:id/tasks', checkId, (req, res) => {
  const { tasks } = req.body;
  const { id } = req.params;

  const project = projects.find(x => x.id === id);

  project.tasks.push(tasks);

  return res.json(projects);
}); // Entender depois como inserir um novo elemento dentro do array da atual posição. => Concluido.
