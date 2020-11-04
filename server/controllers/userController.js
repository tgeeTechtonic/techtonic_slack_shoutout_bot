const { db } = require('../dbConfig');

const userController = {
  getAllUsers: async () => {
    return await db('users')
      .select()
      .orderBy('first_name', 'desc')
      .then((users) =>
        Promise.all(users.map((user) => createAllUsersRes(db, user)))
      )
  },
};

const createAllUsersRes = async (
  db,
  { id, first_name, last_name, slack_handle }
) => {
  const shoutsGiven = await db('shoutouts').where('shouter', id).count();
  const shoutsReceived = await db('shoutouts').where('shoutee', id).count();

  return {
    id,
    first_name,
    last_name,
    num_shoutouts_given: parseInt(shoutsGiven[0].count),
    num_shoutouts_received: parseInt(shoutsReceived[0].count),
    slack_handle,
  };
};

module.exports = userController;
