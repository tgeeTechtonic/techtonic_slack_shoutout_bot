const { db } = require("../dbConfig");

const shoutoutController = {
  getRecentShoutouts: async () => {
    return await db("shoutouts")
      .select()
      .then((shoutouts) => {
        return shoutouts.sort((a, b) => b.date - a.date).slice(0, 5);
      })
      .then((shouts) => {
        let shoutoutPromises = shouts.map((shout) => {
          return createShoutoutRes(db, shout);
        });
        return Promise.all(shoutoutPromises);
      })
      .then((filteredShoutouts) => {
        return filteredShoutouts;
      });
  },
};

const createShoutoutRes = async (db, shout) => {
  let shouter = await db("users").where("id", shout.shouter).first();
  let shoutee = await db("users").where("id", shout.shoutee).first();
  let companyValue = await db("company_values")
    .where("id", shout.company_value)
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
