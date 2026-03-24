import SectionText from "./SectionText"
import shapesImage from "../../assets/Shapes.svg";

export default function StayTunedSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-32 lg:gap-80">
        <img src={shapesImage} alt="Illustration abstraite de formes géométriques représentant l'écosystème web" className="w-full max-w-120" />
        <SectionText
            className="flex-1"
            caption="Le web, un écosystème en constante évolution"
            headline={
                <>
                    Restez informé des dernières <span className="text-tertiary">tendances</span>
                </>
            }
            text="
                Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, 
                bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !
            "
            bottomLink={{ label: "Lire les articles récents", to: "/" }}
        />
    </section>
  )
}