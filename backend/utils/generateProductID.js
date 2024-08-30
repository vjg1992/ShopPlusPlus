const CounterModel = require('./counterModel');

const getNextSequence = async (category) => {
  const counter = await CounterModel.findOneAndUpdate(
    { category },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence;
};

const generateProductID = async (category) => {
  const seq = await getNextSequence(category);
  const prefix = category.substring(0, 2).toUpperCase() + category.substring(category.length - 2).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  const formattedSeq = seq.toString().padStart(4, '0');
  return `${prefix}${year}${formattedSeq}`;
};

module.exports = generateProductID;
