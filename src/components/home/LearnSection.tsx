import desktopImage from "../../assets/Desktop.svg";
import SectionText from "./SectionText";

export default function LearnSection() {
  return (
    <section className="flex justify-center items-center">
        <SectionText
            width = {648}
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

        <div className="h-120">
            <img src={desktopImage} alt="Desktop Illustration" className="h-full object-fill" />
        </div>
    </section>
  )
}
