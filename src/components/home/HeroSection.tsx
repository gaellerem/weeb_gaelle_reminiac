import { Link } from "react-router-dom"
import desktopImage from "../../assets/Desktop.svg";

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-80 items-center justify-center">
        <div className="flex flex-col gap-32 items-center text-center">
            <h1 className="text-7xl font-extrabold">
                Explorez le <span className="text-lilac font-light">Web</span> sous toutes ses <span className="underline decoration-lilac">facettes</span>
            </h1>
            <p className="max-w-208.5 text-lg">
                Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances,
                technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital,
                notre blog vous offre du contenu de qualité pour rester à la pointe.
            </p>
            <div className="flex gap-16">
                <Link to="/" className="secondary_button hero_button w-[237px]">Découvrir les articles</Link>
                <Link to="/" className="transparent_button hero_button w-66.5">S'abonner à la newsletter</Link>
            </div>
        </div>
        <img src={desktopImage} alt="Hero Illustration" className="w-275" />
    </section>
  )
}