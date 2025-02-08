export function Button({ children, type = "button", onClick }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {children}
      </button>
    );
  }
