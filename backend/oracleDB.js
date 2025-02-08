import oracledb from "oracledb";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECTION,
};

export async function getDeployments() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT ticket_id, caf_id, subject, project, deployment_date FROM deployments`
    );
    return result.rows.map((row) => ({
      ticketId: row[0],
      cafId: row[1],
      subject: row[2],
      project: row[3],
      date: row[4],
    }));
  } catch (err) {
    console.error("Error fetching data from Oracle:", err);
    return [];
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to save a new deployment
export async function saveDeployment(deployment) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO deployments (ticket_id, caf_id, subject, project, deployment_date) 
       VALUES (:ticketId, :cafId, :subject, :project, TO_DATE(:date, 'YYYY-MM-DD'))`,
      deployment,
      { autoCommit: true }
    );
  } catch (err) {
    console.error("Error inserting data into Oracle:", err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
