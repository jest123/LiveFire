'use client';

import Image from "next/image";
import mysql from  'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import { get } from "http";
import EkipaSelect, {Ekipa} from "./components/EkipaSelect";
import { toast } from "sonner";

async function handleSubmit() {
  'use client';

  const data={
    EID: (document.getElementById('team') as HTMLInputElement).value,
    Cas: (document.getElementById('score') as HTMLInputElement).value,
    KazenskeTocke: (document.getElementById('penalty') as HTMLInputElement).value,
  }

  const response = await fetch('/api/ekipa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if(response.ok){
     toast.success("Rezultat dodan!", {
        style: {
          backgroundColor: "green", // zelena barva
          color: "white"             // bela pisava
        }
      });
     console.log("Rezultat dodan"); 
  } else {
     toast.error("Napaka pri dodajanju rezultata", {
       style: {
         backgroundColor: "red",   // rdeča barva
         color: "white"             // bela pisava
       }
     });
  }
}

export default function InputDialog() {
  return (
   <div>
    <h1 className="text-2xl font-bold mb-4">Vpis rezultata</h1>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="team">
          Ekipa
        </label>
        <EkipaSelect onChange={(ekipa: Ekipa | null) => console.log(ekipa)} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="score">
          Čas(s)
        </label>
        <input
          type="text"
          id="score"
          name="score"
          className="w-80 border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="penalty">
          Kazenske točke
        </label>
        <input
          type="text"
          id="penalty"
          name="penalty"
          className="w-80 border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Pošlji
      </button>
    </form>
  </div>
);
}
