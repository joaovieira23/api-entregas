import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}


export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // Receber username, password

        const deliveryman = await prisma.deliveryMan.findFirst({
            where: {
                username
            }
        });

        // Verificar se username cadastrado

        if(!deliveryman) {
            throw new Error("Username or password invalid!");
        };


        // Verificar se senha corresponse ao username
        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!");
        };

        // Gerar o token

        const token = sign({ username }, "cc5e353434e07707089a9741b43fb8f4", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })


        return token;
    }
}