import { Toast } from "@base-ui/react/toast"

export function useToast() {
    const manager = Toast.useToastManager()

    return {
        success: (message: string) =>
            manager.add({ title: message, type: "success", timeout: 4000 }),
        error: (message: string) =>
            manager.add({ title: message, type: "error", timeout: 4000 }),
    }
}