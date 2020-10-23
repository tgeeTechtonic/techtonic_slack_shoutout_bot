const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const db = require('knex')(config);

const shoutoutController = {
  getRecentShoutouts: async () => {
    return await db('shoutouts')
      .select()
      .then((shoutouts) => shoutouts);
  },
};

module.exports = shoutoutController;
