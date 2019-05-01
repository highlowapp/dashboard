import React from 'react';
import '../css/MainView.css';
import Section from './Section';



const dashboard_sections = [<Section title='Dashboard' onClick={selectSection} icon=""/>];

function selectSection() {

}

export default class MainView extends React.Component {

    render(){
        return (
            <div>

                <header class='main-header'> <img id='header-logo' src={require('../assets/logo.png')} alt='logo'/> <span class='header-title'>High/Low Dashboard</span></header>

                <div id='sidebar'>
                    {dashboard_sections}
                </div>

            </div>
        );
    }

}