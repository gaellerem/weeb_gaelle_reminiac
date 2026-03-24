import logoArtVenue from "../../assets/logo_artvenue.svg";
import logoSmartFinder from "../../assets/logo_smartfinder.svg";
import logoShells from "../../assets/logo_shells.svg";
import logoWaves from "../../assets/logo_waves.svg";
import logoZoomerr from "../../assets/logo_zoomerr.svg";

const partners = [
    { name: "SmartFinder", logo: logoSmartFinder, alt: "Logo SmartFinder" },
    { name: "Zoomerr", logo: logoZoomerr, alt: "Logo Zoomerr" },
    { name: "SHELLS", logo: logoShells, alt: "Logo Shells" },
    { name: "WAVES", logo: logoWaves, alt: "Logo Waves" },
    { name: "ArtVenue", logo: logoArtVenue, alt: "Logo ArtVenue" },
] as const

export default function TrustSection() {
    return (
        <section className="flex flex-col gap-32 lg:gap-80 items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-extrabold">
                Ils nous font confiance
            </h2>
            <ul className="flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-80">
            {partners.map((partner) => (
                <li key={partner.name} className="flex items-center justify-center gap-8 p-4">
                <img
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-24 md:h-32 w-auto"
                />
                <span className="text-xl md:text-2xl font-bold">{partner.name}</span>
                </li>
            ))}
            </ul>
        </section>
    )
}