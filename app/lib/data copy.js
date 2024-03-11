'use server'
import fs from 'fs'
import path from 'path'

const DB = path.join(__dirname, '../temporal_db.json')

export async function fetchCompanyData (address){
    const db = getDB()
    return db[address]
}

export async function fetchLastInvoices (address){
    const db = getDB()
    const {products, invoices} = db[address]
    if(!invoices) return null
    return invoices
        .map(i => Object.assign(i, {product: products[i.product_id].name}))
        .reverse()
        .slice(undefined, 5)
}

export async function fetchAllProducts (search){
    const db = getDB()
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
    const db = getDB()
    db[address] = {name: name, products: [], invoices: []}
    fs.writeFileSync(DB, JSON.stringify(db, undefined, 4))
}

export async function uploadProduct(company, name, price){
    const db = getDB()
    db[company].products.push({"name": name, "price": price})

    fs.writeFileSync(DB, JSON.stringify(db, undefined, 4))
}

function getDB(){
    if (!fs.existsSync(DB)) {
        fs.writeFileSync(DB,'{}')
    }
    const db = JSON.parse(fs.readFileSync(DB))
    return db
}