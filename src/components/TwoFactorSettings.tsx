import { useState, type FormEvent } from "react"
import {
    confirmTwoFactor,
    disableTwoFactor,
    setupTwoFactor,
    type TwoFactorSetupResponse,
} from "../api/client"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../hooks/useToast"

export default function TwoFactorSettings() {
    const { user, updateUser } = useAuth()
    const toast = useToast()
    const [setup, setSetup] = useState<TwoFactorSetupResponse | null>(null)
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [code, setCode] = useState("")
    const [busy, setBusy] = useState(false)

    const handleSetup = async () => {
        setBusy(true)
        try {
            const result = await setupTwoFactor()
            setSetup(result)
            setCode("")
            try {
                const { toDataURL } = await import("qrcode")
                setQrCode(await toDataURL(result.provisioning_uri, { width: 240, margin: 1 }))
            } catch {
                toast.error("Le QR code n'a pas pu être généré. Utilisez la clé affichée ci-dessous.")
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Impossible d'initialiser la double authentification.")
        } finally {
            setBusy(false)
        }
    }

    const handleConfirm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!setup || !/^\d{6}$/.test(code)) return

        setBusy(true)
        try {
            const response = await confirmTwoFactor(code)
            updateUser(response.user)
            setSetup(null)
            setQrCode(null)
            setCode("")
            toast.success(response.message)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Impossible d'activer la double authentification.")
        } finally {
            setBusy(false)
        }
    }

    const handleDisable = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!/^\d{6}$/.test(code)) return

        setBusy(true)
        try {
            const response = await disableTwoFactor(code)
            updateUser(response.user)
            setCode("")
            toast.success(response.message)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Impossible de désactiver la double authentification.")
        } finally {
            setBusy(false)
        }
    }

    return (
        <section className="bg-white/5 border border-white/10 rounded-xl p-32 flex flex-col gap-16">
            <div className="flex flex-col gap-8">
                <h2 className="text-xl font-bold">Double authentification</h2>
                <p className="text-sm text-white/60">
                    {user?.is_two_factor_enabled
                        ? "Votre compte demande un code de votre application à chaque connexion."
                        : "Ajoutez une vérification par code avec une application d'authentification."}
                </p>
            </div>

            {user?.is_two_factor_enabled ? (
                <form className="flex flex-col gap-12 items-start" onSubmit={handleDisable}>
                    <label className="flex flex-col gap-8 w-full max-w-sm">
                        <span className="text-sm text-white/70">Code de votre application</span>
                        <input
                            className="input"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="[0-9]{6}"
                            maxLength={6}
                            required
                            value={code}
                            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                        />
                    </label>
                    <button className="secondary_button px-5 py-3" type="submit" disabled={busy}>
                        {busy ? "Désactivation..." : "Désactiver la 2FA"}
                    </button>
                </form>
            ) : setup ? (
                <form className="flex flex-col gap-16 items-start" onSubmit={handleConfirm}>
                    <p className="text-sm text-white/70">
                        Scannez ce QR code avec Google Authenticator, Microsoft Authenticator, 1Password ou Authy.
                        Vous pouvez aussi saisir manuellement la clé ci-dessous.
                    </p>
                    {qrCode && (
                        <img
                            src={qrCode}
                            alt="QR code de configuration de la double authentification"
                            className="rounded-lg bg-white p-3"
                            width={240}
                            height={240}
                        />
                    )}
                    <div className="flex flex-col gap-8">
                        <span className="text-sm text-white/70">Clé de configuration (à garder secrète)</span>
                        <code className="break-all rounded bg-black/20 p-3 text-sm">{setup.secret}</code>
                    </div>
                    <label className="flex flex-col gap-8 w-full max-w-sm">
                        <span className="text-sm text-white/70">Saisissez le code à 6 chiffres de l'application</span>
                        <input
                            className="input"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="[0-9]{6}"
                            maxLength={6}
                            required
                            value={code}
                            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                        />
                    </label>
                    <button className="secondary_button px-5 py-3" type="submit" disabled={busy}>
                        {busy ? "Vérification..." : "Confirmer et activer"}
                    </button>
                </form>
            ) : (
                <button className="secondary_button px-5 py-3 self-start" type="button" onClick={handleSetup} disabled={busy}>
                    {busy ? "Préparation..." : "Configurer la 2FA"}
                </button>
            )}
        </section>
    )
}
