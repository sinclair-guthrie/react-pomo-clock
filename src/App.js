import React from 'react';
import './App.css';
import soundfile from "./assets/ring.mp3";

const defaultState = {
  breakLength: 5,
  sessionLength: 25
}

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      breakLength: (defaultState.breakLength),
      sessionLength: (defaultState.sessionLength),
      timeLeft: (defaultState.sessionLength * 60),
      sessionTimeLeft: true,
      currentlyRunning: false
    }
    this.handleBreakButton = this.handleBreakButton.bind(this);
    this.handleSessionButton = this.handleSessionButton.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
  }
  
  handleBreakButton(event) {
    if (event.target.value == -1 && this.state.breakLength > 1 && this.state.currentlyRunning == false) {
      this.setState({
        breakLength: this.state.breakLength - 1
      })
    } else if (event.target.value == 1 && this.state.breakLength < 60 && this.state.currentlyRunning == false) {
      this.setState({
        breakLength: this.state.breakLength + 1
      })
    }
  }
  
  handleSessionButton(event) {
    if (event.target.value == -1 && this.state.sessionLength > 1 && this.state.currentlyRunning == false) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: (this.state.sessionLength -1) * 60
      })
    } else if (event.target.value == 1 && this.state.sessionLength < 60 && this.state.currentlyRunning == false) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: (this.state.sessionLength + 1) * 60
      })
    }
  }
  
  handleStartStop() {
    let x = this;          //defining this as variable x to bind setInterval in its callback
    let interval1;
    if (this.state.currentlyRunning == true) {
      this.setState({
        currentlyRunning: false
      })
      clearInterval(interval1);
    }
    else if (this.state.currentlyRunning == false) {
      this.setState({
        currentlyRunning: true
      })
      interval1 = setInterval(function() {
        if (this.state.currentlyRunning == false) {
          clearInterval(interval1);
        }
        else if (this.state.timeLeft <= 0) {
          this.setState({
            timeLeft: (this.state.breakLength * 60),
            sessionTimeLeft: !this.state.sessionTimeLeft
          })
          let beep1 = document.getElementById("beep");
          beep1.currentTime = 0;
          beep1.play();
        }
        else {
          this.setState({
            timeLeft: this.state.timeLeft - 1
          })
        }
      }.bind(x), 1000)
    }
  }
  
  handleReset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: (defaultState.sessionLength * 60),
      sessionTimeLeft: true,
      currentlyRunning: false
    })
    let beep1 = document.getElementById("beep");
    beep1.pause();
    beep1.currentTime = 0;
  }
  
  render() {
    return (
      <div id="clock-area">
        <div id="break-area">
          <div id="break-label">
            Break Length
          </div>
          <button 
            id="break-decrement" 
            class="btn btn-primary"
            value="-1" 
            onClick={this.handleBreakButton} 
            >
            -1
          </button>
          <div id="break-length">
            {this.state.breakLength}
          </div>
          <button 
            id="break-increment" 
            class="btn btn-primary"
            value="1" 
            onClick={this.handleBreakButton} 
            >
            +1
          </button>
         </div>
        <div id="session-area">
          <div id="session-label">
            Session Length
          </div>
          <button 
            id="session-decrement"
            class="btn btn-primary"
            value="-1" 
            onClick={this.handleSessionButton}
            >
            -1
          </button>
          <div id="session-length">
            {this.state.sessionLength}
          </div>
          <button 
            id="session-increment"
            class="btn btn-primary"
            value="1" 
            onClick={this.handleSessionButton}
            >
            +1
          </button>
        </div>
        <div id="timer-area">
          <div id="timer-label">
            {this.state.sessionTimeLeft ? "Session" : "Break"}
            <div id="time-left">
              {Math.floor(this.state.timeLeft / 60).toString().padStart(2, "0") + ":" + ((this.state.timeLeft % 60).toString().padStart(2, "0"))}
            </div>
          </div>
          <button 
            id="start_stop"
            class="btn btn-primary"
            onClick={this.handleStartStop}
            >
            Start/Stop
          </button>
          <button 
            id="reset"
            class="btn btn-primary"
            onClick={this.handleReset}
            >
            Reset
          </button>
          <audio
            controls
            id="beep"
            src={soundfile} 
            />
        </div>
      </div>
    )
  }
}


export default App;
