
import mysql from 'serverless-mysql'; 


 const db = mysql({
  config: { 
   /*  host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD */
		
	host: "localhost",
    port: 3306,
    database: "swap4pure-db",
    user: "springstudent",
    password: "springstudent"	
  }
});

export default async function excuteQuery({ query, values }) {
  try {

    const results = await db.query(query, values);
    await db.end();
	

	
    return results;
  } catch (error) {
	//  console.log(error);
    return { error };
  }
} 