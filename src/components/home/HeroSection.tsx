import { Link } from "react-router-dom"
import desktopImage from "../../assets/Desktop.svg";

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-32 lg:gap-80 items-center justify-center">
        <div className="flex flex-col gap-32 items-center text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold">
                Explorez le <span className="text-tertiary font-light">Web</span> sous toutes ses <span className="underline decoration-tertiary">facettes</span>
            </h1>
            <p className="max-w-162 text-lg leading-[1.6]">
                Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances,
                technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital,
                notre blog vous offre du contenu de qualité pour rester à la pointe.
            </p>
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <Link to="/blog" className="secondary_button hero_button">Découvrir les articles</Link>
                <Link to="/subscribe" className="transparent_button hero_button">S'abonner à la newsletter</Link>
            </div>
        </div>
        <img src={desktopImage} alt="Illustration d'un bureau avec des éléments web" className="w-full max-w-275" />
    </section>
  )
}