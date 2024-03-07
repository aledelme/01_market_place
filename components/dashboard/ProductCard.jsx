export function ProductCard({name, price}){
    return (
        <div className="border p-2 bg-cyan-900 w-min">
            <div className="border relative aspect-square h-40 bg-cyan-950">
                <p className="absolute inset-0 flex items-center justify-center transform -rotate-45 text-base">
                    {name}
                </p>
            </div>
            <div>{price} CMP</div>
        </div>
    )
}