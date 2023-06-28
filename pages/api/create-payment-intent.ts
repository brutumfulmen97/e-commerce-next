import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AddCartType } from "@/types/AddCartType";
import { ProductType } from "@/types/ProductType";
import { prisma } from "@/util/PrismaClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: AddCartType[]) => {
    const total = items.reduce((acc, item) => {
        return acc + item.unit_amount * item.quantity!;
    }, 0);
    return total;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //get the user
    const userSession = await getServerSession(req, res, authOptions);
    if (!userSession) {
        res.status(403).json({ message: "Not logged in" });
        return;
    }
    //extract data from the body
    const { items, payment_intent_id } = req.body;
    console.log(items, payment_intent_id);

    //data necessary to checkout
    const orderData = {
        user: { connect: { id: userSession.user?.id } },
        amount: calculateOrderAmount(items),
        currency: "usd",
        status: "pending",
        paymentIntentId: payment_intent_id,
        products: {
            create: items.map((item: any) => ({
                name: item.name,
                description: item.description || null,
                unit_amount: parseFloat(item.unit_amount),
                image: item.image,
                quantity: item.quantity,
            })),
        },
    };

    //check if the payment intent exists
    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(
            payment_intent_id
        );
        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                { amount: calculateOrderAmount(items) }
            );
            //fetch order with product ids
            const existingOrder = await prisma.order.findFirst({
                where: { paymentIntentId: updated_intent.id },
                include: { products: true },
            });
            if (!existingOrder) {
                res.status(400).json({ message: "Invalid payment intent" });
            }

            //update the order
            const updatedOrder = await prisma.order.update({
                where: { id: existingOrder?.id },
                data: {
                    amount: calculateOrderAmount(items),
                    products: {
                        deleteMany: {},
                        create: items.map((item: any) => ({
                            name: item.name,
                            description: item.description || null,
                            unit_amount: parseFloat(item.unit_amount),
                            image: item.image,
                            quantity: item.quantity,
                        })),
                    },
                },
            });
            res.status(200).json({ paymentIntent: updated_intent });
            return;
        }
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        orderData.paymentIntentId = paymentIntent.id;
        const newOrder = await prisma.order.create({
            data: orderData,
        });
        res.status(200).json({ paymentIntent });
        return;
    }
}
