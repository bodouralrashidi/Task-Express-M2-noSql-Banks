let Accounts = require("../../db/Models/Accounts");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Accounts.findById(accountId);
    if (foundAccount) {
      await foundAccount.remove();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  }catch (err) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;

  try {
    const foundAccount = await Accounts.findById(accountId);
    if (foundAccount) {
      await Accounts.findByIdAndUpdate(accountId, req.body, { new: true });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const account = await Accounts.find();
    console.log("account", account);
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = Accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
