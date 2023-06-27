import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { formatPrice } from "@/util/PriceFormat";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";

const fetchOrders = async () => {
    const prisma = new PrismaClient();
    const user = await getServerSession(authOptions);

    if (!user) {
        return null;
    }

    //find all orders for user
    const orders = await prisma.order.findMany({
        where: { userId: user?.user?.id },
        include: { products: true },
    });
    return orders;
};

export const revalidate = 0;

export default async function Dashboard() {
    const orders = await fetchOrders();
    if (orders === null)
        return <div>You need to be logged in to view your orders</div>;
    if (orders.length === 0) {
        return <div>No orders placed</div>;
    }

    console.log(orders.map((order) => new Date(order.createdDate)));
    return (
        <div>
            <h1 className="text-bold">Your Orders</h1>
            <div className="font-medium">
                {orders.map((order) => (
                    <div className="rounded-lg p-8 my-12" key={order.id}>
                        <h2>Order reference: {order.id}</h2>
                        <p>Time: {order.createdDate.toDateString()}</p>
                        <p className="text-md py-2">
                            Status{" "}
                            <span
                                className={`${
                                    order.status === "complete"
                                        ? "bg-teal-500"
                                        : "bg-orange-500"
                                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
                            >
                                {order.status}
                            </span>
                        </p>
                        <p className="font-medium">
                            Total: {formatPrice(order.amount)}
                        </p>
                        <div className="flex gap-8">
                            {order.products.map((product) => (
                                <div className="py-2" key={product.id}>
                                    <h2 className="py-2">{product.name}</h2>
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={product.image!}
                                            alt={product.name}
                                            width={36}
                                            height={36}
                                        />
                                        <p>
                                            {formatPrice(product.unit_amount)}
                                        </p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
