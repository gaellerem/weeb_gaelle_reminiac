import { Link } from "react-router-dom"
import { FiArrowRight } from 'react-icons/fi'

type SectionTextProps = {
  width?: number | "fill"
  caption: string
  headline: React.ReactNode
  text: string
  bottomLink: {
    label: string,
    to: string
  }
}

export default function SectionText({
  width = "fill",
  caption,
  headline,
  text,
  bottomLink
}: SectionTextProps) {

  return (
    <div 
      className="flex flex-col gap-32" 
      style={width === "fill"? undefined : {width}}
    >
        <div className="flex flex-col gap-16">
            <p className="text-xl font-bold uppercase tracking-3">
                {caption}
            </p>
            <h2 className="text-7xl font-extrabold">
                {headline}
            </h2>
        </div>

        <p className="text-lg leading-[1.6]">
            {text}
        </p>
        <div className="flex items-center py-16">
            <p className="text-xl font-medium leading-24 pr-16 tracking-[0.5px]">
                {bottomLink.label}
            </p>
            <Link to={bottomLink.to} className="jam_icon"><FiArrowRight /></Link>
        </div>
    </div>
  )
}
