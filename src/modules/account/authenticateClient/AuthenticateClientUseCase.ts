import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}


export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Receber username, password

        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        // Verificar se username cadastrado

        if(!client) {
            throw new Error("Username or password invalid!");
        };


        // Verificar se senha corresponse ao username
        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!");
        };

        // Gerar o token

        const token = sign({ username }, "cc5e353434e02207089a9741b43fb8f4", {
            subject: client.id,
            expiresIn: "1d"
        })


        return token;
    }
}