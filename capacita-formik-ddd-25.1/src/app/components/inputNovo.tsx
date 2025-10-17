import { useField } from "formik";
import React from "react";

// Definimos as props que o componente aceitará.
// Usamos ...props para passar qualquer outra prop nativa do input (como placeholder, className, etc.)
interface InputLoginProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  
}

const InputLogin: React.FC<InputLoginProps> = ({ label, style, ...props }) => {
  // O hook useField conecta este input ao estado do Formik.
  // Ele retorna:
  // 1. field: contém props como name, value, onChange, onBlur.
  // 2. meta: contém o estado do campo, como touched (foi tocado?) e error (tem erro?).
  const [field, meta] = useField(props.name);

  const showError = meta.touched && meta.error;

  return (
    <div className="w-full flex flex-col items-center my-2 font-inter">
      <div className="w-[75%]">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          {...field} // Espalha as props do Formik (value, onChange, onBlur)
          {...props} // Espalha as props restantes (type, placeholder, etc.)
          className={`${style} rounded-md ${showError ? 'border-red-500' : 'border-borda-form'}`}
        />
        {/* Exibe a mensagem de erro APENAS se o campo foi tocado E tem um erro */}
        {showError ? (
          <div className="text-red-500 text-xs mt-1">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputLogin;