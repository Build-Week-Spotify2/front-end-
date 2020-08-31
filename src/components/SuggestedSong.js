import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';


const SuggestedSongContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 10px;

`

const SongImage = styled.div`
    width: 100px;
    height: 100px;
`

const SongInfo = styled.div`
    color: white;
    line-height: .5em;
`

const Functionality = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`
const FunctionButton = styled.div`
    color: white;
    text-align: center;
    width: 60px;
    padding: 5px 3px;
    border-radius: 20px;
    background-color: black;
    margin: 5px;

    &:hover {
        background-color: #1DB954;
        cursor: pointer;
        font-weight: 900;
    }
`


const SuggestedSong = (props) => {

    const [songInfo, setSongInfo] = useState()
    useEffect(() => {
        setSongInfo({
            title: props.songData.name,
            album: props.songData.album.name,
            artist: props.songData.artists[0].name,
            spotify_id: props.songData.id,
            image_url: props.songData.album.images[0].url
        })
    }, [])

    const addFavorite = () => {
        axiosWithAuth()
        .post('/songs', songInfo)
        .then((res) => console.log('succesul post', res))
        .catch((err) => console.log(err))
    }

    return(<>
    
    <SuggestedSongContainer>
        <SongImage>
        <img src={props.songData.album.images[0].url} alt='Album Artwork'/>
        </SongImage>

        <SongInfo>
            <p>Artist: {props.songData.artists[0].name}</p>
            <p>Album: {props.songData.album.name}</p>
            <p>Song: {props.songData.name}</p>
        </SongInfo>

        <Functionality>
            <FunctionButton >Info</FunctionButton>
            <FunctionButton onClick={() => {addFavorite()}}>Save</FunctionButton>
        </Functionality>

    </SuggestedSongContainer>
        
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer,
        suggestionsOnProps: state.suggestionsReducer
    }
}

export default connect(
    mapStateToProps,
    {}
)(SuggestedSong)