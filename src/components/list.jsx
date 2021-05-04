import React from "react";
import Train from './train'
import ItemList from './item-list'

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            date: "",
            dateFilter: "",
            distance: 0,
            distanceFilterMin: 0,
            distanceFilterMax: 9999,
            typeTrainFilter: "Не выбрано",
        }
        this.del = this.del.bind(this);
    }

    add(event) {
        event.preventDefault();
        let sel = document.getElementById("listTypes");
        let val = sel.options[sel.selectedIndex].value;
        let correctData = true;
        if (this.state.date == "") {
            document.getElementById("date").style.backgroundColor = 'red';
            correctData = false;
        } else {
            document.getElementById("date").style.backgroundColor = 'white';
        }
        if (this.state.distance <= 0) {
            document.getElementById("distance").style.backgroundColor = 'red';
            correctData = false;
        } else {
            document.getElementById("distance").style.backgroundColor = 'white';
        }
        if (correctData == true) {
            this.setState({elements: ([...this.state.elements, new Train(this.state.date, val, this.state.distance)])});
        }
    }

    del(i) {
        this.setState(state => ({
            elements: this.state.elements.filter((el, index) => index !== i)
        }))
    }

    reset(event) {
        event.preventDefault();
        this.setState({distanceFilterMin: 0})
        this.setState({distanceFilterMax: 9999})
        this.setState({typeTrainFilter: "Не выбрано"})
        let select = document.querySelector('#listTypesFilter');
        document.querySelector('#btnReset').addEventListener('click', function () {
            // по значению
            select.value = "Не выбрано";
        });
    }

    render() {
        return (
            <div className="container">
                <form>
                    <h2 className="titleFilter">Тренировки</h2>
                    <input type="date" name="date" id="date" value={this.state.date}
                           onChange={(e) => this.setState({date: e.target.value})}/>
                    <select id="listTypes">
                        <option value="Бег">Бег</option>
                        <option value="Велосипеп">Велосипеп</option>
                        <option value="Ходьба">Ходьба</option>
                    </select>
                    <input placeholder="Введите расстояние в км" type="number" name="date3" id="distance" min="0"
                           value={this.state.distance} onChange={(e) => this.setState({distance: e.target.value})}/>
                    <input type="submit" onClick={(e) => this.add(e)} value="Добавить"/>
                    <ItemList
                        elements={this.state.elements}
                        onDelete={this.del}
                        distanceFilterMin={parseInt(this.state.distanceFilterMin)}
                        distanceFilterMax={parseInt(this.state.distanceFilterMax)}
                        typeTrainFilter={this.state.typeTrainFilter}
                    />
                </form>
                <form>
                    <div className="filter">
                        <div className="containerFilter">
                            <h2 className="titleFilter">Фильтр</h2>
                            <div className="filterBlock">
                                <h5>Минимальное расстояние</h5>
                                <input placeholder="Минимальное расстояние в км" type="number"
                                       name="numberFilterNameMin" id="distanceFilterMin" min="0"
                                       value={this.state.distanceFilterMin}
                                       onChange={(e) => this.setState({distanceFilterMin: e.target.value})}/>
                            </div>

                            <div className="filterBlock">
                                <h5>Максимальное расстояние</h5>
                                <input placeholder="Максимальное расстояние в км" type="number"
                                       name="numberFilterNameMax" id="distanceFilterMax" min="0"
                                       value={this.state.distanceFilterMax}
                                       onChange={(e) => this.setState({distanceFilterMax: e.target.value})}/>
                            </div>

                            <div className="filterBlock">
                                <input type="submit" onClick={(e) => this.reset(e)} value="Сбросить" id="btnReset"/>
                            </div>

                        </div>
                        <div className="containerFilter">
                            <div className="filterBlock">
                                <h5>Тип тренировки</h5>
                                <div className="filterContainer">
                                    <select id="listTypesFilter"
                                            onChange={(e) => this.setState({typeTrainFilter: e.target.value})}>
                                        <option value="Не выбрано" id="idOptionFilter">Не выбрано</option>
                                        <option value="Бег">Бег</option>
                                        <option value="Велосипеп">Велосипеп</option>
                                        <option value="Ходьба">Ходьба</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}