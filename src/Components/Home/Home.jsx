import axios from 'axios'
import React, { useEffect, useState } from 'react';
import ViewItem from '../ViewItem/ViewItem';


export default function Home() {
  const [movies, setMovies] = useState([])
  const [tv, setTv] = useState([])
  const [people, setPeople] = useState([])

  async function getTrending(mediaItem, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=f597813c136fdbe4ff8e3e2976da14ad`)
    callback(data.results)
    // console.log(data.results);
  }

  useEffect(() => {
    getTrending('movie', setMovies)
    getTrending('tv', setTv)
    getTrending('person', setPeople)
  }, [])

  return <>

<div className="row">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h3'>Trending <br /> Movies <br /> to Watch now</h2>
        <p className='text-muted'>Most Watched Movies By Week</p>
        <div className="brdr w-10 mt-3"></div>
        </div>
      </div>
      {movies.slice(0,10).map((item , index )=> <ViewItem key={index} item={item}/>)}
    </div>
    
    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 >Trending <br /> Tv Show<br /> to Watch now</h2>
        <p className='text-muted'>Most Watched Tv Show By Week</p>
        <div className="brdr w-10 mt-3"></div>
        </div>
      </div>
      {tv.slice(0,10).map((item , index )=> <ViewItem key={index} item={item}/>)}
    </div>
    
    <div className="row">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2>Trending <br /> people <br /> to Watch now</h2>
        <p className='text-muted'>Most Watched people By Week</p>
        <div className="brdr w-10 mt-3"></div>
        </div>
      </div>
      {people.slice(0,10).map((item , index )=> <ViewItem key={index} item={item}/>)}
    </div>
    
  </>
}
