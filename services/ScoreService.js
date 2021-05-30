const { readFile, writeFile } = require('fs/promises');

class ScoreService {
  constructor(file) {
    this.file = file;
  }

  async writeData({ name = 'NoName', score = 0 }) {
    const data = (await this.fetchData()) || [];
    data.push({ name, score });
    data.sort((a, b) => b.score - a.score);
    return writeFile(this.file, JSON.stringify(data.slice(0, 10)));
  }

  async fetchData() {
    try {
      const data = await readFile(this.file, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
}

module.exports = ScoreService;
