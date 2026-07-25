import "dotenv/config";
import { app } from "./app.js";
const start = async () => {
    try {
        await app.listen({
            port: Number(process.env.PORT) || 4000,
            host: "0.0.0.0",
        });
        console.log("Servidor Conectado!");
    }
    catch (err) {
        if (err instanceof Error) {
            console.log({ message: err.message });
        }
        else {
            console.log("Erro ao tentar se conectar ao servidor!");
        }
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map