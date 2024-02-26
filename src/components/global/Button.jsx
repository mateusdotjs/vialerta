const Button = ({ children, css, ...props }) => {

  return (
    <button
      className={`rounded-md bg-gradient-to-b from-amber-400 to-amber-500 px-6 py-2 font-medium text-yellow-950
      transition-all hover:bg-gradient-to-b hover:from-amber-300 hover:to-amber-400
      disabled:bg-slate-300 disabled:bg-none disabled:font-normal disabled:text-gray-600 ${css ? css.join(' ') : null}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
