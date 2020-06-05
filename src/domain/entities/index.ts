
export interface Item {

    id: number
    title: string
    imageUrl: string
}

export interface Point {

    name: string
    email: string
    whatsapp: string
    uf: string
    city: string
    latitude: number
    longitude: number
    items: Item[]
    image: any
}