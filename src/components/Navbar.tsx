import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const firstLinkRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
            setIsOpen(false)
            buttonRef.current?.focus()
        }
        }

        if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
        // Focus the first link when menu opens
        setTimeout(() => firstLinkRef.current?.focus(), 100)
        } else {
        document.removeEventListener('keydown', handleKeyDown)
        }

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <nav className="md:py-24 md:px-80 px-20 bg-white-5 md:bg-transparent rounded-b-xl">
            <div className="w-full md:max-w-250 md:mx-auto md:bg-white-5 md:rounded-2xl p-24 md:shadow-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-38">
                        <Link to="/" className="brand" onClick={() => setIsOpen(false)}>
                            weeb
                        </Link>

                        <div className="hidden md:flex items-center gap-16">
                            <Link to="/contact" className="navlink hover_secondary">
                                Contact
                            </Link>
                            <Link to="/blog" className="navlink hover_secondary">Blog</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-16">
                        <Link to="/login" className="secondary_button py-12 px-28">
                            Se connecter
                        </Link>
                    </div>

                    <button
                        type="button"
                        ref={buttonRef}
                        className="md:hidden secondary_button"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">{isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
                        <i className={`jam ${isOpen ? "jam-close" : "jam-align-justify"} text-5xl`} />
                    </button>
                </div>

                <div id="mobile-menu" className={`${isOpen ? "block" : "hidden"} md:hidden pt-24`}>
                    <div className="flex flex-col gap-16 border-t border-white/10 pt-24 items-end">
                        <Link
                            ref={firstLinkRef}
                            to="/contact"
                            className="navlink hover_secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>

                        <Link
                            to="/login"
                            className="secondary_button py-12 px-28 w-fit"
                            onClick={() => setIsOpen(false)}
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}