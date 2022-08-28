const ContactsRepository = require("../Repositories/ContactsRepository");

class ContactController {
  async index(req, res) {
    const contacts = await ContactsRepository.findAll();
    res.json(contacts);
  }
  show(req, res) {}

  store(req, res) {}

  update(req, res) {}

  delete(req, res) {}
}

module.exports = new ContactController();
