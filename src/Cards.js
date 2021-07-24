import React from 'react';

class Cards extends React.Component {

    constructor(props) {
        super(props)

        this.read = this.read.bind(this);
    }
    read(e) {
        this.props.read(e.target);
    }
    render() {
        return (
            <>
                {this.props.img.img_arr.map((item, index) => <div className='main__card' key={this.props.img.img_key[index]} onClick={this.read}>
                    <img className='main__img' src={item} alt='' /></div>)}
            </>
        )
    }
}

export default Cards;