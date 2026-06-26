# 🎯 Piattaforma Quiz RUI - Guida Completa

Abbiamo costruito una piattaforma di quiz interattiva per l'esame RUI assicurativo.

## ✅ Cosa è stato creato

### 📄 Pagine
1. **`/esercitazione`** - Selezione materie e numero di domande (con slider)
2. **`/quiz`** - Quiz interattivo con domande e risposte
3. **`/risultati`** - Risultati finali con punteggio e domande errate

### 📦 Componenti
- **`lib/quiz-context.tsx`** - Context React per gestione stato globale
- Sistema RLS Supabase pronto per la produzione

### 🎨 Stile
- Tailwind CSS v4
- Colore primario: **blue-900**
- Layout responsive con gradient dark

---

## 🚀 Step 1: Setup Database Supabase

### Crea le tabelle eseguendo questi SQL nella console Supabase:

```sql
-- Tabella MATERIE
create table materie (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  created_at timestamp default now()
);

-- Inserisci le materie
insert into materie (nome) values
  ('Diritto delle Assicurazioni'),
  ('Operazioni Assicurative'),
  ('Gestione del Sinistro'),
  ('Normativa e Compliance'),
  ('Prodotti Assicurativi');

-- Tabella DOMANDE
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

-- Indici
create index idx_domande_materia on domande(materia_id);

-- Row Level Security (se abilitato)
alter table materie enable row level security;
alter table domande enable row level security;

create policy "materie_select" on materie for select using (true);
create policy "domande_select" on domande for select using (true);
```

---

## 🚀 Step 2: Popola il Database

### Ottenere gli UUID delle materie:
```sql
select id, nome from materie;
```

### Inserire le domande (vedi file `DOMANDE_ESEMPIO.sql`)

Sostituisci i placeholder `materia-uuid-1`, `materia-uuid-2` ecc. con i veri UUID ottenuti sopra.

---

## ✨ Step 3: Testare l'Applicazione

1. **Accedi al dashboard**: http://localhost:3000/dashboard
2. **Clicca su "Inizia esercitazione"**
3. **Seleziona le materie e il numero di domande**
4. **Clicca "Inizia Esercitazione"**
5. **Rispondi alle domande** - clicca su una risposta, poi "Mostra Risposta Corretta"
6. **Prosegui** con le domande successive
7. **Vedi risultati** alla fine

---

## 📊 Struttura Dati

### Tabella: `materie`
```
| id (uuid) | nome (text) | created_at (timestamp) |
```

### Tabella: `domande`
```
| id (uuid) | materia_id (uuid) | testo (text) | risposta_a (text) | 
| risposta_b (text) | risposta_c (text) | risposta_corretta (char) | created_at (timestamp) |
```

---

## 🎮 Flusso dell'Applicazione

```
Dashboard
    ↓
/esercitazione (selezione materie + slider)
    ↓
/quiz (domanda per domanda)
    ↓
/risultati (punteggio e analisi)
```

---

## 🔧 File Creati

```
app/
  ├── esercitazione/
  │   └── page.tsx          # Selezione materie
  ├── quiz/
  │   └── page.tsx          # Quiz interattivo
  ├── risultati/
  │   └── page.tsx          # Risultati finali
  └── layout.tsx            # Aggiunto QuizProvider

lib/
  └── quiz-context.tsx      # State management globale

SETUP_SUPABASE.md           # Istruzioni setup
DOMANDE_ESEMPIO.sql         # Domande di esempio
README_QUIZ.md              # Questa guida
```

---

## 💡 Personalizzazioni

### Cambiare colore primario
Sostituisci `blue-900` con un altro colore Tailwind nei file:
- `app/esercitazione/page.tsx`
- `app/quiz/page.tsx`
- `app/risultati/page.tsx`

### Aggiungere più domande
Esegui INSERT SQL nella tabella `domande`:
```sql
insert into domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta)
values
  ('uuid-materia', 'Domanda?', 'Risposta A', 'Risposta B', 'Risposta C', 'A');
```

### Limitare il numero massimo di domande
Modifica il valore `max="20"` nel file `app/esercitazione/page.tsx`

---

## 🐛 Troubleshooting

### "Nessuna materia visualizzata"
- ✅ Verifica che la tabella `materie` contenga dati
- ✅ Controlla le Supabase Row Level Security (RLS) policies

### "Quiz non carica domande"
- ✅ Verifica che la tabella `domande` abbia dati
- ✅ Controlla che le `domande.materia_id` corrispondano agli `materie.id`

### Errore di build TypeScript
- ✅ Questi file sono già tipizzati correttamente

---

## 📱 Features Implementate

✅ **Pagina Esercitazione**
- Lista materie dinamica da DB
- Slider per selezionare numero domande
- Validazione selezione

✅ **Pagina Quiz**
- Una domanda alla volta
- 3 scelte (A, B, C)
- Barra di progresso
- Pulsante "Mostra Risposta Corretta"
- Feedback visivo (verde/rosso)
- Contatore domanda

✅ **Pagina Risultati**
- Punteggio finale
- Percentuale di successo
- Lista dettagliata domande sbagliate
- Pulsante ricomincia

---

## 🔐 Sicurezza

- Supabase RLS policies configurate per lettura pubblica
- Stato gestito lato client con React Context
- Query Supabase filtrate per evitare SQL injection

---

## 📝 Note

- Tutte le domande vengono mescolate casualmente
- Le risposte vengono tracciate automaticamente
- Il state persiste solo durante la sessione corrente
- All'exit dall'app, lo stato viene resettato
