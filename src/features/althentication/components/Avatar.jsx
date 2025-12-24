import blank from "../../../assets/blank.png"

export default function Avatar({ src, size = 2.5, alt = "user", onClick, className }) {
    return <img
        src={src || blank}
        alt={alt}
        style={{ wirth: `${size}rem`, height: `${size}rem` }}
        className={className || "rounded-full"}
        onClick={onClick}
    />

} 