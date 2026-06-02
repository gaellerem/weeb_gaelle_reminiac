import PageLayout from "./PageLayout"
import ContactForm from "../components/ContactForm"

export default function Contact() {
  return (
    <PageLayout>
      <section className="flex flex-col gap-80 text-center items-center">
        <div className="flex flex-col gap-32">
          <h1 className="text-7xl font-extrabold">
            Votre avis compte !
          </h1>
          <p className="max-w-212.5 text-lg leading-[1.6]">
            Votre retour est essentiel pour nous améliorer !
            Partagez votre expérience, dites-nous ce que vous aimez
            et ce que nous pourrions améliorer. Vos suggestions nous aident
            à faire de ce blog une ressource toujours plus utile et enrichissante.
          </p>
        </div>
        <ContactForm />
      </section>
    </PageLayout>
  )
}