import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import Header from '../../components/Header'

import { Item } from '../../domain/entities'

import actions from './actions'
import './styles.css'

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([])
    const [states, setStates] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [formData, setFormData] = useState({
        name: '', email: '', whatsapp: ''
    })

    const [selectedState, setSelectedState] = useState<string>('0')
    const [selectedCity, setSelectedCity] = useState<string>('0')
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    const [selectedItems, setSelectedItems] = useState<Item[]>([])

    const history = useHistory()

    useEffect(() => {
        actions.getItems().then(newItems => {
            setItems(newItems)
        })
    
        actions.getStates().then(newStates => {
            setStates(newStates)
        })

        navigator.geolocation.getCurrentPosition(position => {
            setSelectedPosition([position.coords.latitude, position.coords.longitude])
        })
    }, [])

    useEffect(() => {
        actions.getCities(selectedState).then(newCities => {
            setCities(newCities)
        })
    }, [selectedState])

    function handleSelectedState(event: ChangeEvent<HTMLSelectElement>) {
        const state = event.target.value
        setSelectedState(state)
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setSelectedCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([ event.latlng.lat, event.latlng.lng ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSelectedItem(id: number) {
        const item = { id } as Item
        setSelectedItems([ ...actions.select(selectedItems, item) ])
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const { name, email, whatsapp } = formData
        const uf = selectedState
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems

        actions.save({ name, email, whatsapp, uf, city, latitude, longitude, items }).then(saved => {
            if (saved) {
                alert('Novo Ponto de Coleta salvo com sucesso!')
                history.push('/')
            } else {
                alert('Erro ao salvar o Ponto de Coleta, verifique os dados informados e tente novamente.')
            }
        })
    }

    return (
        <div id="page-create-point">
            
            <Header>
                <Link to="/">
                    <FiArrowLeft /> Voltar para Home
                </Link>
            </Header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do Ponto de Coleta</h1>
                
                <fieldset>
                    <legend> <h2>Dados</h2> </legend>
                    
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" name="email" id="email" onChange={handleInputChange} />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={selectedPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer
                            attribution="copy <a href='http://osm.org/copyright'>OpenSreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />

                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedState} onChange={handleSelectedState}>
                                <option value="0">Selecione um Estado</option>
                                {states.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li
                                key={item.id}
                                className={(actions.contains(selectedItems, item)) ? 'selected' : '' }
                                onClick={() => handleSelectedItem(item.id)}
                            >
                                <img src={item.imageUrl} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button className="submit">Cadastrar Ponto de Coleta</button>

            </form>

        </div>
    )
}

export default CreatePoint