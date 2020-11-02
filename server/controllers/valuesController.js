const { db } = require('../dbConfig');

const valuesController = {
  updateValue: async (companyValue) => {
    return await db('company_values')
      .where({ value: companyValue.value })
      .update({ ...companyValue }, ['id']);
  },
};

module.exports = valuesController;
