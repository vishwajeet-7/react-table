# Sorting Function

=> To add sorting functionality we use the hook useSortBy from 'react-table'
=> then we pass we modify the code at th of headers sections as

```
<th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
 <span>{column.isSorted ? (column.isSortedDesc ? <IoIosArrowDropdownCircle/> : <IoIosArrowDropupCircle/>) : ''}</span>
</th>                           
```

