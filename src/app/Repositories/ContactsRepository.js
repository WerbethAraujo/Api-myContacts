const { v4 } = require("uuid");

let contacts = [
  {
    id: v4(),
    name: "Werbeth",
    email: "werbeth@gmail.com",
    fone: "(94)991334455",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Maya",
    email: "maya@gmail.com",
    fone: "(94)999994455",
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
  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  create({ name, email, fone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        fone,
        category_id,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }
  update(id, { name, email, fone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        fone,
        category_id,
      };
      contacts = contacts.map((contact) => {
        return contact.id === id ? updatedContact : contact;
      });
      resolve(updatedContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
