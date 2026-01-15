import SectionText from "./SectionText"
import shapesImage from "../../assets/Shapes.svg";

export default function StayTunedSection() {
  return (
    <section className="flex justify-center items-center gap-110">
        <img src={shapesImage} alt="Shapes Illustration" />
        <SectionText
            width={800}
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