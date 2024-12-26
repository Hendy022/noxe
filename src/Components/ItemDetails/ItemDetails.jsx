import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function ItemDetails() {
  let { id, mediaType } = useParams();

  const [details, setDetails] = useState({})

  async function getDetails(id, mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US`)
    setDetails(data)
  }
  useEffect(() => {
    getDetails(id, mediaType)
  }, [])
  return <>

    <div className="row">
      <div className="col-md-3">
        {details.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + details.poster_path} className='w-100' alt="" /> : <img src={'https://image.tmdb.org/t/p/w500' + details.profile_path} className='w-100' alt="" />}
      </div>
      <div className="col-md-6 d-flex align-items-center">
        <div>
        <h1 className=' my-2'>{details.title} {details.name}</h1>
        <p className='text-muted'>{details.overview}{details.biography}</p>
        {details.release_date ? <div >Release Date : {details.release_date}</div> : ''}

        {details.vote_average ? <div >Vote Average : {details.vote_average}</div> : ''}
        {details.birthday ? <div >Birthday : {details.birthday}</div> : ''}
        {details.vote_count ? <div >Vote count : {details.vote_count}</div> : ''}
        {details.budget ? <div >Budget : {details.budget}</div> : ''}
        {details.revenue ? <div >Revenue : {details.revenue}</div> : ''}
        </div>

      </div>


    </div>

  </>
}
