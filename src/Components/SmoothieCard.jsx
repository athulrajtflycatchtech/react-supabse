import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const SmoothieCard = ({smoothie}) => {

  const handleDelete = async() => {
    const {data, error} = await supabase
      .from('smoothies')
      .delete()
      .eq('id', smoothie.id)
      .select()

      if (error) {
        console.log(error);
        
      }
      if (data) {
        console.log(data);
        
      }

  }

  return (
    <div>
        <p>{smoothie.id}</p>
        <p>{smoothie.title}</p>
        <p>{smoothie.method}</p>
        <div>
          <Link to={'/' + smoothie.id}>
            <p>EDIT</p>
          </Link>
        </div>
        <div>
          <p style={{color:'red', cursor:'pointer'}} onClick={handleDelete}>DELETE</p>
        </div>
    </div>
  )
}

export default SmoothieCard