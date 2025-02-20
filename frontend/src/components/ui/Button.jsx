const Button = ({ children, onClick, className = "", variant = "primary" }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    };
  
    return (
      <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  