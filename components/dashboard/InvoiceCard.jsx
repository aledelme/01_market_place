export function InvoiceCard({date, customer, product, quantity, total}){
    return (
        <div className="border p-3 rounded-md bg-slate-700 grid gap-1">
            <div className=" rounded-xl font-bold bg-slate-800 p-1 px-3">{product}</div>
            <div className="font-thin">{date}</div>
            <div className="">Units: {quantity}</div>
            <div className="underline">Total: {total} CMP</div>
        </div>
    )
}