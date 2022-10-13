


const fetchData = async (url) => {
            try {
				
				console.log("The Url is: " + url);
				
                const response = await fetch(url);
                const jsonData = await response.json();
			//	console.log(">>>>>>>fetch data from async " + json[1].id + " " + json[1].productName );
                return jsonData;
            } catch (error) {
                console.log("error", error);
            }			
		}

		
		
		export default fetchData;