const { v4 } = require("uuid");

let contacts = [
  {
    id: v4(),
    name: "Werbeth",
    email: "werbeth@gmail.com",
    telefone: "(94)991334455",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Maya",
    email: "maya@gmail.com",
    telefone: "(94)999994455",
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts.filter((contact) => contacts !== contact.id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
