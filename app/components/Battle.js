import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import ThemeContext, { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'

const Instructions = () => {

    const theme = React.useContext(ThemeContext)

    return(
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>See the winners</h3>
                    <FaUserFriends className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                </li>
            </ol>
        </div>
    )
}

const PlayerInput = ({onSubmit, label}) => {
    const [username, setUsername] = React.useState('')

    const theme = React.useContext(ThemeContext)

    const handleChange = (e) => setUsername(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(username)
    }

    return (
        <form className='column player' onSubmit={handleSubmit}>
            <label htmlFor='username' className='player-label'>
                {label}
            </label>
            <div className='row player-inputs'>
                <input 
                    type='text'
                    id='username'
                    className={`input-${theme}`}
                    placeholder='github username'
                    autoComplete='off'
                    onChange={handleChange}
                    value={username}
                />
                <button 
                    className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                    type='submit'
                    disabled={!username}
                >
                    Submit
                </button>
            </div>
        </form>  
    )
}


PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

const PlayerPreview = ({ username, onReset, label }) => {
    const theme = React.useContext(ThemeContext)
    return(
        <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className='player-info'>
                    <img
                        className='avatar-small'
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                    />
                    <a
                        href={`https://github.com/${username}`}
                        className='link'>
                            {username}
                    </a>  
                </div>
                <button className='btn-clear flex-center' onClick={onReset}>
                    <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
                </button>                
            </div>
            
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

const Battle = () => {
    const [playerOne, setPlayerOne] = React.useState(null)
    const [playerTwo, setPlayerTwo] = React.useState(null)

    const theme = React.useContext(ThemeContext)

    const handleSubmit = (id, player) => id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player)

    const handleReset = (id) => id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null)

    return (

                <React.Fragment>
                    <Instructions />
                        <div className='players-container'>
                            <h1 className='center-text header-lg'>Players</h1>
                            <div className='row space-around'>
                                {!playerOne ? 
                                    <PlayerInput
                                        label='Player One'
                                        onSubmit={(player) => handleSubmit('playerOne', player)}
                                    />
                                : 
                                    <PlayerPreview
                                        username={playerOne}
                                        onReset={() => handleReset('playerOne')}
                                        label='Player One'
                                    />
                                }
                                {!playerTwo ? 
                                    <PlayerInput
                                        label='Player Two'
                                        onSubmit={(player) => handleSubmit('playerTwo', player)}
                                    />
                                : 
                                    <PlayerPreview
                                        username={playerTwo}
                                        onReset={() => handleReset('playerTwo')}
                                        label='Player Two'
                                    />
                                }
                            </div>
                            {playerOne && playerTwo && (
                                <Link 
                                    className={`btn btn-space ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                                    to={{
                                        pathname: '/battle/results',
                                        search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                                    }}
                                > 
                                    Battle
                                </Link>
                            )}
                        </div>
                </React.Fragment>    
          
    )
}

export default Battle