
import React, {useState } from 'react';


function Tile({data, propFunc}: any) {
    function rotateHandler(x: any){
        propFunc(x.target)
    }
    return (
        <button className='game-item DNDelete' onClick={rotateHandler} children={data} value={data}></button>
    )
}

export default Tile
