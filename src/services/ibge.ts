import axios from 'axios'

class Service {

    private api = axios.create({
        baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
    })

    public async getStates(): Promise<any[]> {
        const response = await this.api.get('estados', { params: { orderBy: 'nome' } })
        return response.data
    }

    public async getCities(uf: string): Promise<any[]> {
        const response = await this.api.get(`estados/${uf}/municipios`)
        return response.data
    }

}

export default new Service()