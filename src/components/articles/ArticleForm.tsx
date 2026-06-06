import PageLayout from "../../pages/PageLayout"

interface ArticleFormProps {
    title: string
    content: string
    onTitleChange: (value: string) => void
    onContentChange: (value: string) => void
    onSubmit: () => void
    onCancel: () => void
    saving: boolean
    heading: string
    submitLabel: string
    savingLabel: string
}

export default function ArticleForm({
    title,
    content,
    onTitleChange,
    onContentChange,
    onSubmit,
    onCancel,
    saving,
    heading,
    submitLabel,
    savingLabel,
}: ArticleFormProps) {
    return (
        <PageLayout>
            <section className="flex flex-col gap-32 items-center">
                <button
                    onClick={onCancel}
                    className="self-start text-white/60 hover:text-white transition-colors"
                >
                    ← Retour
                </button>

                <div className="flex flex-col gap-24 max-w-3xl w-full">
                    <h1 className="text-4xl font-extrabold">{heading}</h1>

                    <div className="flex flex-col gap-8">
                        <label className="text-white/60 text-sm">Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => onTitleChange(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-20 py-12 text-white focus:outline-none focus:border-secondary transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-8">
                        <label className="text-white/60 text-sm">Contenu</label>
                        <textarea
                            value={content}
                            onChange={e => onContentChange(e.target.value)}
                            rows={16}
                            className="bg-white/5 border border-white/10 rounded-xl px-20 py-12 text-white focus:outline-none focus:border-secondary transition-colors resize-none"
                        />
                    </div>

                    <div className="flex gap-16 justify-end">
                        <button
                            onClick={onCancel}
                            className="btn btn-red py-2 px-5 text-white/60"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={saving}
                            className="btn btn-green py-2 px-5 disabled:opacity-50"
                        >
                            {saving ? savingLabel : submitLabel}
                        </button>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}