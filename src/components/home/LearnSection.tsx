import desktopImage from "../../assets/Desktop.svg";
import SectionText from "./SectionText";

export default function LearnSection() {
  return (
    <section className="flex flex-col lg:flex-row justify-center items-center gap-32 lg:gap-80">
        <SectionText
            className="flex-2"
            caption="Des ressources pour tous les niveaux"
            headline={
                <>
                <span className="text-tertiary">Apprenez</span> et{" "}
                <span className="text-tertiary">progressez</span>
                </>
            }
            text="
                Que vous débutiez en développement web ou que vous soyez un expert
                cherchant à approfondir vos connaissances, nous vous proposons des tutoriels,
                guides et bonnes pratiques pour apprendre efficacement.
            "
            bottomLink={{ label: "Explorez les ressources", to: "/" }}
        />

        <div className="flex-3 w-full">
            <img src={desktopImage} alt="Illustration d'un bureau avec des éléments de développement web" className="lg:object-fill" />
        </div>
    </section>
  )
}
