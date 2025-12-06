// app/api/rezultat/route.js
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

export async function GET(request) {
  try {
    // ✅ Pridobi URL in query parametre
    const { searchParams } = new URL(request.url);
    const TID = searchParams.get('TID');

    if (!TID) {
      return NextResponse.json({ success: false, error: 'Manjka parameter TID' }, { status: 400 });
    }

    const p = await getPool();
    // ✅ Uporabi varno SQL sintakso (da se izogneš SQL injectionu)
    const [rows] = await p.query(
      'SELECT * FROM Rezultat JOIN vpisovalec ON Rezultat.VID = Vpisovalec.VID WHERE TID = ? ORDER BY Cas ASC, KazenskeTocke ASC',
      [TID]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
