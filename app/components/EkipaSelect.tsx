// components/EkipaSelect.js
'use client';
import { useEffect, useState } from 'react';

export type Ekipa = {
  EID: number;
  KID: number;
  OID: number;
  PGDID: number;
  ImeEkipe: string;
  Clani: string;
  StCipa?: string;
  Mentor?: string;
  StartnaSt?: number;
  UraStarta?: string;
};

type EkipaSelectProps = {
  onChange?: (ekipa: Ekipa | null) => void;
  defaultValue?: number | string;
};

export default function EkipaSelect({ onChange, defaultValue }: EkipaSelectProps) {
  const [ekipe, setEkipe] = useState<Ekipa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>(String(defaultValue ?? ''));

  useEffect(() => {
    let active = true;

    async function fetchEkipe() {
      try {
        const res = await fetch('/api/ekipa');
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || 'Napaka pri nalaganju ekip');
        if (active) setEkipe(json.data as Ekipa[]);
      } catch (err) {
        if (active) setError((err as Error).message);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchEkipe();
    return () => {
      active = false;
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelected(value);
    const ekipa = ekipe.find((k) => String(k.StartnaSt) === value) ?? null;
    if (onChange) onChange(ekipa);
  }

  if (loading) return <p>Nalaganje...</p>;
  if (error) return <p style={{ color: 'red' }}>Napaka: {error}</p>;

  return (
    <select value={selected} onChange={handleChange} className="border p-2 rounded">
      <option value="">— Izberi ekipo —</option>
      {ekipe.map((e) => (
        <option key={e.EID ?? e.StartnaSt} value={String(e.StartnaSt)} data-ime={e.ImeEkipe}>
           {e.StartnaSt} - {e.ImeEkipe}
        </option>
      ))}
    </select>
  );
}