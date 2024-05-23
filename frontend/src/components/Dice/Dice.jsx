//component/Dice/Dice.jsx
import React, { useState } from 'react';

function Dice() {
  const [system, setSystem] = useState('D&D');
  const [dieType, setDieType] = useState('d20');
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [addTogether, setAddTogether] = useState(false);
  const [modifierEach, setModifierEach] = useState(false);
  const [result, setResult] = useState(null);

  const systems = ['D&D', 'Pathfinder', 'Starfinder', '2d20'];
  const diceTypes = ['d100', 'd20', 'd12', 'd10', 'd8', 'd6', 'd4'];
  const twoD20DiceTypes = ['d20', 'CD'];

  const rollDice = () => {
    if (system === '2d20') {
      if (dieType === 'd20') {
        roll2d20();
      } else if (dieType === 'CD') {
        rollCombatDice();
      }
    } else {
      rollStandardDice();
    }
  };

  const rollStandardDice = () => {
    const rolls = [];
    const sides = parseInt(dieType.substring(1), 10);
    for (let i = 0; i < quantity; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    let total = rolls.reduce((sum, roll) => sum + roll, 0);

    if (addTogether) {
      if (modifierEach) {
        total = rolls.reduce((sum, roll) => sum + roll + modifier, 0);
      } else {
        total += modifier;
      }
      setResult(`Total: ${total}`);
    } else {
      const modifiedRolls = rolls.map(roll => roll + (modifierEach ? modifier : 0));
      const displayResult = modifierEach ? `Rolls: ${modifiedRolls.join(', ')}, Total: ${total + quantity * modifier}` : `Rolls: ${modifiedRolls.join(', ')}`;
      setResult(displayResult);
    }
  };

  const roll2d20 = () => {
    const d20Rolls = [];
    const adjustedQuantity = Math.max(2, Math.min(5, quantity));
    for (let i = 0; i < adjustedQuantity; i++) {
      d20Rolls.push(Math.floor(Math.random() * 20) + 1);
    }
    setResult(`d20 Rolls: ${d20Rolls.join(', ')}`);
  };

  const rollCombatDice = () => {
    const cdRolls = [];
    const cdResults = { total: 0, effects: 0 };
    const cdSides = 6;
    for (let i = 0; i < quantity; i++) {
      const roll = Math.floor(Math.random() * cdSides) + 1;
      cdRolls.push(roll);
      if (roll === 1) cdResults.total += 1;
      else if (roll === 2) cdResults.total += 2;
      else if (roll === 5 || roll === 6) {
        cdResults.total += 1;
        cdResults.effects += 1;
      }
    }
    setResult(`CD Rolls: ${cdRolls.join(', ')} (Total: ${cdResults.total}, Effects: ${cdResults.effects})`);
  };

  return (
    <div>
      <h2>Dice Roller</h2>
      <label>
        Select System:
        <select value={system} onChange={(e) => setSystem(e.target.value)}>
          {systems.map(sys => (
            <option key={sys} value={sys}>{sys}</option>
          ))}
        </select>
      </label>
      {system !== '2d20' && (
        <>
          <label>
            Select Die Type:
            <select value={dieType} onChange={(e) => setDieType(e.target.value)}>
              {diceTypes.map(die => (
                <option key={die} value={die}>{die}</option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            Modifier:
            <input
              type="number"
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            Add Modifier to Each Die:
            <input
              type="checkbox"
              checked={modifierEach}
              onChange={(e) => setModifierEach(e.target.checked)}
            />
          </label>
          <label>
            Add Results Together:
            <input
              type="checkbox"
              checked={addTogether}
              onChange={(e) => setAddTogether(e.target.checked)}
            />
          </label>
        </>
      )}
      {system === '2d20' && (
        <>
          <label>
            Select Die Type:
            <select value={dieType} onChange={(e) => setDieType(e.target.value)}>
              {twoD20DiceTypes.map(die => (
                <option key={die} value={die}>{die}</option>
              ))}
            </select>
          </label>
          {dieType === 'd20' && (
            <label>
              Quantity (2-5):
              <input
                type="number"
                min="2"
                max="5"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
            </label>
          )}
          {dieType === 'CD' && (
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
            </label>
          )}
        </>
      )}
      <button onClick={rollDice}>Roll</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default Dice;
