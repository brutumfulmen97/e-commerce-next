import { ProductType } from "@/types/ProductType";
import { formatPrice } from "@/util/PriceFormat";
import Image from "next/image";
import Link from "next/link";

export default function Product({
    id,
    name,
    description,
    image,
    features,
    unit_amount,
    currency,
}: ProductType) {
    return (
        <Link
            href={{
                pathname: `/product/${id}`,
                query: {
                    name,
                    description,
                    image,
                    features,
                    unit_amount,
                    id,
                    currency,
                },
            }}
        >
            <div className="text-gray-600">
                <Image
                    src={image}
                    alt={name}
                    width={800}
                    height={800}
                    className="w-full h-70 object-cover rounded-lg"
                />
                <div className="font-medium py-2">
                    <h1>{name}</h1>
                    <h2 className="text-sm text-teal-600">
                        {unit_amount !== null
                            ? formatPrice(unit_amount)
                            : "N/A"}
                    </h2>
                </div>
            </div>
        </Link>
    );
}
