import { Link } from "react-router-dom";
import FooterColumn from "./FooterColumn";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
                <a href="#" className="jam_icon"><FaYoutube /></a>
                <a href="#" className="jam_icon"><FaFacebookF /></a>
                <a href="#" className="jam_icon"><FaTwitter /></a>
                <a href="#" className="jam_icon"><FaInstagram /></a>
                <a href="#" className="jam_icon"><FaLinkedin /></a>
            </div>
        </div>
    </footer>
  )
}