import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Tvshow() {
    const [tv, settv] = useState([])
    let mediaType = 'tv';
    let nums = new Array(10).fill(1).map((elem , index)=> index+1)
    // console.log(nums);
    async function getTrending(page){
      let {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
      settv(data.results)
    }
  
    useEffect(()=>{
      getTrending(1)
    },[])
    return <>
      <div className="row">
        {tv.filter((tv)=>tv.poster_path !== null).map((item , index)=> <div key={index} className='col-md-3'>
          
        <Link className='text-decoration-none text-white' to={`/itemdetails/${item.id}/${mediaType}`}>
              <div className="position-relative">
                   <img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100' alt="" />
                  <h3 className='h5 my-2'>{item.name}</h3>
                  {item.vote_average? <div className="vote top-0 end-0 p-1 position-absolute">{item.vote_average.toFixed(1)}</div>:''}
                 
              </div>
              </Link>
        </div>)}
      </div>
  
      
      <nav aria-label='...' className='py-5'>
        <ul className='pagination pagination-sm d-flex justify-content-center'>
          {nums.map((page)=> <li key={page} onClick={()=>getTrending(page)}  className='page-item p-1'>
            <Link className='page-link bg-transparent text-white '>{page}</Link></li>)}
          
        </ul>
      </nav>
  
      </>
  
}
