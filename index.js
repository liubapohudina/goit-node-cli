 import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();


// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await listContacts();
          console.table(contacts)
      break;

    case "get":
          const selectContacts = await getContactById(id);
          console.log(selectContacts);
      break;

    case "add":
          const newContact = await addContact(name, email, phone);
          console.log(newContact);
      break;

    case "remove":
          const deleteContact = await removeContact(id);
          console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

