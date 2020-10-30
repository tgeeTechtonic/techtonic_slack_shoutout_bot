const { db } = require('../dbConfig');

const shoutoutController = {
  getRecentShoutouts: async () => {
    return await db('shoutouts')
      .select()
      .then((shouts) => {
        const shoutoutPromises = shouts
          .sort((a, b) => b.date - a.date)
          .slice(0, 5)
          .map((shout) => createShoutoutRes(db, shout));
        return Promise.all(shoutoutPromises);
      })
      .then((filteredShoutouts) => filteredShoutouts);
  },
  getAllShoutOuts: async () => {
    return await db('shoutouts')
      .select()
      .then((shoutouts) => {
        const shoutoutPromises = shoutouts
          .sort((a, b) => b.date - a.date)
          .map((shout) => createShoutoutRes(db, shout));
        return Promise.all(shoutoutPromises);
      })
      .then((formatedShoutouts) => formatedShoutouts);
  },
};

const createShoutoutRes = async (db, shout) => {
  const shouter = await db('users').where('id', shout.shouter).first();
  const shoutee = await db('users').where('id', shout.shoutee).first();
  const companyValue = await db('company_values')
    .where('id', shout.company_value)
    .first();

  return {
    date: shout.date.toDateString(),
    message: shout.message,
    channel_name: shout.channel_name,
    shouter: shouter.first_name,
    shoutee: shoutee.first_name,
    company_value: companyValue.value,
    shoutout_id: shout.id,
  };
};

module.exports = shoutoutController;
