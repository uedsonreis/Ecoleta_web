import api from '../../services/api'
import ibge from '../../services/ibge'

import { Item } from '../../domain/entities'

class Actions {

    public async save(point: any): Promise<boolean> {
        point.image = "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
        console.log('Saving: ', point)

        const id = await api.savePoint(point)
        console.log('New Point created with ID ', id)
        return (id > 0)
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