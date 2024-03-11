'use server'
import { sql } from "@vercel/postgres";
import moment from "moment";


export async function fetchCompanyData (address){    
    const {rows: companyInfo, rowCount} = await sql`
        SELECT 
            companies.company_name AS name
        FROM companies
        WHERE company_address = ${address}`

    if (!rowCount) return null

    const {rows: products} = await sql`
        SELECT 
            product_name AS name,
            price
        FROM products
        WHERE company_address = ${address}`
    
    const company = {
        name: companyInfo[0].name,
        products: products
    }
    
    return company
}

export async function fetchLastInvoices (address){
    const { rows: invoices } = await sql`
        SELECT
            invoices.date,
            invoices.client_address AS customer,
            products.product_name AS product,
            invoices.units,
            invoices.total
        FROM invoices 
        INNER JOIN products ON products.product_id = invoices.product_id
        WHERE products.company_address = ${address}`

    return invoices
}

export async function fetchAllProducts (search){
    const { rows: products} = await sql`
        SELECT
            product_id,
            product_name AS name,
            price
        FROM products WHERE product_name ILIKE ${`%${search ? search : ''}%`}`

    return products
}

export async function registryCompany(address, name){
    await sql`
        INSERT INTO companies (company_name, company_address) 
        VALUES(${name}, ${address})`
}

export async function uploadProduct(company, name, price){
    await sql`
        INSERT INTO products (product_name, company_address, price) 
        VALUES(${name}, ${company}, ${price})`
}

export async function buyProduct(customer, product_id, units, total){
    await sql`
        INSERT INTO invoices (product_id, client_address, units, total, date) 
        VALUES(${product_id}, ${customer}, ${units}, ${total}, ${moment().format('YYYY-MM-DD HH:mm:ss')})`
}
