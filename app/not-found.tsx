import Link from "next/link";
export default function NotFound(){return <section className="container content-section empty-state"><p className="eyebrow">404 · PAGINĂ NEGĂSITĂ</p><h1>Nu am găsit această pagină.</h1><p>Verifică adresa sau revino la catalogul de propuneri.</p><Link className="button primary" href="/reforme">Deschide catalogul</Link></section>}
