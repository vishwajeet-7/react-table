# Sorting Function

=> To add sorting functionality we use the hook useSortBy from 'react-table'
=> then we pass we modify the code at th of headers sections as

```
<th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
 <span>{column.isSorted ? (column.isSortedDesc ? <IoIosArrowDropdownCircle/> : <IoIosArrowDropupCircle/>) : ''}</span>
</th>                           
```

# Formatting function

=> install date-fns if needed to filter the date.
=> destructure formate from 'date-fns',
=> in columns file give a property Cell like:

```
Cell:({value})=>{return format(new Date(value),'dd/mm/yyyy')}
```
whichever column you want to filter.

# Filter function

=> use the hook useGlobalFilter to use filter using some keywords

=> make a GlobalFilter.jsx component and pass the filter and setFilter as props.
=> destructure state, setGlobalFilter form useTable.
=> pass useGlobalFilter outside the object in useTable.
=> it is a client side filtering method
