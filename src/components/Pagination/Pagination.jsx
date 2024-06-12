import React, { useMemo } from "react"
import './Pagination.module.css'
import PaginationButton from "../PaginationButton/PaginationButton";

export default function Pagination(props) {
  const {activePage, updatePage, pagesCount} = props;


  const pagesArray = useMemo(() => Array.from({length: pagesCount}, (_,i) => i+1), [pagesCount]) 


  return <div className="pagination">
    {pagesArray.map((button) => (
    <PaginationButton 
    key={button} 
    active={activePage === button}
    updatePage= {()=> updatePage(button)}
    >{button}</PaginationButton>
  ))}</div>

}
    