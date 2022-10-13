import DropdownComponent from './DropdownComponent';
import { useState } from "react";

const MenuItemsComponent = ({ items, depthLevel }) => {
	
	const [dropdown, setDropdown] = useState(false);
	
  return (
    <li className="menu-items">
      {items.submenu ? (
        <>
		<div onMouseEnter={() => setDropdown((prev) => !prev)}  onMouseLeave={() => setDropdown((prev) => !prev)}> 
			  <button type="button" aria-haspopup="menu"
			   aria-expanded={dropdown ? "true" : "false"}
			  >
			   
				{items.title}{' '}
				{depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
			 </button>
			  <DropdownComponent submenus={items.submenu}  dropdown={dropdown} depthLevel={depthLevel}/>
		</div>  
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
	);
};

export default MenuItemsComponent;