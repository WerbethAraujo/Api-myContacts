const contacts = [
  {
    id: 1,
    name: "Werbeth",
    email: "werbeth@gmail.com",
    category_id: 1,
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
