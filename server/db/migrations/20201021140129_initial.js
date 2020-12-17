exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.string('slack_handle');
      table.string('slack_id');
      table.timestamps(true, true);
      table.string('password');
      table.string('role');
      table.string('avatar');
      table.string('job_title');
    })
    .createTable('company_values', (table) => {
      table.increments('id').primary();
      table.string('value');
      table.text('description').defaultTo('Please add a description');
      table.boolean('active_status').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('shoutouts', (table) => {
      table.increments('id').primary();
      table.date('date');
      table.text('message');
      table.string('channel_name');
      table.integer('shoutee').unsigned();
      table.foreign('shoutee').references('users.id');
      table.integer('shouter').unsigned();
      table.foreign('shouter').references('users.id');
      table.integer('company_value').unsigned();
      table.foreign('company_value').references('company_values.id');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('shoutouts'),
    knex.schema.dropTable('company_values'),
    knex.schema.dropTable('users'),
  ]);
};
