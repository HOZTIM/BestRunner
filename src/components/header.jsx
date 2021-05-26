import React from "react";
import mainIcon from './../img/mainIcon.png'
import mainTextIcon from './../img/mainTextIcon.png'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <img src={mainIcon} alt="Icon" className="mainLogo"/>
                <img src={mainTextIcon} alt="TextIcon" className="mainLogoText"/>
            </header>
        )
    }
}
