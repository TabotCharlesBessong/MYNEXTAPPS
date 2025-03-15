import { redirect } from 'next/navigation'
import React from 'react'

const Admin = () => {
  return redirect("/admin/dashboard")
}

export default Admin