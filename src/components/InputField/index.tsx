import React from "react";

interface IInputFieldProps {
  label: string;
  type: string;
  id: string;
  value?: string;
  errors?: any;
  register: any;
  onChange?: any;
}

const InputField = ({
  label,
  type,
  id,
  value,
  register,
  errors,
  onChange,
}: IInputFieldProps) => {
  return (
    <div className="mb-5 w-full">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <div className="mt-5 w-full">
        <input
          className="px-4 py-2 text-xl border w-full outline-none"
          type={type}
          id={id}
          defaultValue={value}
          {...register}
          onChange={onChange}
        />
      </div>
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default InputField;
