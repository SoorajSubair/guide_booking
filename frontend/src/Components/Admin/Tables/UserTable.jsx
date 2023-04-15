import "primereact/resources/themes/lara-light-indigo/theme.css";    
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './UserTable.css'
import axios from '../../../Utils/axios'
import { getUsers,baseUrl } from "../../../Utils/Urls";


import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { MultiSelect } from 'primereact/multiselect';
// import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import Swal from "sweetalert2";
import { userBlock } from "../../../Utils/Urls";
// import { CustomerService } from "../../../Datas/userData";

export default function UserTable() {
    const [customers, setCustomers] = useState(null);
    const [isMounted, setIsMounted] = useState(false)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        // status: { value: null, matchMode: FilterMatchMode.EQUALS },
        is_active: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    // const [representatives] = useState([
    //     { name: 'Amy Elsner', image: 'amyelsner.png' },
    //     { name: 'Anna Fali', image: 'annafali.png' },
    //     { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    //     { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    //     { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    //     { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    //     { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    //     { name: 'Onyama Limba', image: 'onyamalimba.png' },
    //     { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    //     { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    // ]);
    // const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const authTokens = JSON.parse(localStorage.getItem('authTokens'))
    const access = authTokens.access;

    // const getSeverity = (status) => {
    //     switch (status) {
    //         case 'unqualified':
    //             return 'danger';

    //         case 'qualified':
    //             return 'success';

    //         case 'new':
    //             return 'info';

    //         case 'negotiation':
    //             return 'warning';

    //         case 'renewal':
    //             return null;
            
    //         default:
    //             return null
    //     }
    // };

    useEffect(() => {
        console.log('checking')

        axios.get(getUsers,{
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.status === 200) {
                setCustomers((getCustomers(response.data)));
                setLoading(false);
              } 
            })    
      },[access,isMounted])

    // useEffect(() => {
    //     CustomerService.getCustomersMedium().then((data) => {
    //         setCustomers(getCustomers(data));
    //         setLoading(false);
    //     });
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    // const countryBodyTemplate = (rowData) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
    //             <span>{rowData.country.name}</span>
    //         </div>
    //     );
    // };

    const representativeBodyTemplate = (rowData) => {
        const image = rowData.image;
        const firstName = rowData.first_name;
        const lastName = rowData.last_name

        return (
            <div className="flex align-items-center gap-2" style={{display: 'flex',justifyContent: 'start',alignItems: 'center' }}>
                <img alt={image} src={`${baseUrl}${image}`} width="32" height='32' style={{borderRadius:"50%", marginRight:"1vw" , objectFit:"cover"}} />
                <span>{`${firstName} ${lastName}`}</span>
            </div>
        );
    };

    const blockBodyTemplate = (rowData) => {
        const status = rowData.is_active;
        const userId = rowData.id

        return (
            <div className="flex align-items-center gap-2" style={{display: 'flex',justifyContent: 'start',alignItems: 'center' }}>
                <button className={status ? "red-button" : "green-button"} onClick={() => handleBlock(userId)}>{ status ? 'Block' : 'Unblock'}</button>
            </div>
        )
    }

    const handleBlock = (userId) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
        
            const url = `${userBlock}${userId}`
            axios
            .get(url, {
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


    // const representativesItemTemplate = (option) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
    //             <span>{option.name}</span>
    //         </div>
    //     );
    // };

    // const statusBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    // };

    // const statusItemTemplate = (option) => {
    //     return <Tag value={option} severity={getSeverity(option)} />;
    // };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.is_active, 'false-icon pi-times-circle': !rowData.is_active })}></i>;
    };

    // const representativeRowFilterTemplate = (options) => {
    //     return (
    //         <MultiSelect
    //             value={options.value}
    //             options={representatives}
    //             itemTemplate={representativesItemTemplate}
    //             onChange={(e) => options.filterApplyCallback(e.value)}
    //             optionLabel="name"
    //             placeholder="Any"
    //             className="p-column-filter"
    //             maxSelectedLabels={1}
    //             style={{ minWidth: '14rem' }}
    //         />
    //     );
    // };

    // const statusRowFilterTemplate = (options) => {
    //     return (
    //         <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    //     );
    // };

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={customers} paginator rows={5} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['username', 'first_name', 'last_name', 'email', 'phone']} header={header} emptyMessage="No customers found.">
                <Column header="User" filterField="username" style={{ minWidth: '12rem'}} body={representativeBodyTemplate} filter filterPlaceholder="Search by username"/>
                <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} />
                <Column field="phone" header="Phone" filter filterPlaceholder="Search by phone" style={{ minWidth: '12rem' }} />
                <Column field="is_active" header="Status" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
                <Column header=""  style={{ minWidth: '7rem' }} body={blockBodyTemplate} />
                
                
                {/* <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                <Column header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} /> */}
            </DataTable>
        </div>
    );
}

