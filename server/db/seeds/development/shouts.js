const seedData = require('../../mockData/seedData');

const createUser = async (knex, user) => {
  await knex('users').insert(
    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      slack_handle: user.slack_handle,
      slack_id: user.slack_id,
    }
  );
};

const createValue = async (knex, companyValue) => {
  await knex('company_values').insert(
    {
      value: companyValue.value
    });
};

const createShoutout = async (knex, shoutout) => {
  let shouter = await knex('users').where('id', shoutout.shouter ).first()
  let shoutee = await knex('users').where('id', shoutout.shoutee).first();
  let companyValue = await knex('company_values')
    .where('id', shoutout.company_value)
    .first()
    console.log(shouter);
  await knex('shoutouts').insert({
    date: shoutout.date, 
    message: shoutout.message, 
    channel_name: shoutout.channel_name, 
    shouter: shouter,
    shoutee: shoutee,
    company_value: companyValue.id,
  });
};
    
exports.seed = async (knex) => {
  try {
    await knex('shoutouts').del();
    await knex('company_values').del();
    await knex('users').del();
    
    let userPromises = seedData.users.map(user => {
      return createUser(knex, user);
    });
  
    let valuePromises = seedData.company_values.map(companyValue => {
      return createValue(knex, companyValue);
    });

    let shoutoutPromises = seedData.shoutouts.map(shoutout => {
      return createShoutout(knex, shoutout);
    });
    
    return Promise.all(shoutoutPromises);

  } catch (err) {
    console.error('Error seeding data: ' + err);
  };
};
