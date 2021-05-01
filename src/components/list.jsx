import React from "react";
import Train from './train'
import ItemList from './item-list'

export  default class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {elements: [new Train(29,"Бег", 4)],date:"", distance:0}
        this.del = this.del.bind(this);
    }
    add(event){
        event.preventDefault();
        let sel = document.getElementById("listTypes");
        let val = sel.options[sel.selectedIndex].value;
        let correctData = true;
        if(this.state.date == "") {
            document.getElementById("date").style.backgroundColor = 'red';
            correctData = false;
        }
        else{
            document.getElementById("date").style.backgroundColor = 'white';
        }
        if(this.state.distance <= 0) {
            document.getElementById("distance").style.backgroundColor = 'red';
            correctData = false;
        }
        else{
            document.getElementById("distance").style.backgroundColor = 'white';
        }
        if(correctData == true){
            this.setState({elements: ([...this.state.elements, new Train(this.state.date,val, this.state.distance)])});
        }
    }

    del(i){
        this.setState(state => ({
            elements: this.state.elements.filter((el, index) =>  index !== i)
        }))
    }
    render(){
        return(
            <div>
                <form>
                    <input placeholder="Введите дату" type="date" name="date" id="date" value={this.state.date} onChange={(e) => this.setState({date: e.target.value})}/>
                    <select id="listTypes">
                        <option value="Бег">Бег</option>
                        <option value="Велосипеп">Велосипеп</option>
                        <option value="Ходьба">Ходьба</option>
                    </select>
                    <input  placeholder="Введите расстояние в км" type="number" name="date3" id="distance" min="0" distancevalue={this.state.distance} onChange={(e) => this.setState({distance: e.target.value})}/>
                   <input type="submit"  onClick={(e) => this.add(e)} value="Добавить"/>
              </form>
                <ItemList elements={this.state.elements} onDelete={this.del}/>
            </div>
    )
    }
}
