// Delete Product from List By Id
export const deleteProduct = (list, id) => {
    const filter = list.filter((item) => item.productId !== id);
    return filter;
  };
  
  // Find Product Index From List
  export const findProductIndex = (list, slug) => {
    const index = list.findIndex((item) => item.slug == slug);
    return index;
  };
  
  export const findProductIndexById = (list, id) => {
    const index = list.findIndex((item) => item.productId == id);
    return index;
  };
  
  export const findCategoryIndexById = (list, id) => {
	  
    const index = list.findIndex((item) => item.categoryId == id);
    return index;
  };
  
  // Delete Category from List By Id
	export const deleteCategory = (list, id) => {
	const filter = list.filter((item) => item.categoryId !== id );
    return filter;
  };
  