import React from 'react';

const Card = ({ card, faceDown = false }) => {

    const { suit, rank } = card

    const suitSymbol = {
        hearts: '♥',
        diamonds: '♦',
        clubs: '♣',
        spades: '♠',
    }[suit];

  const suitColor = suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-black';

  return (
    <div className={`w-16 h-24 rounded-lg shadow-md flex items-center justify-center ${faceDown ? 'bg-blue-500' : 'bg-white'}`}>
      {!faceDown && (
        <div className={`text-2xl font-bold ${suitColor}`}>
          {rank}
          <span className="text-3xl">{suitSymbol}</span>
        </div>
      )}
    </div>
  );
}

export default Card
