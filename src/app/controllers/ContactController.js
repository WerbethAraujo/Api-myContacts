const { v4 } = require("uuid");
const ContactsRepository = require("../Repositories/ContactsRepository");

class ContactController {
  async index(req, res) {
    const contacts = await ContactsRepository.findAll();
    res.json(contacts);
  }
  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ Error: "Contact not found" });
    }
    res.json(contact);
  }

  async store(req, res) {
    const { name, email, fone, category_id } = req.body;
    const emailExists = await ContactsRepository.findByEmail(email);

    if (!name) {
      return res.status(400).json({ Error: "Name is required" });
    }
    if (emailExists) {
      return res.status(400).json({ Error: "Email is already in use" });
    }
    const contact = await ContactsRepository.create({
      id: v4(),
      name,
      email,
      fone,
      category_id,
    });
    res.json(contact);
  }

  update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return res.status(404).json({ Error: "Contact not found" });
    }
    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
