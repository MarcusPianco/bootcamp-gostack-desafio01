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

server.listen('3000');
