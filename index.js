const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

//Post request to create a project

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

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(projectChange => {
    if (projectChange.id === id) {
      projectChange.title = title;
      return res.json(projectChange);
    } else {
      return res.json('Projeto não encontrado');
    }
  });
});

server.listen('3000');
