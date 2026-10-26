'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'romania2030.admin-progress.v1';
const statuses = ['Neînceput', 'În discuții', 'Pus pe pauză', 'Finalizat'] as const;
type ProgressStatus = (typeof statuses)[number];
type ProgressRecord = { status: ProgressStatus; lawFinalizedAt?: string };
type ProgressStore = Record<string, ProgressRecord>;

function isProgressStatus(value: unknown): value is ProgressStatus {
  return typeof value === 'string' && statuses.includes(value as ProgressStatus);
}

function readStore(): ProgressStore {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).flatMap(([key, value]) => {
        if (!value || typeof value !== 'object') return [];
        const record = value as Record<string, unknown>;
        if (!isProgressStatus(record.status)) return [];
        return [[key, {
          status: record.status,
          ...(typeof record.lawFinalizedAt === 'string' && Number.isFinite(new Date(record.lawFinalizedAt).getTime())
            ? { lawFinalizedAt: record.lawFinalizedAt }
            : {}),
        } satisfies ProgressRecord]];
      }),
    );
  } catch {
    return {};
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ro-RO', { dateStyle: 'long', timeZone: 'Europe/Bucharest' }).format(new Date(value));
}

export function AdminProgress({
  itemKey,
  itemLabel,
  lawId,
}: {
  itemKey: string;
  itemLabel: string;
  lawId?: string;
}) {
  const lawKey = lawId ? `law:${lawId}` : null;
  const [status, setStatus] = useState<ProgressStatus>('Neînceput');
  const [lawFinalizedAt, setLawFinalizedAt] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const sync = () => {
      const store = readStore();
      setStatus(store[itemKey]?.status ?? 'Neînceput');
      setLawFinalizedAt(lawKey ? store[lawKey]?.lawFinalizedAt ?? null : null);
      setReady(true);
    };
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) sync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [itemKey, lawKey]);

  function save(nextStatus: ProgressStatus, finalizeLaw = false) {
    const store = readStore();
    const timestamp = finalizeLaw ? new Date().toISOString() : undefined;
    if (!finalizeLaw || !lawKey || itemKey === lawKey) {
      store[itemKey] = { ...store[itemKey], status: nextStatus };
    }
    if (lawKey && finalizeLaw && timestamp) {
      store[lawKey] = { ...store[lawKey], status: 'Finalizat', lawFinalizedAt: timestamp };
    }
    if (!finalizeLaw || !lawKey || itemKey === lawKey) setStatus(nextStatus);
    if (finalizeLaw && timestamp) setLawFinalizedAt(timestamp);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      setSaveMessage('Salvat în acest browser.');
    } catch {
      setSaveMessage('Modificarea este vizibilă în această filă, dar browserul nu a putut să o salveze.');
    }
  }

  return (
    <section className="admin-progress" aria-label={`Administrare locală pentru ${itemLabel}`}>
      <div className="admin-progress-heading">
        <div>
          <p className="eyebrow">PANOU ADMINISTRATIV LOCAL</p>
          <h2>Progresul fișei</h2>
        </div>
        <span className="local-save-label">Salvat în acest browser</span>
      </div>
      <p className="admin-progress-help">Alege starea curentă pentru <b>{itemLabel}</b>. Datele se păstrează pe acest dispozitiv și nu se sincronizează între administratori.</p>
      <div className="admin-status-buttons" role="group" aria-label={`Stare pentru ${itemLabel}`}>
        {statuses.map((option) => (
          <button
            className={`admin-status-button${status === option ? ' is-active' : ''}`}
            type="button"
            key={option}
            aria-pressed={status === option}
            disabled={!ready}
            onClick={() => save(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="law-finalization">
        <div>
          <b>Proiect de lege</b>
          {lawId ? (
            lawFinalizedAt ? <p>Marcat ca finalizat la {formatDate(lawFinalizedAt)} · {lawId}</p> : <p>Confirmă separat când schița legislativă este finalizată · {lawId}</p>
          ) : <p>Nu există încă o schiță legislativă asociată acestei propuneri.</p>}
        </div>
        <button
          className="button law-finalize-button"
          type="button"
          disabled={!ready || !lawId}
          onClick={() => save('Finalizat', true)}
        >
          Marchează proiectul de lege ca finalizat
        </button>
      </div>
      <p className="admin-save-message" aria-live="polite">{saveMessage}</p>
      <p className="admin-security-note">Panoul este pentru lucru local. Nu este protejat prin cont sau parolă și nu trebuie tratat ca administrare sigură într-un site public.</p>
    </section>
  );
}
