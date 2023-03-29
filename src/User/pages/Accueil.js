import React from 'react'

const Accueil = () => {
  return (
    <div>
      Hello Accueil 
      {localStorage.getItem('accessToken')}
    </div>
  )
}
export default Accueil
