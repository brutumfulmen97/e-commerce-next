import Image from "next/image";

export default function Product({
    name,
    description,
    image,
    features,
    price,
    currency,
}) {
    return (
        <main>
            <Image src={image} alt={name} width={200} height={200} />
            <h1 className="text-4xl">{name}</h1>
            {price / 100}
        </main>
    );
}
