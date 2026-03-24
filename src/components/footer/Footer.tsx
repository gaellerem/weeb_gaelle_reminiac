import { Link } from "react-router-dom";
import FooterColumn from "./FooterColumn";

export default function Footer() {
  return (
    <footer className="px-80 bg-white text-primary border-t border-t-bluegray-300">
        <div className="flex flex-col gap-48 border-b border-b-bluegray-200 py-48 md:flex-row">
            <div className="w-full">
                <Link to="/" className="brand block w-fit">weeb</Link>
            </div>
            <FooterColumn title="Produit" links={["Tarifs", "Aperçu", "Parcourir", "Accessibilité", "Fonctionnalités"]}/>
            <FooterColumn title="Solutions" links={["Brainstorming", "Idéation", "Wireframing", "Recherche"]}/>
            <FooterColumn title="Ressources" links={["Centre d'aide", "Blog", "Tutoriels"]}/>
            <FooterColumn title="Entreprise" links={["À propos", "Presse", "Événements", "Carrières"]}/>
        </div>
        <div className="flex flex-col gap-48 items-center py-48 md:flex-row">
            <span className="w-full">@ 2025 Weeb, Inc. All rights reserved.</span>
            <div className="flex gap-16">
                <a href="#" className="jam_icon" aria-label="YouTube">
                    <span className="sr-only">YouTube</span>
                    <i className="jam jam-youtube" aria-hidden />
                </a>
                <a href="#" className="jam_icon" aria-label="Facebook">
                    <span className="sr-only">Facebook</span>
                    <i className="jam jam-facebook" aria-hidden />
                </a>
                <a href="#" className="jam_icon" aria-label="Twitter">
                    <span className="sr-only">Twitter</span>
                    <i className="jam jam-twitter" aria-hidden />
                </a>
                <a href="#" className="jam_icon" aria-label="Instagram">
                    <span className="sr-only">Instagram</span>
                    <i className="jam jam-instagram" aria-hidden />
                </a>

                <a href="#" className="jam_icon" aria-label="LinkedIn">
                    <span className="sr-only">LinkedIn</span>
                    <i className="jam jam-linkedin" aria-hidden />
                </a>
            </div>
        </div>
    </footer>
  )
}