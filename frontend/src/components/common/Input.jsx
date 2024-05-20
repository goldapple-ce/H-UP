export default function Input({
  id,
  name,
  className,
  type,
  placeholder,
  onChange,
}) {
  return (
    <input
      className={className}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
