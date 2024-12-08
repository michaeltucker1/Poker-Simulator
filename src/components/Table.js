import React, { useEffect, useState } from 'react'
import createDeck from '../utils/deck'
import Card from './Card'
import Chip from './Chip'

const Table = () => {

    const [deck, setDeck] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [opponentHand, setOpponentHand] = useState([])
    const [communityCards, setCommunityCards] = useState([])
    const [playerChips, setPlayerChips] = useState(1000);
    const [opponentChips, setOpponentChips] = useState(1000);
    const [pot, setPot] = useState(0)
    const [turn, setTurn] = useState("player");
    const [gamePhase, setGamePhase] = useState("pre-flop"); // "pre-flop", "flop", "turn", "river", "showdown"

    useEffect(() => {
        startNewHand()
    }, [])

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * 3);
        const betAmounts = [50, 100, 200]

        if (turn === "bot" && opponentChips >= betAmounts[randomNum]) {
            setTimeout(() => {
                setOpponentChips(prev => prev - betAmounts[randomNum])
                setPot(prev => prev + betAmounts[randomNum])
                setTurn("player")
            }, 2000);
        }
    }, [turn, opponentChips]);
    
    const startNewHand = () => {

        setPot(0)
        setPlayerChips(1000)
        setOpponentChips(1000)
        setTurn("player")
        setGamePhase("pre-flop")

        const newDeck = createDeck()
   
        setPlayerHand([newDeck.pop(), newDeck.pop()])
        setOpponentHand([newDeck.pop(), newDeck.pop()])
        setCommunityCards([])
        setDeck(newDeck)
    }

    const dealFlop = () => {
        if (gamePhase === "pre-flop"){
            setCommunityCards([deck.pop(), deck.pop(), deck.pop()])
            setGamePhase("flop");
        }
    }

    const dealTurnRiver = () => {
        if (gamePhase === "flop" && communityCards.length === 3) {
            setCommunityCards((prev) => [...prev, deck.pop()]);
            setGamePhase("turn");
        } else if (gamePhase === "turn" && communityCards.length === 4) {
            setCommunityCards((prev) => [...prev, deck.pop()]);
            setGamePhase("river");
        }
    }

    const handleShowdown = () => {
        if (gamePhase === "river") {
            setGamePhase("showdown");
        }
    };

  return (
    <div className="w-full h-screen bg-green-800 flex flex-col gap-5 items-center justify-center">
        <div className='flex gap-5'>
            <p className="text-lg font-semibold text-white">Turn: {turn}</p>
            <p className="text-lg font-semibold text-white">Game Phase: {gamePhase}</p>
        </div>
        <div className="relative w-5/6 h-5/6 bg-green-700 rounded-full shadow-xl flex flex-col items-center justify-between p-8">
            <div className='flex flex-col gap-5'>
                <div className='flex gap-5'>
                {opponentHand.map((card, index) => (
                    <Card key={index} card={card} faceDown={gamePhase === "showdown" ? false : true}/>
                ))}
                </div>
                <div className="text-center">
                    <h3 className="text-md font-semibold">Account</h3>
                    <p className="text-lg font-bold">${opponentChips}</p>
                </div>
            </div>
            <div className='flex flex-col gap-5 items-center'>
                <div className="bg-yellow-500 text-white px-4 py-2 rounded">
                    <p>Pot: {pot}</p>
                </div>
                
                <div className='flex gap-5'>
                    {communityCards.map((card, index) => (
                        <Card key={index} card={card} />
                    ))}
                </div>
                <div className='flex gap-5'>
                    <button className={`px-4 py-2 rounded-lg ${gamePhase === "pre-flop" ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`} onClick={dealFlop}>Deal Flop</button>
                    <button className={`px-4 py-2 rounded-lg ${gamePhase === "flop" || gamePhase === "turn" ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`} onClick={dealTurnRiver}>{communityCards.length < 4 ? "Deal Turn" : "Deal River"}</button>
                    
                    <button className={`px-4 py-2 rounded-lg ${gamePhase === "river" ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`} onClick={handleShowdown}>
                        Showdown
                    </button>
                </div>
            </div>
           

            <div className='flex flex-col gap-5 items-center'>
                <div className="text-center">
                    <h3 className="text-md font-semibold">Account</h3>
                    <p className="text-lg font-bold">${playerChips}</p>
                </div>
                
                <div className='flex gap-5'>
                    <Chip value={50} playerChips={playerChips} setPlayerChips={setPlayerChips} setPot={setPot} turn={turn} setTurn={setTurn}/>
                    <Chip value={100} playerChips={playerChips} setPlayerChips={setPlayerChips} setPot={setPot} turn={turn} setTurn={setTurn}/>
                    <Chip value={200} playerChips={playerChips} setPlayerChips={setPlayerChips} setPot={setPot} turn={turn} setTurn={setTurn}/>
                </div>

                <div className='flex gap-5'>
                    {playerHand.map((card, index) => (
                        <Card key={index} card={card}/>
                    ))}
                </div>
            </div>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={startNewHand}>Start New Hand</button>
    </div>
  )
}

export default Table