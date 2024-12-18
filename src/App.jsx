import { useState } from 'react'
import React from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { ActionToggle } from '../components/ActionToggle'
import './App.css'


//Basic wrap for what is essentially main of the app
function App() {

  const [windowSizes, setWindowSizes] = useState({
    width: 0,
    height: 0
  });


  // State to hold the dice result, we set useState to an empty array, to hold results
  // Dice result holds current value, setDice result updates diceResult
  // Likewise for dicenumber, but only looking for a number input
  const [diceNumber, setDiceNumber] = useState('')
  const [diceResult, setDiceResult] = useState([]);

  // Used to handle when the number in the input field changes
  // Event gets shunted inside, value extracted from event, diceNumber becomes value
  // This is used in the roll dice function
  const handleNumberChange = (event) => {
    const value = event.target.value;
    setDiceNumber(value);
  }

  // Dice-Roll logic set to results.
  // When you click a dice, diceType is set into the rollDice function
  // We parse the current dice number at base 10
  // If it's not a number when you click, you get a pop up
  const rollDice = (diceType) => {
    const numDice = parseInt(diceNumber, 10)
    if (isNaN(numDice) || numDice <= 0) {
      alert('Not a valid number')
      return;
    }

    //We establish an array for multi-rolling, followed by a basic for loop
    //Each roll is the dicetype * the math.random method, leading to 0-dice.99. 
    //We floor the number because we don't roll decimals, and then add 1 because we roll of 1, not 0
    //Each roll is then pushed into the rolls array
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll)
    }
    //The prior roll gets rolled into a new copy of the array, adding the latest.
    //We set the type of the result to dicetype, used as result.type and result.rolls later
    setDiceResult((previousRoll) => [...previousRoll, { type: diceType, rolls: rolls }]); // Update state with the new dice roll
  };


  // Simple log clear, tied to reset button
  const resetDiceLog = () => {
    setDiceResult([])
  };

  return (<MantineProvider defaultColorScheme="dark">
    <header>
      <img src="https://nubbernaut.com/wp-content/uploads/2020/12/cropped-nubbe_logo_transparent_bg.png" alt="Nubber" className='nub' />
      NubberRoller
      <img src="https://nubbernaut.com/wp-content/uploads/2020/12/cropped-nubbe_logo_transparent_bg.png" alt="Nubber" className='nub' />
      <ActionToggle />
    </header>
    <body>
      {/*We set up the side bar with it's title, input field for dice,followed by buttons
    For the input field, we set up an onChange event, linked to the value, see line 15 */}
      <aside>
        <input type="text"
          placeholder='Dice #'

          value={diceNumber}
          onChange={handleNumberChange}
        />
        {/*Simple click logic for the resetDiceLog button */}
        <button
          onClick={resetDiceLog}
        >Reset
        </button>
        <dice>
          <button
            onClick={() => rollDice(2)}
          >D2
          </button>

          <button
            onClick={() => rollDice(3)}
          >D3
          </button>

          <button
            onClick={() => rollDice(4)}
          >D4
          </button>

          <button
            onClick={() => rollDice(6)}
          >D6
          </button>

          <button
            onClick={() => rollDice(8)}
          >D8
          </button>

          <button
            onClick={() => rollDice(10)}
          >D10
          </button>

          <button
            onClick={() => rollDice(12)}
          >D12
          </button>

          <button
            onClick={() => rollDice(20)}
          >D20
          </button>

          <button
            onClick={() => rollDice(100)}
          >D100
          </button>
        </dice>



      </aside>




      {/* Result box */}
      {(
        <box>
          <p>You rolled:</p>
          {/* Index out diceResult, using result.type to show the D, and the index rolls joined together
          Each time diceResult is updated, it remaps, generating a new list of divs, and thus a log,
          since the full log is kept in diceResult itself, it acts more like an update */}
          {diceResult.map((result, index) => (
            <div key={index}>
              D{result.type}: {result.rolls.join(',')}<p></p> </div>
          ))}
        </box>
      )}
    </body>
  </MantineProvider>
  )
}


export default App;

