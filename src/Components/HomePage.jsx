import { useEffect, useState } from 'react'
import { Button, Card, Table } from "react-bootstrap"
import axios from 'axios';


export default function HomePage() {

    useEffect(() => {
        axios.get(`https://api.statbotics.io/v2/matches/event/${event}`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))

        axios.get(`https://api.statbotics.io/v2/match/${match}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }, [])

    const [data, setData] = useState("")
    const [matchData, setMatchData] = useState("")
    const [event, setEvent] = useState("")
    const [clicked, setClicked] = useState(false)
    const [match, setMatch] = useState("")
    const [matchClicked, setMatchClicked] = useState(false)

    const handleForm = (e) => {
        e.preventDefault()
    
        axios.get(`https://api.statbotics.io/v2/matches/event/${event}`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    
        
    }

    const handleFormMatch = (e) => {
        e.preventDefault() 
        axios.get(`https://api.statbotics.io/v2/match/${match}`)
        .then(res => setMatchData(res.data))
        .catch(err => console.log(err))
    }

    const handleClick = () => {
        setClicked(true)
        setMatchClicked(false)
    }

    const matchClick = () => {
        setMatchClicked(true)
    }

    const matchHandler = () => {
        setClicked(false)
        setMatchClicked(true)
    }

    return(
        <div className="">
            <div className="formSpacing">
                <form onSubmit={handleForm} className="spacing">
                    <label className="spacing">Enter Event</label>
                    <input
                        type="text"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        className="spacing"
                    >
                    </input>

                    <Button type = "submit" className="spacing" variant="secondary">Submit</Button>
                    <Button onClick={handleClick} className="spacing" variant="dark">Click for List</Button>
                </form>

                    <form className="spacing" onSubmit={handleFormMatch}>
                        <label className="spacing">Enter Match</label>
                        <input
                        type="text"
                        value={match}
                        onChange={(e) => setMatch(e.target.value)}
                        className="spacing"
                        >
        
                        </input>
                        <Button type = "submit" className="spacing" variant="secondary">Submit</Button>
                        <Button onClick={matchHandler} variant="dark">Get Match Data</Button>
                    </form>

                    {clicked && 
                    <div>
                        <p className='spacing'>Copy paste a match ID from below: </p>
                        <div className="cards"> 
                            
                            {data.map((button, index) => (
                            <Card  style={{ width: '100px' }} body className="spacing card" key = {index} >{button.key}</Card>
                        ))}
                            </div>
                    </div>}

                    {matchClicked &&
                    <div>
                        <Table striped="columns">
                            <thead>
                                <tr>
                                    <th>Alliance</th>
                                    <th>Auto Score</th>
                                    <th>Telop Score</th>
                                    <th>Endgame Score</th>
                                    <th>Fouls</th>
                                    <th>Total Score</th>
                                    <th>Net EPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Blue</td>
                                    <td>{matchData.blue_auto}</td>
                                    <td>{matchData.blue_teleop}</td>
                                    <td>{matchData.blue_endgame}</td>
                                    <td>{matchData.blue_fouls}</td>
                                    <td>{matchData.blue_score}</td>
                                    <td>{matchData.blue_epa_sum}</td>
                                </tr>
                                <tr>
                                <td>Red</td>
                                    <td>{matchData.red_auto}</td>
                                    <td>{matchData.red_teleop}</td>
                                    <td>{matchData.red_endgame}</td>
                                    <td>{matchData.red_fouls}</td>
                                    <td>{matchData.red_score}</td>
                                    <td>{matchData.red_epa_sum}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="flex spacing">
                            <Table size="sm" className="maxWidth spacing" striped bordered hover>
                                <thead>
                                    <tr>
                                        <td>Red</td>
                                        <td>Blue</td>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>{matchData.red_1}</td>
                                    <td>{matchData.blue_1}</td>
                                </tr>
                                <tr>
                                    <td>{matchData.red_2}</td>
                                    <td>{matchData.blue_2}</td>
                                </tr>
                                <tr>
                                    <td>{matchData.red_3}</td>
                                    <td>{matchData.blue_3}</td>
                                </tr>
                            </Table>
                            <h4 className="spacing">
                            WINNER: {matchData.winner}
                            </h4>
                            
                        </div>
                        <h1 className="spacing">Embedded Video</h1>
                        <iframe 
                            className="spacing"
                            width="560" 
                            height="315" 
                            src= {`https://www.youtube.com/embed/${matchData.video}`}
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; 
                            autoplay; 
                            clipboard-write; 
                            encrypted-media; 
                            gyroscope; 
                            picture-in-picture; 
                            web-share" allowfullscreen>
                        </iframe>
                    </div>
                    
                    }

                    

                
                
                
               
            </div>
    
        </div>
    )
}