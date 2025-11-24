import { Database } from '.database-js';
const connectionString ='sqlite://my-databse.sqlite';
const db= new Database(connectionString);
async function runDatabaseApp(){
    console.log('---1. Initializing Database and Creating table---');
    try{
        const createResult= await.db.query('
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT null,
                email TEXT UNIQUE NOT null
            );
        ');
        console.log('Table users ensured to exist.');
        console.log('\n--- 2. Inserting Data into Table---);
        const userName='John Doe';
        const userEmail='johndoe@example.com';
        const insertResult= await db.insert('
            INSERT INTO users(name, email) VALUES(?, ?);
            ', [userName, userEmail]);
        console.log('Successfully inserted user: ${userName} with ID: ${insertResult.LastInsertID}');
        console.log('\n--- 3. Querying Data from table---');
        const selectResult= await db.query('SELECT id, name, email FROM users;');

        if (selectResult.length === 0){
            console.log('Found users:');
            selectResult.forEach(user => {
                console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
            })
        }
    )
    }
}