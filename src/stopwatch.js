import React from "react";

const formattedSeconds = sec =>
    Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
            lastClearedIncrementer: null
        };
        this.stopwatch = this.stopwatch.bind(this)
    }

    this.stopwatch(

    )

    handleStartClick() {
        this.incrementer = setInterval(
            () =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1
                }),
            1000
        );
    }



    render() {
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">
                    {formattedSeconds(this.state.secondsElapsed)}
                </h1>



                {this.state.secondsElapsed !== 0 &&
                this.incrementer === this.state.lastClearedIncrementer ? (
                    <Button onClick={this.handleResetClick.bind(this)}>
                        reset
                    </Button>
                ) : null}

                <ul className="stopwatch-laps">
                    {this.state.laps.map((lap, i) => (
                        <li className="stopwatch-lap">
                            <strong>{i + 1}</strong>/ {formattedSeconds(lap)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const Button = props => (
    <button type="button" {...props} className={"btn " + props.className} />
);

React.render(<Stopwatch />, document.body);
