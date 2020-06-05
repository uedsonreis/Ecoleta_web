import axios from 'axios'

import { Item } from '../domain/entities'

class Service {

    private api = axios.create({
        baseURL: 'http://localhost:3333/'
    })

    public async getItems(): Promise<Item[]> {
        const response = await this.api.get('items')
        return response.data
    }

    public async savePoint(point: any): Promise<{ id: number}> {
        const response = await this.api.post('points', point)
        return response.data
    }

}

export default new Service()