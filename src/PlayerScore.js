import React from 'react';

class PlayerScore extends React.Component {

    render() {
        return (
            <ul className="header__marks">
                {this.props.players_array.map((item, index) => <li className={'header__mark' + ' ' + this.props.active_player[index]} key={this.props.keys[index]}>
                    Игрок {index + 1}:<span className='header__number' > {item}</span></li>)
                }
            </ul>
        )
    }
}

export default PlayerScore;