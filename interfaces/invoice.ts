export type InvoiceStatus = "paid" | "partial" | "overdue" | "draft"

export interface InvoiceData {
    id :string
    invoiceNumber : string //>>> how string
    date : string
    customerName : string
    total : number
    paid : number 
    remaining : number
    status : InvoiceStatus
}