import { useEffect, useRef, useState } from "react";
import "./Music.css";
import { MdSkipPrevious ,MdSkipNext,MdPause,MdPlayArrow} from "react-icons/md";
import dhoni from "./dhoni.jpg";
import song from "./Thala.mp3";
import { FaHeart } from "react-icons/fa";
import song1 from "./assets/songs/song1.mp3";
import song2 from "./assets/songs/song2.mp3";
import song3 from "./assets/songs/song3.mp3";
import song4 from "./assets/songs/song4.mp3";
import song5 from "./assets/songs/song5.mp3";
import song6 from "./assets/songs/song6.mp3";
import song7 from "./assets/songs/song7.mp3";
import song8 from "./assets/songs/song8.mp3";
import images from "./Images.json"
function Music()
{
    const songs=[song1,song2,song3,song4,song5,song6,song7,song8];
    const n=songs.length;
    const [play,setPlay]=useState(false);
    const [favicon,setFavicon]=useState(()=>new Array(n).fill(false));
    const [index,setIndex] =useState(0);
    const [list,setList]=useState([]); 
    const removeFav=(i)=>{
        let l=list.filter((_,ind)=>{
            return ind!==i;
        })
        setList(l);
    }  
    const favBtn=()=>{
        let a=[...favicon];
        a[index]=!a[index];
        setFavicon(a);
        if(favicon[index]){
            let ind=index;
            let l=list.filter((_,i)=>{
                return i!==ind;
            })
            setList(l);
        }
        else{
            let a=[...list,index];
            setList(a);
        }

    }
   
    const prevBtn=()=>{
        let ind=Math.max(0,index-1);
        setIndex(ind);
        setPlay(true);
    }
    const skipBtn=()=>{
        let ind=(index+1)%n;
        setIndex(ind);
        setPlay(true);
    }
    const music=useRef(
        ""
    );
    let duration=music.current.duration;
    const [time,setTime]=useState(music.current.currentTime);
    useEffect(()=>{
        const timer= setInterval(()=>{
               
                setTime(music.current.currentTime);
            },[1000]);
        if(play){
            music.current.play();
        }
        else{
            music.current.pause();
        }
        return ()=>{
            music.current.pause();
            clearInterval(timer);
        };
    },[play,index]);
    const playBtn=()=>{
        if(play){
            setPlay(false);
        }
        else{
            setPlay(true);
        }
    }
    return(
        <>
        <div id="music-box" >
           <nav id="navbar">
           <a href="#list-box" id="playlist-btn">playlist</a>
           </nav>
        <div id="container">
            <audio src={songs[index]} id="song" ref={music}></audio>
            <div id="image-box">
                <img src={images.data[index]} alt="song-image" id="image" />
            </div>
            <div id="title">
                <p id="name">
                   {`song${index+1}`}
                </p>
               
                 {
                    favicon[index]?<FaHeart id="heart-icon"
                    onClick={favBtn}
                    color="red"
                 />:<FaHeart id="heart-icon"
                 onClick={favBtn}
                 color="black"
              />
                 }
            </div>
            <div id="time">
                <div id="time-box">
                    <input 
                    type="range" 
                    min="0" 
                    max={duration}
                    onChange={(event)=>music.current.currentTime=event.target.value}
                    value={time}
                    id="time-bar"/>
                 </div>
                <div id="heart-box">
                </div>
            </div>
            <div id="controls">

            <MdSkipPrevious className="icon" onClick={prevBtn}/>
            {
               play?<MdPause onClick={playBtn}  className="icon"/>:<MdPlayArrow onClick={playBtn}  className="icon"/>
            }
            <MdSkipNext  className="icon"  onClick={skipBtn}/>

            </div>
            </div>
        </div>
        <div id="list-box">
        <p id="heading">Favaourites</p>
            {
                list.map((i,num)=>{
                   return <li key={i} onClick={()=>{setIndex(i);}} id="fav-list" >
                        <div id="fav-song" >
                            <img src={images.data[i]} alt={`song${i+1}`} id="fav-img" width={50} height={50}/>
                            <p id="title">{`song${i+1}`}</p>
                            <FaHeart id="fav-icon" onClick={()=>removeFav(num)}/>
                        </div>
                    </li>
                })
            }
        </div>
        </>
    )
}
export default Music