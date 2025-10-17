import { useField } from "formik";

interface InputTextProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  style?: string;
  errorEspecifico?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Inputs de texto do Formik
const InputText = ({
  label,
  style = "",
  errorEspecifico,
  onChange,
  ...props
}: InputTextProps) => {
  // Recebe o campo e os erros dele
  const [field, meta] = useField(props);

  return (
    <>
      
      <label className=" text-[#1E1E1E] font-inter font-bold text-lg w-[75%]">{label}</label>
      
      <input
        className={`text-input w-[70%] text-black mt-3 rounded-md ${style}`}
        {...field}
        {...props}
        onChange={(e) => {
          field.onChange(e);
          if (onChange) onChange(e);
        }}
      />
      <div className="flex flex-col justify-center w-[70%] mb-4 h-[20px] items-start text-start border-">
        {" "}
        {/* Container flex com quebra de linha e espaçamento */}
        {meta.touched && meta.error ? (
          <p className="error text-red-700 text-sm font-inter h-[10px]">{meta.error}</p>
        ) : null}
        {errorEspecifico ? (
          <p className="error text-red-700">{errorEspecifico}</p>
        ) : null}
      </div>
    </>
  );
};

export default InputText;