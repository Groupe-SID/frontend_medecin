import React from 'react'

import { Navigate } from 'react-router-dom'

function ProtectedAdmin({ isSignedAdmin, children }) {
  console.log(isSignedAdmin)
  if (!isSignedAdmin) {
    return <Navigate to="/admin" replace />
  }
  // else{
  //   return <Navigate to="/Accueil" replace />
  // }
  return children
}
export default ProtectedAdmin