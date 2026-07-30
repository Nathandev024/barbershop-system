import { useState } from "react";
import { updateUser } from "../services/user.service";
import { Link } from "react-router-dom";

export function AlterarSenha() {
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeCurrentPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUser({
        currentPassword,
        password: password || undefined,
      });
      setMessage("Perfil atualizado com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar perfil");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h6>Digite sua senha atual</h6>
          <input
            type="password"
            placeholder="sua senha"
            onChange={handleChangeCurrentPassword}
          />
          <h6>Digite sua nova senha</h6>
          <input
            type="password"
            placeholder="nova senha"
            onChange={handleChangePassword}
          />
          <Link to={"/configuracao"}>Voltar</Link>
          <button>Confirmar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
