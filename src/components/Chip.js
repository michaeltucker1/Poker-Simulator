import React from 'react';

const Chip = ({ value, playerChips, setPlayerChips, setPot, turn, setTurn }) => {

  const onClick = () => {
    if (turn === "player" && playerChips >= value){
      setPlayerChips(prev => prev - value)
      setPot(prev => prev + value)
      setTurn("bot")
    }
  }

  return (
    <div onClick={onClick} className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-300 flex items-center justify-center text-white font-bold shadow-md">
      {value}
    </div>
  );
}

export default Chip

