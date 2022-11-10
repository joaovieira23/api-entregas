import { prisma } from "../../../../database/prismaClient";


export class FindAllDeliveriesDeliverymanUseCase {
    async execute(id_deliveryman: string) {
        const deliverymans = await prisma.deliveryMan.findMany({
            where: {
                id: id_deliveryman,
            },
            select: {
                id: true,
                username: true,
                //@ts-ignore
                deliveries: true,
            },
        });

        return deliverymans;
    }
}