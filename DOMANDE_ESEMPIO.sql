-- Script SQL per popolare le tabelle di esempio
-- Esegui prima SETUP_SUPABASE.md, poi questo script

-- Dopo aver creato materie, recupera gli UUID con:
-- select id, nome from materie;

-- Sostituisci gli UUID nei VALUES con gli ID reali delle materie

-- DOMANDE PER MATERIA 1: Diritto delle Assicurazioni
-- Usa l'UUID di "Diritto delle Assicurazioni"
INSERT INTO domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta) VALUES
('materia-uuid-1', 'Quale è la definizione corretta di contratto assicurativo?', 'Accordo con cui l''assicurato trasferisce il rischio all''assicuratore', 'Contratto di compravendita di beni', 'Accordo di prestito monetario', 'A'),
('materia-uuid-1', 'Chi è il contraente in una polizza?', 'La persona che stipula il contratto', 'La persona che riceve il risarcimento', 'La persona che subisce il danno', 'A'),
('materia-uuid-1', 'Chi è l''assicurato?', 'Il soggetto esposto al rischio', 'Chi gestisce i sinistri', 'Chi riscuote i premi', 'A'),
('materia-uuid-1', 'Chi è il beneficiario?', 'Colui a favore di cui è previsto il pagamento dell''indennizzo', 'Chi stipula la polizza', 'L''assicuratore', 'A'),
('materia-uuid-1', 'Qual è la definizione di rischio assicurativo?', 'L''evento incerto che determina la prestazione dell''assicuratore', 'Il premio pagato dall''assicurato', 'La durata della polizza', 'A');

-- DOMANDE PER MATERIA 2: Operazioni Assicurative
-- Usa l'UUID di "Operazioni Assicurative"
INSERT INTO domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta) VALUES
('materia-uuid-2', 'Cos''è il premio assicurativo?', 'Il prezzo pagato dall''assicurato all''assicuratore', 'L''importo del risarcimento', 'La commissione dell''agente', 'A'),
('materia-uuid-2', 'Come si calcola il premio?', 'In base al rischio e alla probabilità dell''evento dannoso', 'In base al reddito dell''assicurato', 'Fisso per tutte le polizze', 'A'),
('materia-uuid-2', 'Cosa indica il massimale?', 'L''importo massimo che l''assicuratore paga', 'Il valore del premio', 'L''importo minimo assicurato', 'A'),
('materia-uuid-2', 'Cosa significa "decorrenza polizza"?', 'La data di inizio della copertura assicurativa', 'La data di scadenza', 'La data del primo sinistro', 'A'),
('materia-uuid-2', 'Quale è il significato di "franchigia"?', 'La parte del danno a carico dell''assicurato', 'Il premio annuale', 'La scadenza della polizza', 'A');

-- DOMANDE PER MATERIA 3: Gestione del Sinistro
-- Usa l'UUID di "Gestione del Sinistro"
INSERT INTO domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta) VALUES
('materia-uuid-3', 'Cosa è un sinistro?', 'Il verificarsi dell''evento assicurato che determina la prestazione dell''assicuratore', 'Un errore amministrativo', 'Un tipo di polizza', 'A'),
('materia-uuid-3', 'Quali sono i tempi di denuncia del sinistro?', 'Entro i termini previsti dal contratto (solitamente 30-60 giorni)', 'Entro 1 anno', 'Non esiste un termine', 'A'),
('materia-uuid-3', 'Cosa deve contenere la denuncia di sinistro?', 'Descrizione dell''accaduto, data, lugar, danni e vittime', 'Solo la data dell''evento', 'Solo l''importo del danno', 'A'),
('materia-uuid-3', 'Chi liquida il sinistro?', 'L''assicuratore attraverso i propri uffici o periti', 'L''assicurato', 'Uno studio legale', 'A'),
('materia-uuid-3', 'Cosa è la perizia nel sinistro?', 'L''accertamento tecnico dell''entità del danno', 'La documentazione della polizza', 'Il pagamento del risarcimento', 'A');

-- DOMANDE PER MATERIA 4: Normativa e Compliance
-- Usa l'UUID di "Normativa e Compliance"
INSERT INTO domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta) VALUES
('materia-uuid-4', 'Cosa è l''IVASS?', 'Istituto di Vigilanza sulle Assicurazioni', 'Un tipo di assicurazione', 'Un premio assicurativo', 'A'),
('materia-uuid-4', 'Qual è il codice normativo principale per le assicurazioni in Italia?', 'Codice delle Assicurazioni Private (art. 209 e ss)', 'Codice Civile solo', 'Codice della Privacy', 'A'),
('materia-uuid-4', 'Cosa stabilisce l''art. 1904 del Codice Civile?', 'L''obbligo della massima buona fede nei contratti assicurativi', 'Il calcolo del premio', 'La definizione di sinistro', 'A'),
('materia-uuid-4', 'Cosa significa compliance in ambito assicurativo?', 'Conformità alle normative e alle disposizioni di legge', 'Un tipo di polizza', 'Una commissione', 'A'),
('materia-uuid-4', 'Chi controlla il rispetto delle norme nel settore assicurativo?', 'L''IVASS (Istituto di Vigilanza)', 'Il Comune', 'La Banca', 'A');

-- DOMANDE PER MATERIA 5: Prodotti Assicurativi
-- Usa l'UUID di "Prodotti Assicurativi"
INSERT INTO domande (materia_id, testo, risposta_a, risposta_b, risposta_c, risposta_corretta) VALUES
('materia-uuid-5', 'Quali sono le principali classi di assicurazioni?', 'Danni, Vita, Responsabilità civile', 'Mutui e Prestiti', 'Investimenti Finanziari', 'A'),
('materia-uuid-5', 'Cosa copre l''assicurazione incendio?', 'Danni causati da incendio al bene assicurato', 'Solo gli incendi boschivi', 'Solo le abitazioni', 'A'),
('materia-uuid-5', 'Cos''è l''assicurazione sulla vita?', 'Polizza che prevede un capitale o una rendita in caso di morte o altro evento', 'Assicurazione dell''auto', 'Assicurazione della casa', 'A'),
('materia-uuid-5', 'Cosa copre la responsabilità civile?', 'I danni cagionati dall''assicurato a terzi', 'I danni dell''assicurato', 'I danni all''assicurazione', 'A'),
('materia-uuid-5', 'Cos''è l''assicurazione furto e rapina?', 'Assicurazione contro furti e rapine di beni mobili', 'Assicurazione medica', 'Assicurazione viaggi', 'A');

-- NOTA IMPORTANTE:
-- Ricordati di sostituire i valori 'materia-uuid-1', 'materia-uuid-2', ecc.
-- con i veri UUID ottenuti dalla tabella materie.
-- 
-- Per ottenere gli UUID, esegui:
-- SELECT id, nome FROM materie;
