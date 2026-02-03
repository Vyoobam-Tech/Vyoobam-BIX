const AddButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      className={`btn add text-white d-flex align-items-center ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AddButton;
