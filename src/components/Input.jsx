import Error from "./Error";

const Input = ({
  name,
  type,
  placeholder,
  css,
  onChange,
  value,
  error,
  onBlur,
}) => {
  return (
    <div className={`flex w-full flex-col ${css ? css.join(" ") : null}`}>
      <label className="mb-1 font-medium text-gray-900" htmlFor={name}>
        {name}
      </label>
      <input
        className={`h-10 rounded-md border-[1px] bg-gray-100 pl-2 outline-none
         placeholder:text-gray-400 focus:border-[2px] focus:border-amber-500 focus:bg-transparent 
         ${error ? "border-red-600" : "border-gray-200"}`}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        autoComplete="on"
      />
      {error && <Error error={error} />}
    </div>
  );
};

export default Input;
