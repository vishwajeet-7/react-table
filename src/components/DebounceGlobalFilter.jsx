import React,{useState} from "react";
import { useAsyncDebounce } from "react-table";



export const DebounceGlobalFilter = ({ filter, setFilter }) => {
  const [value,setValue] = useState(filter)

  const handleChange = useAsyncDebounce((value)=>{
    setFilter(value || undefined)
  },1000)
    return (
    <div>
      Search:{" "}
      <input value={value || ""} onChange={(e) =>{
        setValue(e.target.value)
        handleChange(e.target.value)
      }} />
    </div>
  );
};