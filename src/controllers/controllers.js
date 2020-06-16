const { uuid } = require("uuidv4");
const repositories = [];

module.exports = {
   getRepos(request, response) {
      response.send(repositories);
   },
   createRepo(request, response) {
      const { title, url, techs } = request.body;

      const repo = {
         id: uuid(),
         title,
         url,
         techs,
         likes: 0,
      };

      repositories.push(repo);

      return response.status(201).json(repo);
   },
   editRepo(request, response) {
      const { id } = request.params;
      const { title, url, techs } = request.body;

      const repoIndex = repositories.findIndex((repo) => repo.id === id);

      if (repoIndex < 0) {
         return response.status(400).json({ error: "id do repositorio não encontrado" });
      }

      repositories[repoIndex] = { ...repositories[repoIndex], title, url, techs };

      return response.json(repositories[repoIndex]);
   },
   deleteRepo(request, response) {
      const { id } = request.params;

      const repoIndex = repositories.findIndex((repo) => repo.id === id);

      if (repoIndex < 0) {
         return response.status(400).json({ error: "id do repositorio não encontrado" });
      }

      repositories.splice(repoIndex, 1);

      return response.status(204).send();
   },
   like(request, response) {
      const { id } = request.params;

      const repoIndex = repositories.findIndex((repo) => repo.id === id);

      if (repoIndex < 0) {
         return response.status(400).json({ error: "id do repositorio não encontrado" });
      }

      repositories[repoIndex].likes++;

      return response.json(repositories[repoIndex]);
   },
};
