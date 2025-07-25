const { Customer,Transaction } = require("../models");

const {asyncWrapper} = require('../middlewares/asyncWrapper.middleware.js');

exports.getAllCustomers = asyncWrapper(async (req, res) => {
  const customers = await Customer.findAll({
    where: { fk_user_id: req.user.id }
     
  });
  return res.status(200).send(customers);
});


exports.createCustomer = asyncWrapper(async (req, res) => {
  const { name, phone_number, runningBalance = 0 } = req.body;

  if (!name || !phone_number) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  
  const customer = await Customer.create({
    fk_user_id: req.user.id, 
    name,
    phone_number,
    runningBalance,
  });

  // Create an opening balance transaction if runningBalance > 0
  if (runningBalance > 0) {
    await Transaction.create({
      fk_customer_id: customer.id,
      cashIn: runningBalance,
      cashOut: 0,
    });
  }


  return res.status(201).json({
    message: 'Customer created successfully.',
    customer,
  });
});


exports.deleteCustomer = asyncWrapper(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findOne({
    where: {
      id: customerId,
      fk_user_id: req.user.id
    }
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found!" });
  }
  await customer.destroy();
  res.status(200).json({ message: "Customer deleted successfully" });
});

exports.updateCustomer = asyncWrapper(async (req, res) => {
  const customerId = req.params.id;
  const { name, phone_number } = req.body;
  const customer = await Customer.findOne({
    where: {
      id: customerId,
      fk_user_id: req.user.id 
    }
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customer.name = name || customer.name;
  customer.phone_number = phone_number || customer.phone_number;

  await customer.save();
  res.status(200).json({ message: "Customer updated successfully", customer });
});

exports.getOneCustomer = asyncWrapper(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findOne({
    where: {
      id: customerId,
      fk_user_id: req.user.id,
    },
    include: {
      model: Transaction,
      as: 'transactions',
      order: [['createdAt', 'ASC']],
    }
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found or unauthorized" });
  }

  const sortedTransactions = [...customer.transactions].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  let balance = 0;
  const transactionsWithBalance = sortedTransactions.map((transaction) => {
    balance += transaction.cashIn - transaction.cashOut;

    return {
      ...transaction.toJSON(),
      remainingBalance: balance,
    };
  });

  const response = {
    ...customer.toJSON(),
    transactions: transactionsWithBalance,
  };
  return res.status(200).json(response);
});
