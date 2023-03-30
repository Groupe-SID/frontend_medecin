import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isSignedIn, children }) {
  console.log(isSignedIn)
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  // else{
  //   return <Navigate to="/Accueil" replace />
  // }
  return children
}
export default Protected