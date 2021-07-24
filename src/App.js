import React from 'react';
import PlayerScore from './PlayerScore';
import Cards from './Cards';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players_array: [],  // Массив со счетом игроков, передается компоненту PlayerScore
            players_key: [],  // Ключи для итемов из списка игроков
            active_player: [],  // Массив, служащий для отображения активного игрока. Передается компоненту PlayerScore
            player_current: 0,  // Массив, переключающий игроков в случае неправильной комбтинации. Работает вместе с со стейтом active_player. Передается компоненту PlayerScore
            cards: 0,  // Число заявленных карточек на игровом столе
            open_cards: 0,  // Число правильных комбинаций
            image: {  // Объект, содержащий относительные адреса и ключи для создаваемых карточек
                img_arr: [],
                img_key: [],
            },
            turned_cards: [], // Массив в который передаются выбранные карточки для последующего сравнения
            function_state: true,  // Булево значение для запуска функций readCard и score
            main_class: 'main__table',  // Название активного класса для блока игрового стола
        }
        this.createData = this.createData.bind(this);
        this.readCard = this.readCard.bind(this);
        this.score = this.score.bind(this);
    }
    // Функция срабатывающая с началом/завершением игры. Заполняет стэйты изначальными данными.
    createData(e) {
        let players_arr = [];
        let players_keys = [];
        let active = [];
        if (this.state.image.img_arr.length === 0) {
            let arr = this.state.image.img_arr;
            let imageKey = this.state.image.img_key;
            for (let i = 0; i < this._cards_select.value / 2; i++) {
                arr.push(`/img/card${i}.jpg`);
                arr.push(`/img/card${i}.jpg`);
            }
            for (let i = 0; i < this._cards_select.value; i++) {
                imageKey.push(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1)
            }
            for (let i = arr.length - 1; i > 0; i--) {
                let q = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[q]] = [arr[q], arr[i]];
            }
            for (let i = 0; i < this._players_select.value; i++) {
                players_arr.push(0);
                players_keys.push(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1);
                if (i === this.state.player_current) {
                    active.push('header__mark--current');
                } else {
                    active.push('');
                }
            }
            this.setState({
                players_array: players_arr,
                players_key: players_keys,
                player_current: 0,
                active_player: active,
                cards: parseFloat(this._cards_select.value),
                image: {
                    img_arr: arr,
                    img_key: imageKey,
                }
            });


        } else {
            players_arr = [];
            active = [];
            this.setState({
                image: {
                    img_arr: [],
                    img_key: []
                },
                players_array: players_arr,
                player_current: 0,
                active_player: active,
                turned_cards: [],
            })
        }
        if (e.target.textContent === 'Старт') {
            this._container.classList.add('container--active');
            this._header.classList.remove('header--translate');
            this._main.style.display = 'block'
            if (parseFloat(this._cards_select.value) === 30) {
                this.setState({ main_class: 'main__table main__table--30' })
            } else if (parseFloat(this._cards_select.value) === 90) {
                this.setState({ main_class: 'main__table main__table--90' })
            } else {
                this.setState({ main_class: 'main__table' })
            }
            e.target.textContent = 'Стоп';
        } else {
            this._container.classList.remove('container--active');
            this._header.classList.add('header--translate');
            this._main.style.display = 'none'
            e.target.textContent = 'Старт'
        }
    }


    // функция срабатывающая при клике на карту. Переворачивает карточку, заполняет стэйт turned_cards. Данная функция передается в компонент Card
    readCard(element) {
        let turn = this.state.turned_cards;
        let boolean = true;
        if ((this.state.turned_cards[0] === undefined || this.state.turned_cards[1] === undefined) && this.state.function_state === true) {
            element.classList.add('main__card--open');
            if (this.state.turned_cards[0] === undefined) {
                turn.push(element);
            } else if (element.firstChild != null) {
                turn.push(element);
                boolean = false;
            }
            this.setState({
                turned_cards: turn,
                function_state: boolean,
            });

        }
        if (this.state.turned_cards[0] && this.state.turned_cards[1] && this.state.function_state === true) {
            setTimeout(() => this.score(), 700);
        }
    }

    // Функция, срабатывающая при заполнении стэйта turned_cards. Увеличивает счет активного игрока, при правильной комбинации или переключает активного игрока, при неправильной комбинации
    score() {
        let current = this.state.player_current;
        let active = [];
        let open_cards = this.state.open_cards;
        if (this.state.turned_cards[0].firstChild.getAttribute('src') === this.state.turned_cards[1].firstChild.getAttribute('src')) {
            this.state.players_array[current]++;
            this.state.turned_cards[0].classList.add('main__card--equal');
            this.state.turned_cards[1].classList.add('main__card--equal');
            open_cards = open_cards + 2
            this.setState({
                turned_cards: [],
                open_cards: open_cards,
            });
            setTimeout(() => this.setState({
                function_state: true,
            }), 720);
        } else {
            if (current < this.state.players_array.length - 1) {
                current = current + 1;
                this.state.turned_cards[0].classList.remove('main__card--open');
                this.state.turned_cards[1].classList.remove('main__card--open');
                this.setState({
                    player_current: current,
                    turned_cards: [],
                });
                setTimeout(() => this.setState({
                    function_state: true,
                }), 720);
            } else {
                current = 0;
                this.state.turned_cards[0].classList.remove('main__card--open');
                this.state.turned_cards[1].classList.remove('main__card--open');
                this.setState({
                    player_current: current,
                    turned_cards: [],
                });
                setTimeout(() => this.setState({
                    function_state: true,
                }), 720);
            }
            for (let i = 0; i < this._players_select.value; i++) {
                if (i === current) {
                    active.push('header__mark--current');
                } else {
                    active.push('');
                }
            }
            this.setState({
                active_player: active,
            });
            setTimeout(() => this.setState({
                function_state: true,
            }), 720);
        }

        if (this.state.cards === this.state.open_cards) {
            this._container.classList.remove('container--active');
            this._header.classList.add('header--translate');
            this._main.style.display = 'none';
        }
    }

    render() {

        return (
            <div className="container" ref={(a) => this._container = a
            } >
                <header className="header header--translate" ref={(a) => this._header = a}>
                    <div className="header__top">
                        <h1 className="header__title">Найди пару.</h1>
                        <span className="header__description">
                            Правила игры простые: открывайте картинки, запоминайте их расположение и найдите им пару.
                            Игроку, нашедшему пару будет начислен балл. Данная игра рассчитана до 4 игроков.
                        </span>
                    </div>
                    <div className="header___bottom">
                        <div className='header__selects'>
                            <div className="header__select">
                                <label htmlFor="header__players">Количество игроков:</label>
                                <select className="header__players" name="players" id="header__players" ref={(a) => this._players_select = a}>
                                    <option className="header__player" value="1">1</option>
                                    <option className="header__player" value="2">2</option>
                                    <option className="header__player" value="3">3</option>
                                    <option className="header__player" value="4">4</option>
                                </select>
                            </div>
                            <div className="header__select">
                                <label htmlFor="header__carts">Количество карточек:</label>
                                <select className="header__carts" name="carts" id="header__carts" ref={(a) => this._cards_select = a}>
                                    <option className="header__cart" value="30">30 карточек</option>
                                    <option className="header__cart" value="60">60 карточек</option>
                                    <option className="header__cart" value="90">90 карточек</option>
                                </select>
                            </div>
                        </div>
                        <div className="header__score">
                            <PlayerScore players_array={this.state.players_array} keys={this.state.players_key} active_player={this.state.active_player} />
                        </div>
                        <div className="header__button">
                            <div>
                                <button className="header__but header__start" onClick={this.createData}>Старт</button>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="main" ref={(a) => this._main = a}>
                    <div className="wrap">
                        <div className={this.state.main_class}>
                            <Cards img={this.state.image} read={this.readCard} />
                        </div>
                    </div>
                </main>
                <footer className='footer'></footer>
            </div >
        )
    }

}
export default App;