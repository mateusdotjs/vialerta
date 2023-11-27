const Select = ({ options, setType, label, loading }) => {
  return (
    <>
      {label ? (
        <label
          htmlFor="select"
          className="mb-2 block text-lg font-semibold text-gray-950 md:text-xl"
        >
          {label}
        </label>
      ) : null}
      <select
        id="select"
        className="mb-2 block self-start rounded-md border-[1px] p-2 outline-none"
        onChange={({ target }) => setType(target.value)}
        disabled={loading}
      >
        {options.map((option) => {
          return (
            <option
              key={option.text}
              onClick={({ target }) => setType(target.value)}
              disabled={option.placeholder ? true : false}
              selected={option.placeholder ? true : false}
            >
              {option.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
