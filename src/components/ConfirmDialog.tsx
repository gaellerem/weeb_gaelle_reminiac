import { Dialog } from "@base-ui/react/dialog"

interface ConfirmDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    danger?: boolean
}

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirmer",
    cancelLabel = "Annuler",
    danger = false,
}: ConfirmDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-40" />
                <Dialog.Popup className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary border border-white/10 rounded-xl p-32 flex flex-col gap-24 w-full max-w-md shadow-xl">
                    <Dialog.Title className="text-2xl font-bold">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="text-bluegray-400 text-sm">
                        {description}
                    </Dialog.Description>
                    <div className="flex gap-16 justify-end">
                        <button
                            onClick={onClose}
                            className="btn btn-border-white py-2 px-5"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            onClick={() => { onConfirm(); onClose() }}
                            className={`btn py-2 px-5 ${danger ? "btn-red" : ""}`}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}