import path from "path";
import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const selectContacts = contacts.filter(contact => contactId === contact.id);
  return selectContacts || null;
}

async function removeContact(contactId) {
  const existContacts = await listContacts();
  const deleteContactIndex = existContacts.findIndex(contact => contact.id === contactId);
  if (deleteContactIndex === -1) {
    return null;
  }
  const deleteContact = existContacts.splice(deleteContactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(existContacts))
  return deleteContact;
}

async function addContact(name, email, phone) {
  const existContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  existContacts.push(newContact);
  console.log(newContact)
  //console.log(existContacts)
  //await fs.writeFile(contactsPath, JSON.stringify(existContacts));
  return newContact;
}


export {listContacts, getContactById, removeContact, addContact}