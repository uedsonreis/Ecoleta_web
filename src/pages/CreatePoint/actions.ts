import api from '../../services/api'
import ibge from '../../services/ibge'

import { Item, Point } from '../../domain/entities'

class Actions {

    public async save(point: Point): Promise<boolean> {
        const data = new FormData()

        const stringItems = point.items.map(i => i.id).toString()

        data.append('name', point.name)
        data.append('email', point.email)
        data.append('whatsapp', point.whatsapp)
        data.append('latitude', String(point.latitude))
        data.append('longitude', String(point.longitude))
        data.append('uf', point.uf)
        data.append('city', point.city)
        data.append('items', stringItems)
        data.append('image', point.image)

        console.log('Saving: ', point)

        const result: { id: number } = await api.savePoint(data)
        console.log('New Point created with ID ', result)
        return (result.id > 0)
    }

    public async getItems(): Promise<Item[]> {
        return await api.getItems()
    }

    public async getStates(): Promise<string[]> {
        const states = await ibge.getStates()
        return states.map(uf => uf.sigla)
    }

    public async getCities(uf: string): Promise<string[]> {
        const cities = await ibge.getCities(uf)
        return cities.map(c => c.nome)
    }

    public contains(list: Item[], item: Item): boolean {
        return list.find(i => i.id === item.id) !== undefined
    }

    public select(list: Item[], item: Item): Item[] {
        if (this.contains(list, item)) {
            return list.filter(i => i.id !== item.id)
        } else {
            return [ ...list, item ]
        }
    }

}

export default new Actions()