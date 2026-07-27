import { updateUser } from "../services/user.service";
import { useState } from "react";

export default function MeuPerfil() {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setName("");
  };

  const handleChangeTelephone = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTelephone(event.target.value);
  };

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
        name: name || undefined,
        telephone: telephone || undefined,
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
          <h6>Nome</h6>
          <input
            type="text"
            placeholder="novo nome"
            onChange={handleChangeName}
          />

          <h6>Telefone</h6>
          <input
            type="tel"
            placeholder="novo telefone"
            onChange={handleChangeTelephone}
          />

          <h6>Senha</h6>
          <input
            type="password"
            placeholder="sua senha"
            onChange={handleChangeCurrentPassword}
          />
          <h6>Nova senha</h6>
          <input
            type="password"
            placeholder="nova senha"
            onChange={handleChangePassword}
          />

          <button>Confirmar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
