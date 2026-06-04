import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { FiMenu } from 'react-icons/fi'
import { useAuth } from "../contexts/AuthContext"

const navLinks = [
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog", end: true },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false)
                buttonRef.current?.focus()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            requestAnimationFrame(() => {
                const firstFocusable = menuRef.current?.querySelector<HTMLElement>('a, button')
                firstFocusable?.focus()
            })
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return (
        <nav className="md:py-24 md:px-80 px-20 bg-white-5 md:bg-transparent rounded-b-xl">
            <div className="w-full md:max-w-250 md:mx-auto md:bg-white-5 md:rounded-2xl p-24 md:shadow-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-38">
                        <NavLink to="/" className="brand" onClick={() => setIsOpen(false)}>
                            weeb
                        </NavLink>

                        <div className="hidden md:flex items-center gap-16">
                            {navLinks.map(({ to, label, end }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>`navlink hover_secondary ${isActive ? "text-secondary" : ""}`}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-16">
                        {user ? (
                            <>
                                <span className="font-semibold">
                                    {user.first_name ? `${user.first_name} ${user.last_name ?? ""}`.trim() : user.email}
                                </span>
                                <button type="button" onClick={handleLogout} className="secondary_button py-12 px-28">
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="secondary_button py-12 px-28">
                                Se connecter
                            </Link>
                        )}
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
                        <FiMenu className="text-xl" />
                    </button>
                </div>

                <div id="mobile-menu" className={`${isOpen ? "block" : "hidden"} md:hidden pt-24`} ref={menuRef}>
                    <div className="flex flex-col gap-16 border-t border-white/10 pt-24 items-end">
                        {navLinks.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) =>`navlink hover_secondary ${isActive ? "text-secondary" : ""}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </NavLink>
                        ))}

                        {user ? (
                            <div className="flex flex-col gap-12 items-end w-full">
                                <span className="font-semibold text-right">
                                    {user.first_name ? `${user.first_name} ${user.last_name ?? ""}`.trim() : user.email}
                                </span>
                                <button
                                    type="button"
                                    className="secondary_button py-12 px-28 w-fit"
                                    onClick={() => {
                                        setIsOpen(false)
                                        handleLogout()
                                    }}
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="secondary_button py-12 px-28 w-fit"
                                onClick={() => setIsOpen(false)}
                            >
                                Se connecter
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}