import React from "react";
import Train from './train'
import ItemList from './item-list'

export  default class List extends React.Component{
    constructor() {
        super();
        this.state = {elements: [new Train(29,"Бег", 4)],date:1, distance:0}
    }
    add(event){
        event.preventDefault();
        var sel = document.getElementById("listTypes");
        var val = sel.options[sel.selectedIndex].value;
        this.setState({elements: ([...this.state.elements, new Train(this.state.date,val, this.state.distance)])})
    }
    render(){
        return(
            <div>
                <form>
                    <input type="text" name="date" value={this.state.date} onChange={(e) => this.setState({date: e.target.value})}/>
                    <select id="listTypes">
                        <option value="Бег">Бег</option>
                        <option value="Велосипеп">Велосипеп</option>
                        <option value="Ходьба">Ходьба</option>
                    </select>
                    <input type="text" name="date3" value={this.state.distance}onChange={(e) => this.setState({distance: e.target.value})}/>
                   <input type="submit"  onClick={(e) => this.add(e)} value="Добавить"/>
              </form>
                <ItemList elements={this.state.elements}/>
            </div>
    )
    }
}
