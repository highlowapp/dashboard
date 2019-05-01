import React from 'react';
import '../css/Section.css';

export default class Section extends React.Component {

    render(){
        return <button class='section' onClick={this.props.onClick}>{this.props.icon}{this.props.title}</button>
    }

}