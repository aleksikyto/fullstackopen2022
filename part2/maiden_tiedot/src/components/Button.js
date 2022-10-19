const Button = ({ handleClick, name }) => {
  return (
    <button
      onClick={() => {
        handleClick(name);
      }}
    >
      show
    </button>
  );
};

export default Button;
