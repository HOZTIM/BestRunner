import React from "react";

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul>
                {
                    this.props.elements.map((el, index) => {
                            if (
                                (parseInt(this.props.distanceFilterMin) <= parseInt(el.distance) && parseInt(this.props.distanceFilterMax) >= parseInt(el.distance))
                                &&
                                (this.props.typeTrainFilter === el.typeTrain || this.props.typeTrainFilter === "Не выбрано")
                               ){
                                return(
                                <li key={index}>
                                    <div className="blockTable">{el.date}</div>
                                    <div className="blockTable">{el.typeTrain}</div>
                                    <div className="blockTable">{el.distance}</div>
                                    <input type="button" onClick={() => this.props.onDelete(index)} value="&times;"/>
                                </li>
                                )
                                }
                    }
                    )
                }
            </ul>
            )
        }
}
