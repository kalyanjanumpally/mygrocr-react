import MenuItemsComponent from '../admin/menuItemsComponent';


const DropdownComponent = ({ submenus, dropdown, depthLevel }) => {
	
	 depthLevel = depthLevel + 1;
	const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
	
  return (

   <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
		{submenus.map((submenu, index) => (
		<MenuItemsComponent items={submenu} key={index} depthLevel={depthLevel} />
   ))}
  </ul>
  
  
  )
};

export default DropdownComponent;



