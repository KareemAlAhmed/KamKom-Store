import "./Input.css";

const Input = ({
    type,
    name,
    placeholder,
    label,
    disabled,
    fullWidth,
    value,
    onChange,
    onBlur,
    multipleInput,
}) => {
    // console.log(placeholder);

    const isfullWidth = fullWidth ? " fullWidth" : null;
    const multipleIn = multipleInput ? "multiple" : "";
    return (
        <div className="inputContainer">
            <div className={isfullWidth ? "fulldiv" : "notfulldiv"}>
                <div className="labelContainer">
                    <label htmlFor={name} className="label">
                        {label}
                    </label>
                </div>

                {disabled ? (
                    <input
                        id={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className={`disabledInput ${isfullWidth}`}
                        readOnly
                    />
                ) : (
                    <input
                        id={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className={`input ${isfullWidth}`}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            </div>
        </div>
    );
};
export default Input;
