import './App.css';
import List from './components/list';
import React from "react";
import Header from "./components/header";

function App() {
    return (
        <div className="mainWindow">
            <div>
                <Header />
            </div>,
            <List />
        </div>
    );
}
export default App;
