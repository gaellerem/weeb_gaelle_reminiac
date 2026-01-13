type FooterColumnProps = {
  title?: string
  links: string[]
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="flex flex-col w-full">
            {title && (
                <span className="text-bluegray-400 py-12">
                    {title}
                </span>
            )}

            <ul className="flex flex-col">
                {links.map((link, index) => (
                <li key={index} className="py-12">
                    <a href="#" className="hover_secondary">
                        {link}
                    </a>
                </li>
                ))}
            </ul>
        </div>
    )
}