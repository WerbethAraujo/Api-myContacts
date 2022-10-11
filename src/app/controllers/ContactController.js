const ContactsRepository = require('../repositories/ContactsRepository');

const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  // lista todos os contatos
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    res.json(contacts);
  }

  // busca um contato especifico
  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ Error: 'Contact id invalid' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ Error: 'Contact not found' });
    }
    res.json(contact);
  }

  // cria um novo contato
  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) {
      return res.status(400).json({ Error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      res.status(400).json({ Error: 'Category is invalid' });
    }

    if (email) {
      const emailExists = await ContactsRepository.findByEmail(email);
      if (emailExists) {
        return res.status(400).json({ Error: 'Email is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    res.json(contact);
  }

  // atualiza um contato
  async update(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ Error: 'Contact id invalid' });
    }

    if (category_id && !isValidUUID(category_id)) {
      res.status(400).json({ Error: 'Category is invalid' });
    }

    if (!name) {
      return res.status(400).json({ Error: 'Name is required' });
    }

    const contactExixtsId = await ContactsRepository.findById(id);
    if (!contactExixtsId) {
      return res.status(400).json({ Error: 'Contact not found' });
    }

    if (email) {
      const contactExistsEmail = await ContactsRepository.findByEmail(email);
      if (contactExistsEmail && contactExistsEmail.id !== id) {
        return res.status(400).json({ Error: 'Email is already in use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    res.json(contact);
  }

  // deleta um contato
  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ Error: 'Contact id invalid' });
    }

    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
