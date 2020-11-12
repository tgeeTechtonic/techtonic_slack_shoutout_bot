const { db } = require('../dbConfig');

const userController = {
  getAllUsers: async () => {
    return await db('users')
      .select()
      .orderBy('first_name', 'desc')
      .then((users) =>
        Promise.all(users.map((user) => createAllUsersRes(db, user)))
      );
  },
};

const createAllUsersRes = async (
  db,
  { id, avatar, email, first_name, job_title, last_name, slack_handle, role }
) => {
  const shoutsGiven = await db('shoutouts').where('shouter', id).count();
  const shoutsReceived = await db('shoutouts').where('shoutee', id).count();

  return {
    id,
    avatar,
    email,
    first_name,
    job_title,
    last_name,
    num_shoutouts_given: parseInt(shoutsGiven[0].count),
    num_shoutouts_received: parseInt(shoutsReceived[0].count),
    role,
    slack_handle,
  };
};

module.exports = userController;
