import { Link } from "react-router-dom";
import FooterColumn from "./FooterColumn";

export default function Footer() {
  return (
    <footer className="px-80 bg-white text-primary border-t border-t-bluegray-300">
        <div className="flex gap-48 border-b border-b-bluegray-200 py-48">
            <div className="w-full">
                <Link to="/" className="brand block w-fit">weeb</Link>
            </div>
            <FooterColumn title="Produit" links={["Tarifs", "Aperçu", "Parcourir", "Accessibilité", "Fonctionnalités"]}/>
            <FooterColumn title="Solutions" links={["Brainstorming", "Idéation", "Wireframing", "Recherche"]}/>
            <FooterColumn title="Ressources" links={["Centre d'aide", "Blog", "Tutoriels"]}/>
            <FooterColumn title="Entreprise" links={["À propos", "Presse", "Événements", "Carrières"]}/>
        </div>
        <div className="flex gap-48 items-center py-48">
            <span className="w-full">@ 2025 Weeb, Inc. All rights reserved.</span>
            <div className="flex gap-16">
                <a href="#" className="jam_icon"><i className="jam jam-youtube" /></a>
                <a href="#" className="jam_icon"><i className="jam jam-facebook" /></a>
                <a href="#" className="jam_icon"><i className="jam jam-twitter" /></a>
                <a href="#" className="jam_icon"><i className="jam jam-instagram" /></a>
                <a href="#" className="jam_icon"><i className="jam jam-linkedin" /></a>
            </div>
        </div>
    </footer>
  )
}