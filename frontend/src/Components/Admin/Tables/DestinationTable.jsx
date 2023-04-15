import "primereact/resources/themes/lara-light-indigo/theme.css";    
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './UserTable.css'
import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from '../../../Utils/axios'
import { getDestinations, destinationDelete } from "../../../Utils/Urls";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function DestinationTable() {
    const [customers, setCustomers] = useState(null);
    const [isMounted, setIsMounted] = useState(false)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        guide_count: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const authTokens = JSON.parse(localStorage.getItem('authTokens'))
    const access = authTokens.access;


    

    useEffect(() => {

        axios.get(getDestinations,{
            headers: {'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.status === 200) {
                setCustomers((getCustomers(response.data)));
                setLoading(false);
              } 
            })    
      },[isMounted])

    
    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

   

    const deleteBodyTemplate = (rowData) => {
        const destinationId = rowData.id

        return (
            <div className="flex align-items-center gap-2" style={{display: 'flex',justifyContent: 'start',alignItems: 'center' }}>
                <button className="red-button" onClick={() => handleDelete(destinationId)}>Delete</button>
            </div>
        )
    }
    const viewBodyTemplate = (rowData) => {
        const destinationId = rowData.id

        return (
            <div className="flex align-items-center gap-2" style={{display: 'flex',justifyContent: 'start',alignItems: 'center' }}>
                <Link className="view-button" to={`/admin/destinations/${destinationId}`}>View</Link>
            </div>
        )
    }

    const updateBodyTemplate = (rowData) => {
      const destinationId = rowData.id

      return (
          <div className="flex align-items-center gap-2" style={{display: 'flex',justifyContent: 'start',alignItems: 'center' }}>
              <Link className="update-button" to={`/admin/destinations/update/${destinationId}`}>Update</Link>
          </div>
      )
  }

    const handleDelete = (destinationId) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
        
            const url = `${destinationDelete}${destinationId}`
            axios
            .delete(url, {
              headers:  {"Authorization": `Bearer ${access}`,'Content-Type': 'application/json' },
            })
            .then((response) => {
            //   setUsers(response.data);
              setIsMounted(!isMounted)
            })
            .catch((error) => {
              console.log("error",error);
            });

          }
        });
      };


    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={customers} paginator rows={5} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['name', 'country', 'guide_count']} header={header} emptyMessage="No customers found.">
                <Column field="name" header="Destination" filter filterPlaceholder="Search by destination" style={{ minWidth: '12rem' }} />
                <Column field="country" header="Country" filter filterPlaceholder="Search by country" style={{ minWidth: '12rem' }} />
                <Column field="guide_count" header="Available Guides" filter filterPlaceholder="Search by available guides" style={{ minWidth: '6rem' }} />
                <Column header=""  style={{ minWidth: '7rem' }} body={viewBodyTemplate} />
                <Column header=""  style={{ minWidth: '7rem' }} body={updateBodyTemplate} />
                <Column header=""  style={{ minWidth: '7rem' }} body={deleteBodyTemplate} />
            </DataTable>
        </div>
    );
}