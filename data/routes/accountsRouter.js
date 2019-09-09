const express = require('express');

// Import Data
const db = require('../dbConfig.js');

const router = express.Router()

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error fetching the accounts." })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('accounts')
    .where({ id })
    .first()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error fetching this account." })
    });
});

router.post('/', (req, res) => {
  const AccountData = req.body;

  db('accounts')
    .insert(AccountData, 'id')
    .then(([id]) => {
      db('accounts')
        .where({ id })
        .first()
        .then(account => {
          res.status(201).json(account)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({error: "There was a problem creating this account." })
        });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `Successfully updated ${count} record(s)` })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was a problem editing this account." })
    });
});

router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `Successfully deleted ${count} record(s)` })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was a problem deleting this account." })
    });
});

module.exports = router;