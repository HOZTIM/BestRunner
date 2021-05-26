import React from "react";
import Train from './train'
import ItemList from "./item-list";

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            elementsFilter: [],
            date: "",
            dateFilter: "",
            distance: 0,
            distanceFilterMin: 0,
            distanceFilterMax: 9999,
            typeTrainFilter: "Не выбрано",
            dateFilterMin: "",
            dateFilterMax: "",
            listTypesFilter: "",
            typeTrain: "Бег",
            statusForm1: false
        }
        this.del = this.del.bind(this);
        this.editForm = this.editForm.bind(this);
    }

    add() {
        let correctData = true;
        if (!this.state.date) {
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
        if (correctData) {
            const elems = [...this.state.elements, new Train(this.state.date, this.state.typeTrain, this.state.distance)];
            this.setState({elements: (elems)});
            this.setState({elementsFilter: (elems)});
        }
    }

    del(i) {
        const elems = this.state.elements.filter((el, index) => index !== i);
        this.setState({elements: [...elems]});
        this.setState({elementsFilter: [...elems]});
    }

    reset() {
        this.setState({distanceFilterMin: 0})
        this.setState({distanceFilterMax: 9999})
        this.setState({typeTrainFilter: "Не выбрано"})
        this.setState({elementsFilter: [...this.state.elements]});
        this.setState({dateFilterMin: ""});
        this.setState({dateFilterMax: ""});
    }


    filter() {

        const items = this.state.elements.filter(el => {
            if (
                (parseInt(this.state.distanceFilterMin) <= parseInt(el.distance) && parseInt(this.state.distanceFilterMax) >= parseInt(el.distance))
                &&
                (this.state.typeTrainFilter === el.typeTrain || this.state.typeTrainFilter === "Не выбрано")
                &&
                ((Date.parse(el.date) >= Date.parse(this.state.dateFilterMin) && Date.parse(el.date) <= Date.parse(this.state.dateFilterMax)) || (this.state.dateFilterMax === "") || (this.state.dateFilterMin === ""))
            ) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({elementsFilter: items});
    }

    editForm() {

    }
    /*    reset() {
            this.listItems = [...this.props.elements];
        }*/

    render() {
        return (
            <div className="container">
                <form className="trains">
                    <h2 className="titleFilter">Тренировки</h2>
                    {/*<button onClick={(e) => this.form1)}>*/}
                    {/*    <img src={AddTrain} alt="asdsad"/>*/}
                    {/*</button>*/}
                    <input type="date" name="date" id="date" value={this.state.date}
                           onChange={(e) => this.setState({date: e.target.value})}/>
                    <select value={this.state.typeTrain} onChange={(e) => this.setState({typeTrain: e.target.value})}>
                        <option value="Бег">Бег</option>
                        <option value="Велосипеп">Велосипеп</option>
                        <option value="Ходьба">Ходьба</option>
                    </select>
                    <input placeholder="Введите расстояние в км" type="number" name="date3" id="distance" min="0"
                           value={this.state.distance} onChange={(e) => this.setState({distance: e.target.value})}/>
                    <button type="button" onClick={(e) => this.add(e)}>Добавить</button>
                    <ItemList
                        elements={this.state.elementsFilter}
                        onDelete={this.del}
                        distanceFilterMin={parseInt(this.state.distanceFilterMin)}
                        distanceFilterMax={parseInt(this.state.distanceFilterMax)}
                        typeTrainFilter={this.state.typeTrainFilter}
                        dateFilterMin={this.state.dateFilterMin}
                        dateFilterMax={this.state.dateFilterMax}
                        editForm={this.editForm}
                    />
                </form>
                {/*Фильтр*/}
                <form className="filter">
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
                                <input type="button" onClick={(e) =>
                                    this.reset()} value="Сбросить"/>
                                <input type="button" onClick={(e) =>
                                    this.filter()} value="Применить"/>
                            </div>

                        </div>
                        <div className="containerFilter">
                            <div className="filterBlock">
                                <h5>Тип тренировки</h5>
                                <div className="filterContainer">
                                    <select value={this.state.typeTrainFilter}
                                            onChange={(e) => this.setState({typeTrainFilter: e.target.value})}>
                                        <option value="Не выбрано" id="idOptionFilter">Не выбрано</option>
                                        <option value="Бег">Бег</option>
                                        <option value="Велосипеп">Велосипеп</option>
                                        <option value="Ходьба">Ходьба</option>
                                    </select>
                                </div>
                            </div>

                            <div className="containerFilter">
                                <div className="filterBlock">
                                    <h5>Период</h5>
                                    от <input type="date" name="dateFilterMin" id="dateFilterMin"
                                              value={this.state.dateFilterMin}
                                              onChange={(e) => this.setState({dateFilterMin: e.target.value})}/>
                                    <> до</>
                                    <input type="date" name="dateFilterMax" id="dateFilterMax"
                                           value={this.state.dateFilterMax}
                                           onChange={(e) => this.setState({dateFilterMax: e.target.value})}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        )
    }
}