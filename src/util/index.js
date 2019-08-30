const getFieldLabelValue = (fieldData) => {
  try {
    if (!fieldData) {
      return;
    }
    const item = fieldData[0];
    if (typeof item === "object") {
      const keys = Object.keys(item);
      const fieldLabel = keys[0];
      const fieldValue = keys[1];
      return {
        fieldLabel,
        fieldValue
      };
    }
    return {
      fieldLabel: item,
      fieldValue: item
    };
  } catch (err) {
    throw err;
  }
};

export { getFieldLabelValue };
