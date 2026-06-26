# Setup Tabelle Supabase per Piattaforma Quiz RUI

Esegui questi comandi SQL nella console Supabase per creare le tabelle necessarie:

## 1. Creare la tabella MATERIE

```sql
create table materie (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  created_at timestamp default now()
);

-- Aggiungere dati di esempio
insert into materie (nome) values
  ('Diritto delle Assicurazioni'),
  ('Operazioni Assicurative'),
  ('Gestione del Sinistro'),
  ('Normativa e Compliance'),
  ('Prodotti Assicurativi');
```

## 2. Creare la tabella DOMANDE

```sql
create table domande (
  id uuid default gen_random_uuid() primary key,
  materia_id uuid not null references materie(id),
  testo text not null,
  risposta_a text not null,
  risposta_b text not null,
  risposta_c text not null,
  risposta_corretta char(1) not null check (risposta_corretta in ('A', 'B', 'C')),
  created_at timestamp default now()
);

-- Aggiungere domande di esempio
-- Primo, ottenere gli ID delle materie:
-- Selezionare i dati da materie e usare gli UUID nell'INSERT

-- Esempio (sostituire gli UUID con i veri ID):
insert into domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta)
values
  ('uuid-della-materia-1', 'Quale è la definizione di polizza?', 'Un contratto di assicurazione', 'Un documento amministrativo', 'Un tipo di tassa', 'A'),
  ('uuid-della-materia-1', 'Chi è il contraente?', 'La persona che stipula il contratto', 'La società assicuratrice', 'Il danno assicurato', 'A');
```

## 3. Policy RLS (Row Level Security)

Se hai abilitato RLS, aggiungi queste policy:

```sql
-- Policy per materie (lettura pubblica)
alter table materie enable row level security;

create policy "Materie lettura pubblica" on materie
  for select using (true);

-- Policy per domande (lettura pubblica)
alter table domande enable row level security;

create policy "Domande lettura pubblica" on domande
  for select using (true);
```

## 4. Indici (opzionale ma consigliato)

```sql
create index idx_domande_materia on domande(materia_id);
```

## Testing

Una volta completato, testa:
1. Accedi a http://localhost:3000/esercitazione
2. Dovresti vedere la lista delle materie
3. Seleziona una materia con lo slider
4. Clicca "Inizia Esercitazione"
5. Verifica che il quiz funzioni
