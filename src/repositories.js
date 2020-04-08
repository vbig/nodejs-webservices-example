const { uuid } = require("uuidv4");

const repositories = {
  data: [],
  getAll: function (_req, res) {
    return res.status(200).json(this.data);
  },
  create: function (req, res) {
    const { title, url, techs } = req.body;

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0,
    };

    this.data.push(repository);

    return res.status(201).json(repository);
  },
  updateById: function (req, res) {
    const { title, url, techs } = req.body;
    const { id } = req.params;

    const repositoryIndex = this.data.findIndex(
      (currentRepository) => currentRepository.id === id
    );

    if (repositoryIndex === -1)
      return res.status(404).json({
        message: "O repositório não existe.",
      });

    const updatedRepository = {
      ...this.data[repositoryIndex],
      title,
      url,
      techs,
    };

    this.data[repositoryIndex] = updatedRepository;

    return res.status(200).json(updatedRepository);
  },
  deleteById: function (req, res) {
    const { id } = req.params;

    const repositoryIndex = this.data.findIndex(
      (currentRepository) => currentRepository.id === id
    );

    if (repositoryIndex === -1)
      return res.status(404).json({
        message: "O repositório não existe.",
      });

    this.data.splice(repositoryIndex, 1);

    return res.status(204).send();
  },
  updateRepositoryLikesById: function (req, res) {
    const { id } = req.params;

    const repositoryIndex = this.data.findIndex(
      (currentRepository) => currentRepository.id === id
    );

    if (repositoryIndex === -1)
      return res.status(404).json({
        message: "O repositório não existe.",
      });

    const updatedRepository = {
      ...this.data[repositoryIndex],
      likes: ++this.data[repositoryIndex].likes,
    };

    return res.status(200).json(updatedRepository);
  },
};

module.exports = {
  getAll: repositories.getAll.bind(repositories),
  create: repositories.create.bind(repositories),
  updateById: repositories.updateById.bind(repositories),
  deleteById: repositories.deleteById.bind(repositories),
  updateRepositoryLikesById: repositories.updateRepositoryLikesById.bind(
    repositories
  ),
};
