const groupByUser = (data, entityKey) => {
  const formattedData = {};

  data.forEach((item) => {
    const { user_id, ...entityData } = item;

    if (!formattedData[user_id]) {
      formattedData[user_id] = { user_id, [entityKey]: [] };
    }

    formattedData[user_id][entityKey].push(entityData);
  });

  return Object.values(formattedData);
};

module.exports = groupByUser;
