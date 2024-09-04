
const { Client } = require("pg");
const logger = require('./logger');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



const tableExists = async (tableName) => {
    try {
        const result = await client.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                AND table_name = $1
            );
        `, [tableName]);
        return result.rows[0].exists;
    } catch (err) {
        logger.error("Error checking table existence:", err.message);
        throw err;
    }
};

const createTables = async () => {
    try {
        await client.connect();
        logger.info("Connected to the database.");

        // Define table creation queries
        const createUsersTableQuery = `
            CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR NOT NULL,
            confirmpassword VARCHAR NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            access_token VARCHAR,
            role_id INTEGER REFERENCES roles(role_id),
            created_at TIMESTAMP,
            updated_at TIMESTAMP
            );
        `;

        const createComplaintsTableQuery = `
            CREATE TABLE complaints (
                complaint_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id),
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                status VARCHAR(50) NOT NULL,
                assigned_to INTEGER REFERENCES roles(role_id),
                additional_text TEXT,
                media TEXT
            );
        `;

        const createRolesTableQuery = `
            CREATE TABLE roles (
                role_id INTEGER PRIMARY KEY,
                role_name VARCHAR(30) NOT NULL,
                hierarchy_level VARCHAR NOT NULL
            );
        `;

        const createComplaintHistoryTableQuery = `
            CREATE TABLE complaint_history (
                history_id SERIAL PRIMARY KEY,
                complaint_id INTEGER REFERENCES complaints(complaint_id),
                newly_assigned_to INTEGER REFERENCES roles(role_id),
                previously_assigned_to INTEGER REFERENCES roles(role_id)
            );
        `;
        const insertrolestable = `INSERT INTO public.roles (role_id, role_name, hierarchy_level) 
        VALUES
            (0,'ADMIN','V0'),
            (1, 'CEO', 'V1'),
            (2, 'HR', 'V2'),
            (3, 'TEAM_MANAGER', 'V3'),
            (4, 'TEAM_LEAD', 'V4'),
            (5, 'EMPLOYEE', 'V5'),
            (6, 'INTERN', 'V5');`;

        // Check and create 'roles' table
        if (!(await tableExists('roles'))) {
            await client.query(createRolesTableQuery);
            await client.query(insertrolestable);
            logger.info("Roles table created successfully.");
        } else {
            logger.info("Roles table already exists.");
        }

        // Check and create 'users' table
        if (!(await tableExists('users'))) {
            await client.query(createUsersTableQuery);
            logger.info("Users table created successfully.");
        } else {
            logger.info("Users table already exists.");
        }

        // Check and create 'complaints' table
        if (!(await tableExists('complaints'))) {
            await client.query(createComplaintsTableQuery);
            logger.info("Complaints table created successfully.");
        } else {
            logger.info("Complaints table already exists.");
        }

        // Check and create 'complaint_history' table
        if (!(await tableExists('complaint_history'))) {
            await client.query(createComplaintHistoryTableQuery);
            logger.info("Complaint history table created successfully.");
        } else {
            logger.info("Complaint history table already exists.");
        }

    } catch (err) {
        logger.error("Error creating tables:", err.message);
    }
};

createTables().catch(err => logger.error('Error running table creation:', err));

module.exports = client;
