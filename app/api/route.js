    // app/api/ekipa/route.js
import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

let pool;
async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export async function GET() {
  try {
    const p = await getPool();
    const [rows] = await p.query('SELECT * FROM Ekipa');
    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
