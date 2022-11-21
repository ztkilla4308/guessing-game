import React, { useEffect, useState } from 'react';
import './App.css'
import FinalScene from './components/FinalScene';
import Tile from './components/Tile';

function App() {
  const [gameData, setGameData] = useState<number[]>([])
  const [finalScene, setFinalScene] = useState<boolean>(false)

  useEffect(() => {
    getGameData()
  }, [])
    function getGameData(){
      const oldTiles = document.getElementsByClassName('DNDelete')

      console.log(oldTiles)
      for (let i = 0; i < oldTiles.length; i++) {
        oldTiles[i].classList.remove('inactive-item')
        oldTiles[i].classList.add('game-item');
        ( oldTiles[i] as HTMLButtonElement ).disabled = false
      }

      const Numbers = [1,2,3,4,5,6,7,8,9,0]
      const randNumbers = Numbers.sort(() => .5 - Math.random())
      // Randomising numbers and pushing first 5 to new array
      const gameNumbers = []
      for(let i = 0; i < 5; i++) {
          gameNumbers.push(randNumbers[i])
      }
      const tempNumbers = gameNumbers.sort(() => .5 - Math.random())
      // Randomising paired numbers so the game would be more interesting
      const data = gameNumbers.concat(tempNumbers.slice(1, 5))    
      // Taking out last char as our game contains 9 tiles
      setGameData(data.sort(() => .5 - Math.random()))
    }

  const [checkedTiles, setCheckedTiles] = useState<any>([])

  // Pick two tiles and disable every single one
  function tileHandler(tileprop: any){
    tileprop.classList.toggle('active')
    setCheckedTiles([...checkedTiles, tileprop])
  }

  useEffect(() => {
    const Tiles = document.getElementsByClassName('game-item')
    if(Tiles.length === 1){
      setFinalScene(true)
      setTimeout(() => 
          {
            getGameData()
            setFinalScene(false)
          }
          , 3000);
    }
    if(checkedTiles.length == 2){
      for (let i = 0; i < Tiles.length; i++) {
        (Tiles[i] as HTMLButtonElement).disabled = true
      }
      // Check if tiles values ae the same 
      if(checkedTiles[0].value == checkedTiles[1].value){
        // If yes take this specific tiles and change their class to inactive
          setTimeout(() => 
          {
            for (let i = 0; i < checkedTiles.length; i++) {
              checkedTiles[i].classList.remove('game-item')
              checkedTiles[i].classList.remove('active')
              checkedTiles[i].classList.add('inactive-item')
            }
            for (let i = 0; i < Tiles.length; i++) {
              (Tiles[i] as HTMLButtonElement).disabled = false
            }
            setCheckedTiles([])
          }
          , 1000);
      }else{  // If not remove active class and disable false every tile
        setTimeout(() => 
          {
            for (let i = 0; i < checkedTiles.length; i++) {
              checkedTiles[i].classList.remove('active')
            }
            // Then take all the game-item tiles that have left and disable false them
            setCheckedTiles([])
            for (let i = 0; i < Tiles.length; i++) {
              (Tiles[i] as HTMLButtonElement).disabled = false
            }
          }
          , 1000);
      }
    }
    
  }, [checkedTiles])

  return (
    <div className="App">
      <main className='game-container'>
      { 
        !finalScene? gameData.map((data, index) => {
          return(
            <Tile key={index} data={data} propFunc={tileHandler}></Tile>
            )
        }) : <FinalScene/>
        }

      </main>
    </div>
  );
}

export default App;
