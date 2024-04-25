import { Link } from "react-router-dom";
import { useState } from "react";

import useLoginForm from "../../hooks/useProductForm";

import InputField from "../InputField";

function ModalProductCreate() {
  const { handleSubmit, register, formState, reset, watch } = useLoginForm();
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="model">
      <form
        onSubmit={handleSubmit((data) => {
          if (data) {
            console.log(data);
            console.log(selectedFile);
            reset();
          }
        })}
      >
        <InputField
          label="Name"
          type="text"
          id="name"
          register={register}
          error={formState.errors.name?.message}
        />

        <InputField
          label="Images"
          type="file"
          id="img"
          register={register}
          onChange={(e: any) => setSelectedFile(e.target.files[0])}
        />

        <div className="form__item">
          <label htmlFor="email">email</label>
          <input {...register("email")} id="email" type="email" />
          <span style={{ color: "red" }}>
            {formState.errors.email?.message}
          </span>
        </div>

        <InputField
          label="Ingredients"
          type="text"
          id="ingredients"
          register={register}
          error={formState.errors.ingredients?.message}
        />
        <div className="form__item">
          <label htmlFor="password">Password</label>
          <input {...register("password")} id="password" type="password" />
          <span style={{ color: "red" }}>
            {formState.errors.password?.message}
          </span>
        </div>

        <div className="form__item">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
          />
          <span style={{ color: "red" }}>
            {formState.errors.password?.message}
          </span>
        </div>

        <div className="btn">
          <button className="save" type="submit">
            Login
          </button>
        </div>
      </form>
      <p>
        You have an account yet. <Link to="/login">Login</Link> here.
      </p>
    </div>
  );
}

export default ModalProductCreate;
