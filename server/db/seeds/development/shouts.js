exports.seed = async (knex) => {
  try {
    await knex('shoutouts').del();
    await knex('company_values').del();
    await knex('users').del();
    const valueA = await knex('company_values').insert(
      {
        value: 'ugliness',
      },
      'id',
    );
    const valueB = await knex('company_values').insert(
      {
        value: 'prettiness',
      },
      'id',
    );
    const userA = await knex('users').insert(
      {
        email: 'strangerDanger@getawayfrom.me',
        first_name: 'Grantholemew',
        last_name: 'Bundles',
        slack_handle: 'GBundlesInDaHouse',
        slack_id: 'GA3HASSD3GLN',
      },
      'id',
    );
    const userB = await knex('users').insert(
      {
        email: 'moonshiner@homemadefun.com',
        first_name: 'Gertrude',
        last_name: 'Whiskers',
        slack_handle: 'BringMommyHerBlanket',
        slack_id: 'CXKJLOKJ4JSHAKD9',
      },
      'id',
    );
    const shoutoutA = await knex('shoutouts').insert(
      {
        date: 'Mon Oct 31 2020',
        message:
          "Gertrude put glitter in my coffee this morning and I've been coughing it up for 2 hours",
        channel_name: 'general',
        shouter: userA[0],
        shoutee: userB[0],
        company_value: valueA[0],
      },
      'id',
    );
    return knex('shoutouts').insert(
      {
        date: 'Tues Nov 4 2020',
        message: "Mr. Bundles didn't yell at me today",
        channel_name: 'general',
        shouter: userB[0],
        shoutee: userA[0],
        company_value: valueB[0],
      },
      'id',
    );
  } catch (err) {
    console.error('Error seeding data: ' + err);
  }
};
