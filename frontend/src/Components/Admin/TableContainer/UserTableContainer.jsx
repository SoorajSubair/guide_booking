import React from 'react'
import UserTable from '../Tables/UserTable'
import './TableContainer.css'
import { useNavigate } from 'react-router-dom'

function UserTableContainer() {

  const navigate = useNavigate()

  return (
        <div class="Table-Container">
          <div>
            <button onClick={() => navigate("/admin/users/add")}>+ Add User</button>
          </div>
            <UserTable/>
        </div>
  )
}

export default UserTableContainer
