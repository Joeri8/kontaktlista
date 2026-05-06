import type { Contact } from "../types/Contact";

type Props = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
};

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
  return (
    <section className="contact-list">
      {contacts.map((contact) => (
        <article className="card" key={contact.id}>
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
          <p className="company">{contact.company?.name}</p>

          <div className="button-row">
            <button onClick={() => onEdit(contact)}>Redigera</button>

            <button className="danger" onClick={() => onDelete(contact.id)}>
              Ta bort
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}