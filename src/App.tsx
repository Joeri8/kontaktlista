import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import type { Contact } from "./types/Contact";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const [search, setSearch] = useState("");
  const [sortByName, setSortByName] = useState(true);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // GET: hämtar kontakter när appen startar.
  useEffect(() => {
    async function fetchContacts() {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Kunde inte hämta kontakter.");
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch {
        setApiError("Något gick fel när kontakterna skulle hämtas.");
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  async function handleSave(contactData: Omit<Contact, "id">) {
    if (editingContact) {
      await updateContact(contactData);
    } else {
      await createContact(contactData);
    }
  }

  // POST: skapar en ny kontakt.
  async function createContact(contactData: Omit<Contact, "id">) {
    try {
      setApiError("");

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(contactData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const newContact: Contact = await response.json();

      // JSONPlaceholder sparar inte på riktigt, därför lägger jag även in kontakten lokalt.
      setContacts([
        {
          ...newContact,
          id: Date.now(),
        },
        ...contacts,
      ]);
    } catch {
      setApiError("Kontakten kunde inte skapas.");
    }
  }

  // PATCH: uppdaterar en befintlig kontakt.
  async function updateContact(contactData: Omit<Contact, "id">) {
    if (!editingContact) return;

    try {
      setApiError("");

      const response = await fetch(`${API_URL}/${editingContact.id}`, {
        method: "PATCH",
        body: JSON.stringify(contactData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      setContacts(
        contacts.map((contact) =>
          contact.id === editingContact.id
            ? { ...contact, ...contactData }
            : contact
        )
      );

      setEditingContact(null);
    } catch {
      setApiError("Kontakten kunde inte uppdateras.");
    }
  }

  // DELETE: tar bort en kontakt.
  async function deleteContact(id: number) {
    const shouldDelete = confirm("Är du säker på att du vill ta bort kontakten?");

    if (!shouldDelete) return;

    try {
      setApiError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch {
      setApiError("Kontakten kunde inte tas bort.");
    }
  }

  // Filtrerar på sökord och sorterar listan A-Ö.
  const filteredContacts = useMemo(() => {
    const result = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortByName) {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [contacts, search, sortByName]);

  return (
    <main className="container">
      <header>
        <h1>Kontaktlista</h1>
        <p>
          Välkommen till din personliga kontaktlista! Här kan du lägga till, redigera och ta bort kontakter, samt söka och sortera dem efter namn. All data sparas lokalt i din webbläsare, så du behöver inte oroa dig för att förlora dina kontakter. Börja med att lägga till en ny kontakt genom formuläret nedan.
        </p>
      </header>

      {apiError && <p className="error">{apiError}</p>}

      <ContactForm
        key={editingContact?.id ?? "new"}
        editingContact={editingContact}
        onSave={handleSave}
        onCancelEdit={() => setEditingContact(null)}
      />

      <section className="toolbar">
        <input
          placeholder="Sök på namn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={sortByName}
            onChange={() => setSortByName(!sortByName)}
          />
          Sortera A-Ö
        </label>
      </section>

      {loading ? (
        <p>Laddar kontakter...</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          onEdit={setEditingContact}
          onDelete={deleteContact}
        />
      )}
    </main>
  );
}