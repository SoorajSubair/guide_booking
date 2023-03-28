import React from 'react'
import GuideTable from '../Tables/GuideTable'
import './TableContainer.css'
import { useNavigate } from 'react-router-dom'

function GuideTableContainer() {

  const navigate = useNavigate()

  return (
        <div class="Table-Container">
          <div>
          <button onClick={() => navigate("/admin/guides/add")}>+ Add Guide</button>
          </div>
          <GuideTable/>
        </div>
  )
}

export default GuideTableContainer