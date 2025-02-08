export function Input({ name, value, onChange, placeholder, type = "text", required = false }) {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded p-2 w-full"
      />
    );
  }
