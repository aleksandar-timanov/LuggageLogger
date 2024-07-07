export interface Trip {
    id: number
    destination: string
    departureDate: Date
    returnDate: Date
    luggageItems: Item[]
}

interface Item {
    id: number
    name: string
    price: number
    isTaken: boolean
    quantity: number
    category: string
}
