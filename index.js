const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

//Post request to create a project

var amountRequests = 0;

server.use((req, res, next) => {
  amountRequests++;
  console.log(`${amountRequests} Requisições até o momento`);
  return next();
});

function checkProjectExist(req, res, next) {
  const project = projects.find(
    projectTemp => projectTemp.id === req.params.id
  );

  if (!project) {
    return res.status(400).json({ error: 'Project does not exist' });
  }

  return next();
}

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  const project = {
    id,
    title,
    tasks
  };
  projects.push(project);

  console.log('Projeto cadastrado com sucesso');
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //Usando find com ternário
  projects.find(projectChange => {
    projectChange.id === id ? (projectChange.title = title) : null;
  });
  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;
  //usando forEach com o condicional if
  projects.forEach(project => {
    if (project.id === id) {
      projects.splice(projects.indexOf(project), 1);
      return res.send('Projeto deletado com sucesso');
    }
  });
});

server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id === id) {
      project.tasks.push(title);
      return res.json(projects);
    }
  });
});

server.listen('3000');
