import {format} from 'date-fns'
import { ColumnFilter } from './ColumnFilter'

//removed the Filter in each object as using a new default column with filter 

export const COLUMNS = [
    {
        Header:"ID",
        Footer:"ID",
        accessor:"id",
        //Filter:ColumnFilter,
        // to disable a filter on a column || if it is simply removed then the website will be broken
        disableFilters:true
    },
    {
        Header:'First Name',
        Footer:'First Name',
        accessor:"first_name",
        //Filter:ColumnFilter
    },
    {
        Header:'Last Name',
        Footer:'Last Name',
        accessor:"last_name",
        //Filter:ColumnFilter
    },
    {
        Header:'Date of Birth',
        Footer:'Date of Birth',
        accessor:"date_of_birth",
        //Filter:ColumnFilter,
        //to format a column
        Cell:({value})=>{return format(new Date(value),'dd/mm/yyyy')}
    },
    {
        Header:'Country',
        Footer:'Country',
        accessor:"country",
        //Filter:ColumnFilter
    },
    {
        Header:'Phone',
        Footer:'Phone',
        accessor:"phone",
        //Filter:ColumnFilter
    },
    {
        Header:'Age',
        Footer:'Age',
        accessor:"age",
        //Filter:ColumnFilter
    },
    {
        Header:'Email',
        Footer:'Email',
        accessor:"email",
        //Filter:ColumnFilter
    },
]

//To group columns based on a specific type
export const GROUPED_COLUMNS = [
    {
        Header:'ID',
        Footer:'ID',
        accessor:'id',
    },
    {
        Header:'Name',
        Footer:'Name',
        columns:[
            {
                Header:'First Name',
                Footer:'First Name',
                accessor:"first_name",
            },
            {
                Header:'Last Name',
                Footer:'Last Name',
                accessor:"last_name",
            }
        ]
    },
    {
        Header:'Info',
        Footer:'Info',
        columns:[
            {
                Header:'Date of Birth',
                Footer:'Date of Birth',
                accessor:"date_of_birth",
            },
            {
                Header:'Country',
                Footer:'Country',
                accessor:"country",
            },
            {
                Header:'Phone',
                Footer:'Phone',
                accessor:"phone",
            },
            {
                Header:'Age',
                Footer:'Age',
                accessor:"age",
            },
            {
                Header:'Email',
                Footer:'Email',
                accessor:"email",
            }
        ]
    }
]