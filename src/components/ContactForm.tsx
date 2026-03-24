export default function ContactForm() {
  return (
    <form className="grid grid-cols-2 gap-45 p-45 w-full max-w-200
                    bg-tertiary/10 rounded-3xl border-2 border-secondary">
        <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Nom"
            className="contact_input"
        />

        <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Prénom"
            className="contact_input"
        />

        <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="N° téléphone"
                className="contact_input"
        />

        <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="contact_input"
        />

        <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="contact_input col-span-2"
        />

        <div className="col-span-2 flex justify-center">
            <button type="submit" className="secondary_button w-29 h-11.75">
                Envoyer
            </button>
        </div>
    </form>
  )
}
