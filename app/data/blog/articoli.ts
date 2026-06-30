export type Articolo = {
  slug: string
  titolo: string
  descrizione: string
  data: string
  minuti: number
  immagine?: string
  contenuto: string
}

export const articoli: Articolo[] = [
  {
    slug: 'esame-ocf-2026-guida-completa',
    titolo: 'Esame OCF 2026: tutto quello che devi sapere prima di iscriverti',
    descrizione: 'Sessioni, struttura della prova, punteggio e materie d\'esame: la guida completa e aggiornata per chi vuole iscriversi all\'Albo dei Consulenti Finanziari.',
    data: '2026-01-20',
    minuti: 7,
    immagine: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
    contenuto: `
## Cos'è la prova valutativa OCF?

La prova valutativa OCF è l'esame obbligatorio gestito dall'**OCF** (Organismo di vigilanza e tenuta dell'Albo unico dei Consulenti Finanziari) per chi vuole iscriversi all'**Albo unico dei Consulenti Finanziari**, nella sezione dei consulenti abilitati all'offerta fuori sede o autonomi.

Si tratta di un'abilitazione professionale obbligatoria: senza superarla non è possibile esercitare la professione di consulente finanziario né essere assunti da una rete come consulente abilitato. Una volta superato, l'esame non scade.

## Come si svolge: tutto online

Dal 2020 l'esame OCF si svolge **esclusivamente a distanza**: nessuna trasferta, nessuna sede fisica. Si sostiene da casa propria, ma sotto sorveglianza video continua di un commissario in collegamento.

Le regole sono rigide: webcam attiva per tutta la durata, microfono aperto, schermo condiviso, stanza isolata e sgombra da appunti o dispositivi non autorizzati. Eventuali violazioni rilevate dal commissario comportano l'annullamento immediato della prova, senza rimborso del contributo versato.

## Le sessioni del 2026

Per il 2026 l'OCF ha indetto **5 sessioni**, ciascuna con **2 appelli**, per un totale di 10 appelli distribuiti durante l'anno (esclusi gennaio e agosto):

- **Sessione I**: febbraio / marzo
- **Sessione II**: aprile / maggio
- **Sessione III**: giugno / luglio
- **Sessione IV**: settembre / ottobre
- **Sessione V**: novembre / dicembre

Le date precise di ogni appello vengono pubblicate sul portale ufficiale organismocf.it e possono variare in base al numero di domande di partecipazione ricevute.

## Come funziona il punteggio: non è una semplice percentuale

A differenza di molti altri esami, il punteggio OCF non si calcola semplicemente contando le risposte corrette su 60. La prova è composta da **54 quesiti**, divisi in due categorie:

- **36 quesiti da 2 punti** (di cui 11 quesiti pratici, con scenari più articolati)
- **18 quesiti da 1 punto** (nozioni dirette, definizioni)

Per superare l'esame serve raggiungere **80 punti su 100**. Questo significa che le domande da 2 punti contano il doppio: rispondendo correttamente a tutte le 36 domande da 2 punti si arriva già a 80 punti, prima ancora di toccare quelle da 1 punto.

Capire questa distinzione cambia la strategia il giorno dell'esame: se sei in ritardo con il tempo, conviene concentrarsi sulle domande da 2 punti piuttosto che perdere tempo su quelle da 1.

## Le materie della prova

I 54 quesiti sono distribuiti su 5 materie, con pesi molto diversi tra loro:

- **Diritto del mercato finanziario e disciplina dei consulenti** — 24 quesiti
- **Matematica finanziaria, mercati e strumenti** — 19 quesiti
- **Diritto tributario del mercato finanziario** — 6 quesiti
- **Previdenza e assicurazioni** — 6 quesiti
- **Diritto privato e commerciale** — 5 quesiti

Diritto dei mercati e matematica finanziaria insieme valgono quasi tre quarti del punteggio totale. È una distribuzione che conviene tenere bene a mente quando si organizza lo studio.

## Cosa succede se non superi l'esame

Se non superi la prova, puoi ripeterla quante volte vuoi, senza limiti. L'unico vincolo è temporale: ogni nuovo tentativo richiede una nuova iscrizione, il pagamento del contributo e il rispetto delle finestre delle sessioni successive.

## Come iscriversi

L'iscrizione avviene esclusivamente tramite l'**area riservata del portale OCF** (organismocf.it), con registrazione preventiva. La procedura richiede:

1. Registrazione e accesso al profilo personale
2. Selezione della sessione e dell'appello desiderati
3. Caricamento del documento di identità in corso di validità
4. Versamento del contributo di partecipazione tramite PagoPA
5. Invio della domanda entro l'orario di chiusura indicato per l'appello scelto

Per sostenere la prova è necessario un PC con webcam frontale e un dispositivo mobile dotato di telecamera, secondo i requisiti tecnici pubblicati nel bando.

## Conclusione

L'esame OCF richiede di conoscere bene non solo le materie, ma anche il meccanismo di punteggio: capire che le domande da 2 punti valgono il doppio aiuta a gestire meglio il tempo e a impostare una strategia di risposta efficace.

Con una preparazione mirata sulle due materie principali — diritto dei mercati e matematica finanziaria — e un buon allenamento sulle domande pratiche, superare la prova alla prima sessione utile è un obiettivo realistico per la maggior parte dei candidati.
    `
  },
  {
    slug: 'materie-esame-ocf-come-studiarle',
    titolo: 'Le materie dell\'esame OCF: come sono distribuite e da dove iniziare',
    descrizione: 'Analisi delle 5 materie della prova valutativa OCF con il peso ufficiale di ciascuna e una strategia di studio basata sulla reale distribuzione dei punti.',
    data: '2026-02-10',
    minuti: 6,
    immagine: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    contenuto: `
## Una distribuzione molto sbilanciata

L'esame OCF si compone di 54 quesiti distribuiti su 5 materie, ma il peso di ciascuna è molto diverso. Conoscere questa distribuzione è il primo passo per organizzare lo studio in modo efficiente, evitando di dedicare lo stesso tempo a materie che valgono pesi completamente diversi nel punteggio finale.

## Le 5 materie della prova valutativa

### A. Diritto del mercato finanziario e disciplina dei consulenti — 24 quesiti

È la materia con il maggior peso, quasi la metà dei quesiti totali. Copre gli abusi di mercato, le OPA e l'appello al pubblico risparmio, i servizi e la trasparenza verso il cliente, la disciplina dell'Albo unico dei Consulenti Finanziari, la normativa antiriciclaggio, il funzionamento dei mercati, l'offerta fuori sede e le regole di vigilanza CONSOB e OCF. È la materia più normativa e richiede familiarità con il TUF (Testo Unico della Finanza) e i regolamenti attuativi.

### B. Matematica finanziaria, mercati e strumenti — 19 quesiti

Seconda materia per numero di quesiti. Comprende la costruzione e l'analisi di portafogli, i fondi comuni di investimento, gli strumenti derivati (futures, opzioni, swap), i titoli azionari e obbligazionari, i prodotti strutturati, gli strumenti di mercato monetario, le tecniche di pianificazione finanziaria, la finanza comportamentale e gli investimenti ESG. È una materia tecnica che richiede di comprendere i meccanismi, non solo di memorizzare definizioni.

### C. Diritto tributario del mercato finanziario — 6 quesiti

Copre la tassazione del risparmio gestito e diretto e le imposte indirette sui redditi finanziari. Un numero contenuto di domande ma su un argomento molto specifico, che richiede di conoscere bene le aliquote e i regimi fiscali applicati ai diversi strumenti finanziari.

### D. Previdenza e assicurazioni — 6 quesiti

Materia che comprende i contratti assicurativi, i profili tecnici e fiscali delle polizze, le competenze IVASS, il sistema della previdenza obbligatoria e complementare, il TFR e le diverse tipologie di polizze assicurative. Argomento trasversale tra finanza e previdenza, utile anche per chi proviene dal settore assicurativo.

### E. Diritto privato e commerciale — 5 quesiti

La materia con il minor numero di quesiti. Copre le obbligazioni e i contratti, i diritti reali, il diritto dell'impresa e delle società, i titoli di credito e le operazioni straordinarie. Nozioni di base di diritto civile e commerciale, propedeutiche alla comprensione delle altre materie.

## Il 72% del punteggio in due sole materie

Diritto del mercato finanziario e Matematica finanziaria insieme valgono **43 quesiti su 54**, circa il 72% del totale. Questo dato cambia completamente l'approccio allo studio: chi padroneggia bene queste due materie e ha una preparazione anche solo sufficiente sulle altre tre ha buone probabilità di superare l'esame. Chi le sottovaluta, invece, rischia di non farcela anche conoscendo perfettamente le materie minori.

## Come distribuire il tempo di studio

Una distribuzione efficace del tempo, basata sul peso reale delle materie, è:

- **Diritto del mercato finanziario**: 35% del tempo
- **Matematica finanziaria**: 30% del tempo
- **Diritto tributario**: 10% del tempo
- **Previdenza e assicurazioni**: 10% del tempo
- **Diritto privato e commerciale**: 10% del tempo
- **Ripasso generale e simulazioni**: 5% del tempo

## Domande pratiche vs domande dirette

Tra i 36 quesiti da 2 punti, 11 sono **quesiti pratici**: richiedono di applicare un concetto a uno scenario concreto, non solo di ricordare una definizione. Questi quesiti si trovano soprattutto nell'area di matematica finanziaria (calcolo di rendimenti, valutazione di portafogli) e nel diritto dei mercati (casi applicativi di normativa).

Allenarsi su questo tipo di domande richiede un metodo diverso rispetto allo studio mnemonico: bisogna esercitarsi a ragionare sui dati di uno scenario, non solo a riconoscere la risposta giusta tra quattro opzioni.

## Come affrontare le materie minori

Diritto tributario, previdenza e assicurazioni, e diritto privato valgono insieme solo 17 quesiti, ma rappresentano comunque punti importanti per superare la soglia. La strategia più efficiente è studiarle per concetti chiave e definizioni dirette, senza approfondire eccessivamente i dettagli tecnici: i quesiti su queste materie sono in prevalenza domande dirette da 1 punto.

**FormazioneOCF** include oltre 5.000 domande della banca dati ufficiale aggiornata, organizzate per le 5 aree tematiche del bando, con sistema di priorità sulle domande sbagliate per concentrare lo studio dove serve davvero.
    `
  }
]