'use server'
import db from '../../temporal_db/db.json'
import fs from 'fs'

const DB = './temporal_db/db.json'

export async function fetchCompanyData (address){
    return db[address]
}

export async function fetchLastInvoices (address){
    const {products, invoices} = db[address]
    if(!invoices) return null
    return invoices
        .map(i => Object.assign(i, {product: products[i.product_id].name}))
        .reverse()
        .slice(undefined, 5)
}

export async function fetchAllProducts (search){
    let products = []
    for (const [, data] of Object.entries(db)) {
      products = products.concat(data.products)
    }

    if (search){
        const regex = new RegExp(search,"i")
        return products.filter(p => regex.test(p.name))
    } else {
        return products
    }
}

export async function registryCompany(address, name){
    db[address] = {name: name, products: [], invoices: []}
    fs.writeFileSync(DB, JSON.stringify(db, undefined, 4))
}

export async function uploadProduct(company, name, price){
    db[company].products.push({"name": name, "price": price})

    fs.writeFileSync(DB, JSON.stringify(db, undefined, 4))
}