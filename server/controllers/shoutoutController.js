const { db } = require('../dbConfig');

const shoutoutController = {
  getRecentShoutouts: async () => {
    return await db('shoutouts')
      .select()
      .then((shoutouts) => {
        const sorted = shoutouts.sort((a, b) => b.date - a.date);
        return sorted.slice(0, 4);
      });
  },
};

module.exports = shoutoutController;
