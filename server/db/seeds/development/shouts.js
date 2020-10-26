const seedData = require("../../mockData/seedData");

exports.seed = async (knex) => {
  await knex("shoutouts").del();
  await knex("company_values").del();
  await knex("users").del();

  return knex("users")
    .insert(seedData.users)
    .then(() => {
      return knex("company_values").insert(seedData.company_values);
    })
    .then(() => {
     let shoutoutPromises = seedData.shoutouts.map((shoutout) => {
       return createShoutout(knex, shoutout);
      });
      return Promise.all(shoutoutPromises);
    });
};

const createShoutout = async (knex, shoutout) => {
  let shouter = await knex("users").where("id", shoutout.shouter).first();
  let shoutee = await knex("users").where("id", shoutout.shoutee).first();
  let companyValue = await knex("company_values")
    .where("id", shoutout.company_value)
    .first();

  return await knex("shoutouts").insert({
    date: shoutout.date,
    message: shoutout.message,
    channel_name: shoutout.channel_name,
    shouter: shouter.id,
    shoutee: shoutee.id,
    company_value: companyValue.id,
  });
};
