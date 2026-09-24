interface InputProps {
    placeholder: string;
    className: string;
}

export default function TextInput({ placeholder, className }: InputProps) {
    return (
        <input
            placeholder={placeholder}
            className={className}>
        </input>
    );
}