import { Toast } from "@base-ui/react/toast"

function ToastList() {
    const { toasts } = Toast.useToastManager()
    return (
        <>
            {toasts.map(toast => (
                <Toast.Root
                    key={toast.id}
                    toast={toast}
                    className={`rounded-xl border px-20 py-16 text-sm font-medium shadow-lg backdrop-blur-sm
                        ${toast.type === "success"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}
                >
                    <Toast.Title>{toast.title}</Toast.Title>
                </Toast.Root>
            ))}
        </>
    )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <Toast.Provider>
            {children}
            <Toast.Viewport className="fixed top-40 left-1/2 -translate-x-1/2 flex flex-col gap-12 z-50">
                <ToastList />
            </Toast.Viewport>
        </Toast.Provider>
    )
}