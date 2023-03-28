import React from 'react'
import DestinationTable from '../Tables/DestinationTable'
import './TableContainer.css'
import { useNavigate } from 'react-router-dom'

function DestinationTableContainer() {

  const navigate = useNavigate()

  return (
        <div class="Table-Container">
          <div>
          <button onClick={() => navigate("/admin/destination/add")}>+ Add Destination</button>
          </div>
            <DestinationTable/>
        </div>
  )
}

export default DestinationTableContainer