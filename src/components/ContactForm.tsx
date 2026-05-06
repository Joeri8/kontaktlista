import { useState } from "react";
import type { Contact } from "../types/Contact";

type Props = {
  onSave: (contact: Omit<Contact, "id">) => void;
  editingContact: Contact | null;
  onCancelEdit: () => void;
};

export default function ContactForm({
  onSave,
  editingContact,
  onCancelEdit,
}: Props) {
  // Om man redigerar en kontakt fylls formuläret med den kontaktens data.
  // Annars börjar fälten tomma.
  const [name, setName] = useState(editingContact?.name ?? "");
  const [email, setEmail] = useState(editingContact?.email ?? "");
  const [phone, setPhone] = useState(editingContact?.phone ?? "");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validering så att användaren inte kan skicka tomma/konstiga värden.
    if (name.trim().length < 2) {
      setError("Namnet måste vara minst 2 tecken.");
      return;
    }

    if (!email.includes("@")) {
      setError("Ange en giltig e-postadress.");
      return;
    }

    if (phone.trim().length < 3) {
      setError("Telefonnummer måste fyllas i.");
      return;
    }

    onSave({
      name,
      email,
      phone,
      company: {
        name: "Eget företag",
      },
    });

    // Tömmer formuläret efter att man lagt till en ny kontakt.
    setName("");
    setEmail("");
    setPhone("");
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingContact ? "Redigera kontakt" : "Lägg till kontakt"}</h2>

      {error && <p className="error">{error}</p>}

      <label>
        Namn
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Exempel: Anna Andersson"
        />
      </label>

      <label>
        E-post
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="anna@mail.se"
        />
      </label>

      <label>
        Telefon
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="070-123 45 67"
        />
      </label>

      <div className="button-row">
        <button type="submit">
          {editingContact ? "Spara ändring" : "Lägg till"}
        </button>

        {editingContact && (
          <button type="button" className="secondary" onClick={onCancelEdit}>
            Avbryt
          </button>
        )}
      </div>
    </form>
  );
}