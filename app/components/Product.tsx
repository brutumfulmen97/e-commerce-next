import { ProductType } from "@/types/ProductType";
import { formatPrice } from "@/util/PriceFormat";
import Image from "next/image";

export default function Product({
    name,
    description,
    image,
    features,
    price,
    currency,
}: ProductType) {
    return (
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
                    {price !== null ? formatPrice(price) : "N/A"}
                </h2>
            </div>
        </div>
    );
}
