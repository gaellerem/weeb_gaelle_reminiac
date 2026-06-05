import { type FormEvent, useState } from "react"
import { sendContact } from "../api/client"
import { useToast } from "../hooks/useToast"

export default function ContactForm() {
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try {
            await sendContact({ first_name: firstName, last_name: lastName, email, subject, message })
            toast.success("Votre message a bien été envoyé !")
            setFirstName("")
            setLastName("")
            setEmail("")
            setSubject("")
            setMessage("")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-45 p-30 md:p-45 w-full max-w-200
                       bg-tertiary/10 rounded-3xl border-2 border-secondary text-2xl"
        >
            <div>
                <label htmlFor="lastname" className="sr-only">Nom</label>
                <input
                    id="lastname"
                    type="text"
                    placeholder="Nom"
                    className="input"
                    required
                    aria-required="true"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="firstname" className="sr-only">Prénom</label>
                <input
                    id="firstname"
                    type="text"
                    placeholder="Prénom"
                    className="input"
                    required
                    aria-required="true"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                    required
                    aria-required="true"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="subject" className="sr-only">Sujet</label>
                <input
                    id="subject"
                    type="text"
                    placeholder="Sujet"
                    className="input"
                    required
                    aria-required="true"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                />
            </div>

            <div className="md:col-span-2">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                    id="message"
                    placeholder="Message"
                    className="input"
                    required
                    aria-required="true"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
            </div>

            <div className="md:col-span-2 flex justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="secondary_button px-10 py-3 disabled:opacity-50"
                >
                    {loading ? "Envoi..." : "Envoyer"}
                </button>
            </div>
        </form>
    )
}