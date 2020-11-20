const { db } = require('../dbConfig');

const valuesController = {
  getAllValues: async () => {
    return await db('company_values')
      .select()
      .then((values) => createRes(values));
  },
  updateValue: async (companyValue) => {
    return await db('company_values')
      .where({ value: companyValue.value })
      .update({ ...companyValue }, ['id']);
  },
};

const createRes = (values) => {
  return values.map(val => {
    return {
      active: val.active_status,
      description: val.description,
      value: val.value, 
    }
  });
};

module.exports = valuesController;
