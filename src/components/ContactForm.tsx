export default function ContactForm() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-45 p-30 md:p-45 w-full max-w-200
                    bg-tertiary/10 rounded-3xl border-2 border-secondary">
        <div>
            <label htmlFor="lastname" className="sr-only">Nom</label>
            <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Nom"
                className="contact_input"
                required
                aria-required="true"
            />
        </div>

        <div>
            <label htmlFor="firstname" className="sr-only">Prénom</label>
            <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Prénom"
                className="contact_input"
                required
                aria-required="true"
            />
        </div>

        <div>
            <label htmlFor="phone" className="sr-only">N° téléphone</label>
            <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="N° téléphone"
                    className="contact_input"
            />
        </div>

        <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="contact_input"
                required
                aria-required="true"
            />
        </div>

        <div className="md:col-span-2">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
                id="message"
                name="message"
                placeholder="Message"
                className="contact_input"
                required
                aria-required="true"
            />
        </div>

        <div className="md:col-span-2 flex justify-center">
            <button type="submit" className="secondary_button">
                Envoyer
            </button>
        </div>
    </form>
  )
}
