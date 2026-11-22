/* Course content: shared helpers, the level list and the A1 course.
   A2 and B1 live in js/courses/ and register themselves through DE_DATA.addUnits().
   Plain scripts (no modules, no fetch) so index.html works straight from disk.
   In tip/sheet HTML, {{text}} becomes a tappable chip that speaks the German text. */
(function (root) {
  'use strict';

  const n = (art, de, pl, en, ex, exEn) => ({ art, de, pl, en, ex, exEn });   // noun
  const x = (de, en, ex, exEn) => ({ de, en, ex, exEn });                     // anything else
  const s = (de, en, alt) => ({ de, en, alt: alt || [] });                    // sentence (+ accepted word orders)
  /* Gap-fill ("Sprachbausteine" in telc exams): `de` holds exactly one ___, `answer` fills it,
     `wrong` lists three wrong options, `why` is a one-line reason shown after answering. */
  const c = (de, answer, wrong, en, why) => ({ de, answer, wrong, en, why: why || '' });
  /* Dialogue line, and a question about it: the first option is the right one (shuffled when shown). */
  const d = (who, de, en) => ({ who, de, en });
  const q = (de, en, opts) => ({ de, en, opts });
  /* Writing tasks. Form field: `show` is a right answer; it passes if every word in `all` appears,
     or its digits equal one of `digits`. Message point: passes if any key starts a word (keys in
     the normalised form of util.js norm: lower case, ä -> ae, ß -> ss). */
  const f = (label, en, show, rule) => Object.assign({ label, en, show }, rule);
  const p = (en, keys) => ({ en, keys });
  const g = (k, t) => '<b class="g-' + k + '">' + (t || k) + '</b>';          // gender-coloured text
  const tbl = (head, rows) =>
    '<div class="tblwrap"><table class="tbl"><thead><tr>' +
    head.map((h) => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
    rows.map((r) => '<tr>' + r.map((c) => '<td>' + c + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';

  const UNITS = [
    /* ------------------------------------------------------------------ 1 */
    {
      id: 'u1', title: 'Hallo!', sub: 'Greetings and first phrases',
      goal: 'Greet people, introduce yourself and survive the first 30 seconds of a conversation.',
      tips: [
        { h: 'Two words for “you”', html:
          `<p><b>du</b> is for friends, family, children and people your age in casual settings. <b>Sie</b> (always capitalised) is for strangers, officials, shops and work. Unsure? Use <b>Sie</b> — nobody is offended by too much politeness.</p>
           <p>{{Wie heißt du?}} · {{Wie heißen Sie?}}</p>` },
        { h: 'Greetings follow the clock', html:
          `<p>{{Guten Morgen}} until about 11, {{Guten Tag}} during the day, {{Guten Abend}} from about 6 pm. {{Hallo}} works any time. {{Gute Nacht}} is only for going to bed.</p>` },
        { h: 'bitte does four jobs', html:
          `<p><b>bitte</b> means <i>please</i>, <i>you’re welcome</i>, <i>here you go</i> and (as {{Wie bitte?}}) <i>pardon?</i> One word, huge mileage.</p>` },
      ],
      words: [
        x('Hallo', 'hello', 'Hallo, wie geht’s?', 'Hello, how are you?'),
        x('Guten Morgen', 'good morning'),
        x('Guten Tag', 'good day (formal hello)'),
        x('Guten Abend', 'good evening'),
        x('Gute Nacht', 'good night'),
        x('Tschüss', 'bye'),
        x('Auf Wiedersehen', 'goodbye (formal)'),
        x('Bis später', 'see you later'),
        x('bitte', 'please; you’re welcome', 'Einen Kaffee, bitte.', 'A coffee, please.'),
        x('danke', 'thank you', 'Danke schön!', 'Thank you very much!'),
        x('ja', 'yes'),
        x('nein', 'no'),
        x('Entschuldigung', 'excuse me; sorry', 'Entschuldigung, wo ist der Bahnhof?', 'Excuse me, where is the train station?'),
        x('Wie geht’s?', 'How are you? (informal)', 'Wie geht’s? — Gut, danke!', 'How are you? — Good, thanks!'),
        x('gut', 'good; well'),
        x('Wie bitte?', 'Pardon? (I didn’t catch that)'),
        x('genau', 'exactly', 'Ja, genau!', 'Yes, exactly!'),
        x('Kein Problem', 'no problem'),
        /* more A1 words */
        n('der', 'Name', 'Namen', 'name', 'Mein Name ist Alice.', 'My name is Alice.'),
        n('der', 'Vorname', 'Vornamen', 'first name', 'Wie ist Ihr Vorname?', 'What is your first name?'),
        n('die', 'Adresse', 'Adressen', 'address', 'Wie ist deine Adresse?', 'What is your address?'),
        n('die', 'Telefonnummer', 'Telefonnummern', 'phone number', 'Meine Telefonnummer ist 0176 234 567.', 'My phone number is 0176 234 567.'),
        n('das', 'Land', 'Länder', 'country', 'Aus welchem Land kommst du?', 'Which country are you from?'),
        n('die', 'Sprache', 'Sprachen', 'language', 'Ich spreche zwei Sprachen.', 'I speak two languages.'),
        x('Deutsch', 'German (language)', 'Ich lerne Deutsch.', 'I am learning German.'),
        x('Englisch', 'English (language)', 'Sprichst du Englisch?', 'Do you speak English?'),
        x('Herzlich willkommen!', 'welcome!'),
        x('Es tut mir leid.', 'I am sorry.'),
        x('Gern geschehen.', 'you are welcome; my pleasure', 'Danke! Gern geschehen.', 'Thanks! My pleasure.'),
        x('Bis bald!', 'see you soon'),
      ],
      sentences: [
        s('Ich heiße Alice.', 'My name is Alice.'),
        s('Wie heißt du?', 'What is your name? (informal)'),
        s('Woher kommst du?', 'Where are you from?'),
        s('Ich komme aus Indien.', 'I come from India.'),
        s('Mir geht es gut.', 'I am doing well.', ['Es geht mir gut.']),
        s('Freut mich!', 'Nice to meet you!'),
        s('Sprechen Sie Englisch?', 'Do you speak English? (formal)'),
        s('Ich verstehe nicht.', 'I don’t understand.'),
      ],
      dialog: {
        title: 'Im Deutschkurs', setting: 'Alice and Bob meet on the first day of a German course.',
        lines: [
          d('Alice', 'Hallo! Ich heiße Alice. Wie heißt du?', 'Hello! My name is Alice. What is your name?'),
          d('Bob', 'Hallo, Alice! Mein Name ist Bob.', 'Hi, Alice! My name is Bob.'),
          d('Alice', 'Freut mich! Woher kommst du?', 'Nice to meet you! Where are you from?'),
          d('Bob', 'Ich komme aus Kanada. Und du?', 'I come from Canada. And you?'),
          d('Alice', 'Ich komme aus Indien. Wie geht’s?', 'I come from India. How are you?'),
          d('Bob', 'Gut, danke! Sprichst du Englisch?', 'Good, thanks! Do you speak English?'),
          d('Alice', 'Ja, aber hier sprechen wir Deutsch!', 'Yes, but here we speak German!'),
          d('Bob', 'Genau! Bis später, Alice.', 'Exactly! See you later, Alice.'),
        ],
        questions: [
          q('Woher kommt Bob?', 'Where does Bob come from?', ['aus Kanada', 'aus Indien', 'aus Deutschland']),
          q('Wer kommt aus Indien?', 'Who comes from India?', ['Alice', 'Bob', 'Alice und Bob']),
          q('Welche Sprache sprechen sie im Kurs?', 'Which language do they speak in the course?', ['Deutsch', 'Englisch', 'Spanisch']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 2 */
    {
      id: 'u2', title: 'Sounds', sub: 'Read any German word out loud',
      goal: 'German spelling is consistent. Learn about a dozen rules and you can pronounce anything.',
      tips: [
        { h: 'Vowel pairs', html:
          tbl(['Spelling', 'Sounds like', 'Listen'], [
            ['<b>ei</b>', '“eye”', '{{Wein}} {{zwei}}'],
            ['<b>ie</b>', '“ee”', '{{Bier}} {{sieben}}'],
            ['<b>eu / äu</b>', '“oy”', '{{neu}} {{heute}} {{Häuser}}'],
            ['<b>au</b>', '“ow”', '{{Haus}} {{Frau}}'],
          ]) +
          `<p class="note">Trick for ei / ie: say the English name of the <b>second</b> letter. W<b>ei</b>n → “I”, B<b>ie</b>r → “E”.</p>` },
        { h: 'Consonants that differ from English', html:
          tbl(['Spelling', 'Sounds like', 'Listen'], [
            ['<b>w</b>', 'English v', '{{Wasser}} {{Wein}}'],
            ['<b>v</b>', 'usually f', '{{Vater}} {{vier}}'],
            ['<b>z</b>', 'ts', '{{Zug}} {{zehn}}'],
            ['<b>j</b>', 'English y', '{{ja}} {{Jahr}}'],
            ['<b>s</b> + vowel', 'English z', '{{Sonne}} {{sieben}}'],
            ['<b>sch</b>', 'sh', '{{schön}} {{Schule}}'],
            ['<b>sp / st</b> at the start', 'shp / sht', '{{Sport}} {{Stadt}}'],
            ['<b>ß</b>', 'sharp ss', '{{Straße}} {{heißen}}'],
          ]) },
        { h: 'The two ch sounds', html:
          `<p>After <b>a, o, u, au</b>: a rough sound at the back of the throat, like Scottish “lo<b>ch</b>” — {{Buch}}, {{acht}}.</p>
           <p>Everywhere else: a soft hiss, like the h in “<b>h</b>uge” — {{ich}}, {{Mädchen}}, {{Milch}}.</p>` },
        { h: 'Umlauts: ä ö ü', html:
          `<p><b>ä</b> ≈ the e in “bed”: {{Käse}}. <b>ö</b>: say “ay” and round your lips: {{schön}}. <b>ü</b>: say “ee” and round your lips: {{früh}}.</p>
           <p class="note">No umlaut key? Type ae, oe, ue, ss — this app accepts both.</p>` },
        { h: 'Word endings', html:
          `<p>A final <b>-e</b> is always pronounced (a soft “uh”): {{danke}}. Final <b>-er</b> sounds like “ah”: {{Wasser}}. Final <b>b, d, g</b> harden to p, t, k: {{Tag}}, {{und}}.</p>` },
      ],
      words: [
        n('der', 'Wein', 'Weine', 'wine'),
        n('das', 'Bier', 'Biere', 'beer'),
        n('die', 'Straße', 'Straßen', 'street'),
        n('das', 'Mädchen', 'Mädchen', 'girl'),
        x('schön', 'beautiful; nice', 'Das ist schön!', 'That is nice!'),
        n('der', 'Zug', 'Züge', 'train'),
        n('das', 'Wasser', '', 'water'),
        n('der', 'Vater', 'Väter', 'father'),
        n('die', 'Mutter', 'Mütter', 'mother'),
        x('neu', 'new'),
        n('das', 'Haus', 'Häuser', 'house'),
        n('das', 'Buch', 'Bücher', 'book'),
        n('der', 'Sport', '', 'sport'),
        n('die', 'Stadt', 'Städte', 'city'),
        x('heute', 'today'),
        x('früh', 'early'),
        x('spät', 'late'),
        n('der', 'Käse', '', 'cheese'),
        n('die', 'Sonne', 'Sonnen', 'sun'),
        /* more A1 words */
        n('der', 'Stift', 'Stifte', 'pen', 'Hast du einen Stift?', 'Do you have a pen?'),
        n('das', 'Licht', 'Lichter', 'light'),
        n('die', 'Brille', 'Brillen', 'glasses (for the eyes)', 'Wo ist meine Brille?', 'Where are my glasses?'),
        n('das', 'Wort', 'Wörter', 'word', 'Das Wort ist neu.', 'The word is new.'),
        n('die', 'Seite', 'Seiten', 'page', 'Lies Seite zehn.', 'Read page ten.'),
        n('das', 'Papier', 'Papiere', 'paper'),
        n('das', 'Heft', 'Hefte', 'exercise book; notebook'),
        n('das', 'Spiel', 'Spiele', 'game'),
        x('viel', 'much; a lot', 'Ich lerne viel.', 'I am learning a lot.'),
        x('wieder', 'again', 'Heute scheint wieder die Sonne.', 'The sun is shining again today.'),
        x('wichtig', 'important', 'Das ist wichtig.', 'That is important.'),
      ],
      sentences: [
        s('Das Wasser ist kalt.', 'The water is cold.'),
        s('Die Stadt ist schön.', 'The city is beautiful.'),
        s('Das Haus ist neu.', 'The house is new.'),
        s('Es ist schon spät.', 'It is already late.'),
        s('Ich trinke Wasser.', 'I am drinking water.'),
        s('Heute scheint die Sonne.', 'The sun is shining today.', ['Die Sonne scheint heute.']),
      ],
      dialog: {
        title: 'In der Stadt', setting: 'Two friends sit outside a café on a sunny day.',
        lines: [
          d('Bob', 'Heute scheint die Sonne.', 'The sun is shining today.'),
          d('Alice', 'Ja, und die Stadt ist schön.', 'Yes, and the town is beautiful.'),
          d('Bob', 'Das Haus ist neu.', 'That house is new.'),
          d('Alice', 'Ich trinke Wasser. Und du?', 'I am drinking water. And you?'),
          d('Bob', 'Ich trinke ein Bier.', 'I am having a beer.'),
          d('Alice', 'Ein Bier? Heute? Es ist früh!', 'A beer? Today? It is early!'),
          d('Bob', 'Nein, es ist schon spät!', 'No, it is already late!'),
        ],
        questions: [
          q('Was scheint heute?', 'What is shining today?', ['die Sonne', 'das Licht', 'der Zug']),
          q('Wie ist die Stadt?', 'What is the town like?', ['schön', 'neu', 'spät']),
          q('Was trinkt Alice?', 'What is Alice drinking?', ['Wasser', 'Bier', 'Wein']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 3 */
    {
      id: 'u3', title: 'Zahlen', sub: 'Numbers, prices and age',
      goal: 'Count, understand prices and say how old you are.',
      tips: [
        { h: '13–19: unit + zehn', html:
          `<p>{{dreizehn}}, {{vierzehn}}, {{fünfzehn}} … Two shortened ones to watch: {{sechzehn}} (no s) and {{siebzehn}} (no en).</p>` },
        { h: 'Tens end in -zig', html:
          `<p>{{zwanzig}}, {{vierzig}}, {{fünfzig}} … Same two shorten again: {{sechzig}}, {{siebzig}}. One oddball: {{dreißig}} with ß.</p>` },
        { h: '21–99 are said backwards', html:
          `<p>German says the unit first: 21 = {{einundzwanzig}} (“one-and-twenty”), 45 = {{fünfundvierzig}}, 99 = {{neunundneunzig}}.</p>
           <p class="note">Numbers only stick with repetition. Use <a href="#/drills/numbers">the number drill</a> for two minutes a day.</p>` },
      ],
      words: [
        x('null', 'zero'), x('eins', 'one'), x('zwei', 'two'), x('drei', 'three'), x('vier', 'four'),
        x('fünf', 'five'), x('sechs', 'six'), x('sieben', 'seven'), x('acht', 'eight'), x('neun', 'nine'),
        x('zehn', 'ten'), x('elf', 'eleven'), x('zwölf', 'twelve'), x('zwanzig', 'twenty'),
        x('dreißig', 'thirty'), x('hundert', 'hundred'), x('tausend', 'thousand'),
        n('die', 'Zahl', 'Zahlen', 'number'),
        n('der', 'Euro', 'Euro', 'euro', 'Das kostet zehn Euro.', 'That costs ten euros.'),
        x('wie viel', 'how much', 'Wie viel kostet das?', 'How much does that cost?'),
        /* more A1 words */
        x('vierzig', 'forty'),
        x('fünfzig', 'fifty'),
        x('sechzig', 'sixty'),
        x('siebzig', 'seventy'),
        x('achtzig', 'eighty'),
        x('neunzig', 'ninety'),
        n('der', 'Cent', 'Cent', 'cent', 'Das kostet neunzig Cent.', 'That costs ninety cents.'),
        n('der', 'Preis', 'Preise', 'price', 'Der Preis ist gut.', 'The price is good.'),
        n('das', 'Geld', '', 'money', 'Ich habe kein Geld.', 'I have no money.'),
        n('das', 'Alter', '', 'age', 'Name und Alter, bitte.', 'Name and age, please.'),
        n('die', 'Nummer', 'Nummern', 'number (on a house, ticket, phone)', 'Die Nummer ist sieben.', 'The number is seven.'),
      ],
      sentences: [
        s('Wie alt bist du?', 'How old are you?'),
        s('Ich bin dreißig Jahre alt.', 'I am thirty years old.'),
        s('Was kostet das?', 'What does that cost?'),
        s('Das kostet fünf Euro.', 'That costs five euros.'),
        s('Ich habe zwei Kinder.', 'I have two children.'),
      ],
      dialog: {
        title: 'Auf dem Markt', setting: 'Bob buys cheese and water at a market stall.',
        lines: [
          d('Bob', 'Guten Tag! Was kostet der Käse?', 'Good day! How much is the cheese?'),
          d('Verkäuferin', 'Der Käse kostet fünf Euro.', 'The cheese costs five euros.'),
          d('Bob', 'Und das Wasser?', 'And the water?'),
          d('Verkäuferin', 'Das Wasser kostet neunzig Cent.', 'The water costs ninety cents.'),
          d('Bob', 'Gut. Den Käse und zwei Wasser, bitte.', 'Good. The cheese and two waters, please.'),
          d('Verkäuferin', 'Das macht sechs Euro achtzig.', 'That comes to six euros eighty.'),
          d('Bob', 'Bitte schön.', 'Here you go.'),
          d('Verkäuferin', 'Danke! Tschüss!', 'Thanks! Bye!'),
        ],
        questions: [
          q('Was kostet der Käse?', 'How much is the cheese?', ['fünf Euro', 'sechs Euro', 'neunzig Cent']),
          q('Wie viel Wasser kauft Bob?', 'How much water does Bob buy?', ['zwei Wasser', 'ein Wasser', 'drei Wasser']),
          q('Wie viel bezahlt Bob?', 'How much does Bob pay?', ['sechs Euro achtzig', 'fünf Euro neunzig', 'sieben Euro']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 4 */
    {
      id: 'u4', title: 'Der, die, das', sub: 'Nouns and their gender',
      goal: 'Name things around you and stop fearing the three articles.',
      tips: [
        { h: 'Learn article + noun as one chunk', html:
          `<p>Every noun is ${g('der')} (masculine), ${g('die')} (feminine) or ${g('das')} (neuter). The gender is mostly arbitrary, so never learn <i>Tisch</i> — learn {{der Tisch}}.</p>
           <p>This app colours them the same way everywhere: ${g('der', 'der = blue')}, ${g('die', 'die = pink')}, ${g('das', 'das = green')}. Let the colour do some of the remembering.</p>` },
        { h: 'Endings that give the gender away', html:
          tbl(['', 'Typical endings', 'Examples'], [
            [g('der'), '-er (people and machines that do things), -ling, -ismus, -or', '{{der Lehrer}} {{der Computer}}'],
            [g('die'), '-ung, -heit, -keit, -schaft, -ion, -tät, -ie, -ik · most nouns ending in -e', '{{die Zeitung}} {{die Wohnung}} {{die Lampe}}'],
            [g('das'), '-chen, -lein (diminutives, always) · -ment, -um, -o', '{{das Mädchen}} {{das Brötchen}} {{das Auto}}'],
          ]) +
          `<p class="note">These are strong tendencies, not laws: {{der Käse}} ends in -e, {{das Fenster}} in -er. The <a href="#/drills/gender">der/die/das drill</a> shows the rule whenever one applies.</p>` },
        { h: 'a / an = ein, eine', html:
          `<p>${g('der')} and ${g('das')} nouns take <b>ein</b>: {{ein Tisch}}, {{ein Auto}}. ${g('die')} nouns take <b>eine</b>: {{eine Lampe}}.</p>
           <p>Two freebies: every plural uses ${g('die')} ({{die Kinder}}), and every noun starts with a capital letter.</p>` },
      ],
      words: [
        n('der', 'Mann', 'Männer', 'man'),
        n('die', 'Frau', 'Frauen', 'woman'),
        n('das', 'Kind', 'Kinder', 'child'),
        n('der', 'Tisch', 'Tische', 'table'),
        n('der', 'Stuhl', 'Stühle', 'chair'),
        n('die', 'Lampe', 'Lampen', 'lamp'),
        n('die', 'Tür', 'Türen', 'door'),
        n('das', 'Fenster', 'Fenster', 'window'),
        n('das', 'Auto', 'Autos', 'car'),
        n('die', 'Zeitung', 'Zeitungen', 'newspaper'),
        n('die', 'Wohnung', 'Wohnungen', 'apartment'),
        n('der', 'Lehrer', 'Lehrer', 'teacher'),
        n('das', 'Brötchen', 'Brötchen', 'bread roll'),
        n('der', 'Computer', 'Computer', 'computer'),
        n('das', 'Zimmer', 'Zimmer', 'room'),
        n('die', 'Tasche', 'Taschen', 'bag'),
        /* more A1 words */
        n('der', 'Balkon', 'Balkone', 'balcony', 'Die Wohnung hat einen Balkon.', 'The flat has a balcony.'),
        n('die', 'Toilette', 'Toiletten', 'toilet'),
        n('das', 'Sofa', 'Sofas', 'sofa', 'Das Sofa ist neu.', 'The sofa is new.'),
        n('die', 'Dusche', 'Duschen', 'shower'),
        n('das', 'Foto', 'Fotos', 'photo', 'Das Foto ist schön.', 'The photo is beautiful.'),
        n('der', 'Garten', 'Gärten', 'garden', 'Das Haus hat einen Garten.', 'The house has a garden.'),
        n('die', 'Karte', 'Karten', 'card; map; ticket'),
        n('der', 'Teller', 'Teller', 'plate'),
        n('die', 'Flasche', 'Flaschen', 'bottle', 'Eine Flasche Wasser, bitte.', 'A bottle of water, please.'),
        n('der', 'Kugelschreiber', 'Kugelschreiber', 'ballpoint pen'),
        n('der', 'Kühlschrank', 'Kühlschränke', 'fridge'),
      ],
      sentences: [
        s('Das ist ein Tisch.', 'That is a table.'),
        s('Das ist eine Lampe.', 'That is a lamp.'),
        s('Der Mann ist groß.', 'The man is tall.'),
        s('Die Frau liest eine Zeitung.', 'The woman is reading a newspaper.'),
        s('Das Kind ist klein.', 'The child is small.'),
        s('Die Wohnung ist schön.', 'The apartment is nice.'),
        s('Wo ist das Auto?', 'Where is the car?'),
      ],
      dialog: {
        title: 'Die neue Wohnung', setting: 'Alice shows Bob her new flat.',
        lines: [
          d('Alice', 'Das ist die Wohnung.', 'This is the flat.'),
          d('Bob', 'Schön! Das Zimmer ist groß.', 'Nice! The room is big.'),
          d('Alice', 'Ja, und das Fenster ist groß. Hier ist der Balkon.', 'Yes, and the window is big. Here is the balcony.'),
          d('Bob', 'Und das? Ist das ein Sofa?', 'And that? Is that a sofa?'),
          d('Alice', 'Ja, das Sofa ist neu.', 'Yes, the sofa is new.'),
          d('Bob', 'Wo ist die Toilette?', 'Where is the toilet?'),
          d('Alice', 'Die Toilette und die Dusche sind hier.', 'The toilet and the shower are here.'),
          d('Bob', 'Die Wohnung ist schön, Alice!', 'The flat is lovely, Alice!'),
        ],
        questions: [
          q('Wie ist das Zimmer?', 'What is the room like?', ['groß', 'klein', 'alt']),
          q('Was ist neu?', 'What is new?', ['das Sofa', 'der Balkon', 'das Fenster']),
          q('Was hat die Wohnung?', 'What does the flat have?', ['einen Balkon', 'einen Garten', 'zwei Bäder']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 5 */
    {
      id: 'u5', title: 'Ich bin, ich habe', sub: 'Pronouns, to be, to have',
      goal: 'Talk about yourself and others with the two most used verbs in German.',
      tips: [
        { h: 'sein (to be) and haben (to have)', html:
          tbl(['', 'sein', 'haben'], [
            ['ich', '{{ich bin}}', '{{ich habe}}'],
            ['du', '{{du bist}}', '{{du hast}}'],
            ['er / sie / es', '{{er ist}}', '{{er hat}}'],
            ['wir', '{{wir sind}}', '{{wir haben}}'],
            ['ihr', '{{ihr seid}}', '{{ihr habt}}'],
            ['sie / Sie', '{{sie sind}}', '{{sie haben}}'],
          ]) +
          `<p class="note">Both are irregular, and both are everywhere. Worth drilling until automatic — try the <a href="#/drills/verbs">verb drill</a>.</p>` },
        { h: 'sie, sie, Sie', html:
          `<p>One word, three meanings — the verb tells you which: {{sie ist}} = she is · {{sie sind}} = they are · {{Sie sind}} = you are (formal, capital S).</p>` },
        { h: 'German “has” feelings', html:
          `<p>You don’t <i>be</i> hungry, you <i>have</i> hunger: {{Ich habe Hunger.}} {{Ich habe Durst.}} {{Ich habe Zeit.}}</p>` },
      ],
      words: [
        x('ich', 'I'),
        x('du', 'you (one friend)'),
        x('er', 'he'),
        x('sie', 'she; they'),
        x('es', 'it'),
        x('wir', 'we'),
        x('ihr', 'you (several friends)'),
        x('Sie', 'you (formal)'),
        x('sein', 'to be', 'Ich bin müde.', 'I am tired.'),
        x('haben', 'to have', 'Ich habe Zeit.', 'I have time.'),
        x('müde', 'tired'),
        x('glücklich', 'happy'),
        n('der', 'Hunger', '', 'hunger', 'Ich habe Hunger.', 'I am hungry.'),
        n('der', 'Durst', '', 'thirst', 'Hast du Durst?', 'Are you thirsty?'),
        n('die', 'Zeit', 'Zeiten', 'time'),
        n('der', 'Hund', 'Hunde', 'dog'),
        n('die', 'Katze', 'Katzen', 'cat'),
        n('der', 'Bruder', 'Brüder', 'brother'),
        n('die', 'Schwester', 'Schwestern', 'sister'),
        n('der', 'Freund', 'Freunde', 'friend'),
        n('die', 'Familie', 'Familien', 'family'),
        /* more A1 words */
        n('der', 'Sohn', 'Söhne', 'son', 'Mein Sohn ist zehn.', 'My son is ten.'),
        n('die', 'Tochter', 'Töchter', 'daughter'),
        n('die', 'Oma', 'Omas', 'grandma'),
        n('der', 'Opa', 'Opas', 'grandpa'),
        n('das', 'Baby', 'Babys', 'baby'),
        n('die', 'Freundin', 'Freundinnen', '(female) friend; girlfriend', 'Das ist meine Freundin.', 'This is my friend.'),
        n('der', 'Junge', 'Jungen', 'boy'),
        n('das', 'Tier', 'Tiere', 'animal', 'Hast du ein Tier?', 'Do you have a pet?'),
        x('verheiratet', 'married', 'Bist du verheiratet?', 'Are you married?'),
        x('ledig', 'single (not married)'),
        x('geschieden', 'divorced'),
        n('die', 'Person', 'Personen', 'person', 'Wir sind vier Personen.', 'There are four of us.'),
      ],
      sentences: [
        s('Ich bin müde.', 'I am tired.'),
        s('Wir sind glücklich.', 'We are happy.'),
        s('Ich habe Hunger.', 'I am hungry.'),
        s('Hast du Zeit?', 'Do you have time?'),
        s('Sie hat eine Katze.', 'She has a cat.'),
        s('Er ist mein Bruder.', 'He is my brother.'),
        s('Das ist meine Familie.', 'That is my family.'),
      ],
      dialog: {
        title: 'Fotos von der Familie', setting: 'Alice shows Bob photos of her family.',
        lines: [
          d('Alice', 'Das ist meine Familie.', 'This is my family.'),
          d('Bob', 'Wer ist das?', 'Who is that?'),
          d('Alice', 'Das ist meine Schwester. Sie hat eine Katze.', 'That is my sister. She has a cat.'),
          d('Bob', 'Und der Mann?', 'And the man?'),
          d('Alice', 'Er ist mein Bruder. Er ist verheiratet und hat einen Sohn.', 'He is my brother. He is married and has a son.'),
          d('Bob', 'Und das Baby?', 'And the baby?'),
          d('Alice', 'Das ist meine Tochter! Sie ist ein Jahr alt.', 'That is my daughter! She is one year old.'),
        ],
        questions: [
          q('Wer hat eine Katze?', 'Who has a cat?', ['die Schwester', 'der Bruder', 'die Tochter']),
          q('Ist der Bruder verheiratet?', 'Is the brother married?', ['Ja, er ist verheiratet.', 'Nein, er ist ledig.', 'Nein, er ist geschieden.']),
          q('Wer ist das Baby?', 'Who is the baby?', ['die Tochter von Alice', 'die Schwester von Alice', 'der Sohn von Bob']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 6 */
    {
      id: 'u6', title: 'Verben', sub: 'Present tense in one pattern',
      goal: 'Conjugate almost any verb and say what you do every day.',
      tips: [
        { h: 'Cut -en, add the ending', html:
          tbl(['', 'ending', 'lernen'], [
            ['ich', '-e', '{{ich lerne}}'],
            ['du', '-st', '{{du lernst}}'],
            ['er / sie / es', '-t', '{{er lernt}}'],
            ['wir', '-en', '{{wir lernen}}'],
            ['ihr', '-t', '{{ihr lernt}}'],
            ['sie / Sie', '-en', '{{sie lernen}}'],
          ]) +
          `<p class="note">Shortcut: the <b>wir</b> and <b>sie/Sie</b> forms are simply the infinitive.</p>` },
        { h: 'One present tense does it all', html:
          `<p>{{Ich lerne Deutsch.}} means <i>I learn</i>, <i>I am learning</i> and — with a time word — even <i>I will learn</i>: {{Morgen lerne ich Deutsch.}} There is no “-ing” form to worry about.</p>` },
        { h: 'A few verbs change their vowel', html:
          `<p>Only in the <b>du</b> and <b>er/sie/es</b> forms: {{sprechen}} → {{du sprichst}}, {{er spricht}} · {{lesen}} → {{du liest}} · {{sehen}} → {{du siehst}} · {{essen}} → {{du isst}} · {{fahren}} → {{du fährst}}.</p>
           <p>Stems ending in -t or -d get an extra e so you can pronounce them: {{du arbeitest}}, {{er arbeitet}}.</p>` },
      ],
      words: [
        x('machen', 'to do; to make', 'Was machst du?', 'What are you doing?'),
        x('lernen', 'to learn; to study'),
        x('wohnen', 'to live (reside)', 'Ich wohne in Berlin.', 'I live in Berlin.'),
        x('arbeiten', 'to work'),
        x('spielen', 'to play'),
        x('kommen', 'to come'),
        x('gehen', 'to go (on foot)'),
        x('trinken', 'to drink'),
        x('essen', 'to eat', 'Er isst Brot.', 'He eats bread.'),
        x('sprechen', 'to speak', 'Sie spricht Deutsch.', 'She speaks German.'),
        x('lesen', 'to read', 'Er liest ein Buch.', 'He is reading a book.'),
        x('sehen', 'to see', 'Siehst du das?', 'Do you see that?'),
        x('fahren', 'to drive; to go (by vehicle)', 'Sie fährt nach Berlin.', 'She is going to Berlin.'),
        x('kaufen', 'to buy'),
        x('brauchen', 'to need', 'Ich brauche Hilfe.', 'I need help.'),
        x('verstehen', 'to understand'),
        x('heißen', 'to be called', 'Wie heißt du?', 'What is your name?'),
        x('kosten', 'to cost'),
        /* more A1 words */
        x('schreiben', 'to write', 'Ich schreibe eine Nachricht.', 'I am writing a message.'),
        x('studieren', 'to study (at university)', 'Ich studiere in Berlin.', 'I study in Berlin.'),
        x('sagen', 'to say'),
        x('verkaufen', 'to sell'),
        x('laufen', 'to run; to walk'),
        x('kennen', 'to know (a person, a place)', 'Kennst du Bob?', 'Do you know Bob?'),
        x('wissen', 'to know (a fact)', 'Ich weiß es nicht.', 'I don’t know.'),
        x('lachen', 'to laugh'),
        x('rauchen', 'to smoke', 'Rauchen Sie?', 'Do you smoke?'),
        x('öffnen', 'to open', 'Öffnen Sie das Fenster, bitte.', 'Open the window, please.'),
        x('lieben', 'to love'),
        x('reisen', 'to travel', 'Ich reise gern.', 'I like travelling.'),
      ],
      sentences: [
        s('Ich lerne Deutsch.', 'I am learning German.'),
        s('Wo wohnst du?', 'Where do you live?'),
        s('Ich wohne in Berlin.', 'I live in Berlin.'),
        s('Er arbeitet heute.', 'He is working today.', ['Heute arbeitet er.']),
        s('Wir spielen Fußball.', 'We play football.'),
        s('Sprichst du Englisch?', 'Do you speak English?'),
        s('Ich verstehe das nicht.', 'I don’t understand that.'),
        s('Sie liest ein Buch.', 'She is reading a book.'),
      ],
      dialog: {
        title: 'Neue Nachbarn', setting: 'Two new neighbours meet in the hallway.',
        lines: [
          d('Bob', 'Hallo! Ich bin Bob. Wo wohnst du?', 'Hi! I am Bob. Where do you live?'),
          d('Alice', 'Ich wohne hier, Nummer sieben. Ich heiße Alice.', 'I live here, number seven. My name is Alice.'),
          d('Bob', 'Was machst du in Berlin?', 'What do you do in Berlin?'),
          d('Alice', 'Ich studiere und ich lerne Deutsch. Und du?', 'I study and I am learning German. And you?'),
          d('Bob', 'Ich arbeite. Ich verkaufe Autos.', 'I work. I sell cars.'),
          d('Alice', 'Spielst du Fußball?', 'Do you play football?'),
          d('Bob', 'Nein, ich laufe. Und ich lese viel.', 'No, I run. And I read a lot.'),
        ],
        questions: [
          q('Was macht Alice?', 'What does Alice do?', ['Sie studiert und lernt Deutsch.', 'Sie verkauft Autos.', 'Sie spielt Fußball.']),
          q('Was verkauft Bob?', 'What does Bob sell?', ['Autos', 'Bücher', 'Käse']),
          q('Wo wohnt Alice?', 'Where does Alice live?', ['Nummer sieben', 'Nummer zehn', 'Nummer zwei']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 7 */
    {
      id: 'u7', title: 'Satzbau', sub: 'Word order and questions',
      goal: 'Build correct sentences and ask anything with the one rule that matters most.',
      tips: [
        { h: 'The verb is always in position 2', html:
          tbl(['1', '2 = verb', 'rest'], [
            ['Ich', '<b>lerne</b>', 'heute Deutsch.'],
            ['Heute', '<b>lerne</b>', 'ich Deutsch.'],
            ['Deutsch', '<b>lerne</b>', 'ich heute.'],
          ]) +
          `<p>You may start with almost anything — but the verb stays second, so the subject hops behind it. English: “Today <u>I learn</u>”. German: {{Heute lerne ich Deutsch.}}</p>` },
        { h: 'Questions', html:
          `<p><b>Yes/no:</b> verb first — {{Lernst du Deutsch?}} {{Kommst du auch?}}</p>
           <p><b>W-question:</b> W-word, then the verb (still position 2) — {{Wo wohnst du?}} {{Was machst du?}}</p>` },
        { h: 'und, aber, oder don’t count', html:
          `<p>These connectors sit in “position 0”; the sentence after them starts fresh: {{Ich lerne Deutsch und ich wohne in Berlin.}}</p>` },
      ],
      words: [
        x('wer', 'who'), x('was', 'what'), x('wo', 'where'), x('wann', 'when'),
        x('warum', 'why'), x('wie', 'how'), x('woher', 'where from'), x('wohin', 'where to'),
        x('und', 'and'), x('aber', 'but'), x('oder', 'or'),
        x('jetzt', 'now'), x('morgen', 'tomorrow'), x('immer', 'always'), x('oft', 'often'),
        x('hier', 'here'), x('dort', 'there'), x('auch', 'also; too'), x('sehr', 'very', 'Das ist sehr gut.', 'That is very good.'),
        x('dann', 'then'),
        /* more A1 words */
        n('der', 'Montag', 'Montage', 'Monday', 'Am Montag arbeite ich.', 'On Monday I work.'),
        n('der', 'Dienstag', 'Dienstage', 'Tuesday'),
        n('der', 'Mittwoch', 'Mittwoche', 'Wednesday'),
        n('der', 'Donnerstag', 'Donnerstage', 'Thursday'),
        n('der', 'Freitag', 'Freitage', 'Friday'),
        n('der', 'Samstag', 'Samstage', 'Saturday', 'Was machst du am Samstag?', 'What are you doing on Saturday?'),
        n('der', 'Sonntag', 'Sonntage', 'Sunday'),
        x('manchmal', 'sometimes', 'Manchmal trinke ich Tee.', 'Sometimes I drink tea.'),
        x('welcher', 'which', 'Welcher Tag ist heute?', 'Which day is it today?'),
        x('noch einmal', 'once more; again', 'Noch einmal, bitte!', 'Once more, please!'),
      ],
      sentences: [
        s('Heute lerne ich Deutsch.', 'Today I am learning German.', ['Ich lerne heute Deutsch.']),
        s('Wann kommst du?', 'When are you coming?'),
        s('Warum lernst du Deutsch?', 'Why are you learning German?'),
        s('Kommst du auch?', 'Are you coming too?'),
        s('Ich bin oft hier.', 'I am often here.'),
        s('Jetzt trinken wir Kaffee.', 'Now we are drinking coffee.', ['Wir trinken jetzt Kaffee.']),
        s('Was machst du morgen?', 'What are you doing tomorrow?'),
        s('Wer ist das?', 'Who is that?'),
      ],
      dialog: {
        title: 'Am Wochenende', setting: 'Alice asks Bob about his plans for the weekend.',
        lines: [
          d('Alice', 'Was machst du am Samstag?', 'What are you doing on Saturday?'),
          d('Bob', 'Am Samstag spiele ich Fußball. Warum?', 'On Saturday I am playing football. Why?'),
          d('Alice', 'Wir trinken Kaffee im Café. Kommst du auch?', 'We are having coffee at the café. Are you coming too?'),
          d('Bob', 'Wann?', 'When?'),
          d('Alice', 'Am Sonntag um drei.', 'On Sunday at three.'),
          d('Bob', 'Ja, am Sonntag habe ich Zeit. Wo ist das Café?', 'Yes, I have time on Sunday. Where is the café?'),
          d('Alice', 'Das Café ist hier in der Stadt.', 'The café is here in town.'),
          d('Bob', 'Gut, bis Sonntag!', 'Good, see you on Sunday!'),
        ],
        questions: [
          q('Was macht Bob am Samstag?', 'What is Bob doing on Saturday?', ['Er spielt Fußball.', 'Er trinkt Kaffee.', 'Er arbeitet.']),
          q('Wann trinken sie Kaffee?', 'When are they having coffee?', ['am Sonntag', 'am Samstag', 'am Montag']),
          q('Um wie viel Uhr?', 'At what time?', ['um drei', 'um zwei', 'um sieben']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 8 */
    {
      id: 'u8', title: 'Essen & Trinken', sub: 'Ordering food · the accusative',
      goal: 'Order in a café and meet your first case — it is smaller than its reputation.',
      tips: [
        { h: 'Accusative = the thing being verb-ed', html:
          `<p>In {{Ich trinke einen Kaffee.}} the coffee is what gets drunk: the direct object. German marks that with the <b>accusative</b> case.</p>` },
        { h: 'Only masculine changes', html:
          tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
            ['subject', g('der') + ' / ein', g('die') + ' / eine', g('das') + ' / ein', 'die'],
            ['direct object', g('der', 'den') + ' / ' + g('der', 'einen'), g('die') + ' / eine', g('das') + ' / ein', 'die'],
          ]) +
          `<p>{{Ich habe einen Hund.}} · {{Ich habe eine Katze.}} · {{Ich habe ein Auto.}}</p>
           <p class="note">Memory hook: masculi<b>n</b>e objects get an <b>n</b> — de<b>n</b>, eine<b>n</b>, keine<b>n</b>.</p>` },
        { h: 'Ordering politely', html:
          `<p>{{Ich möchte einen Tee, bitte.}} (I would like…) or {{Ich nehme die Suppe.}} (I’ll take…). To pay: {{Die Rechnung, bitte!}} or simply {{Zahlen, bitte!}}</p>` },
      ],
      words: [
        n('der', 'Kaffee', '', 'coffee'),
        n('der', 'Tee', '', 'tea'),
        n('der', 'Apfel', 'Äpfel', 'apple'),
        n('der', 'Saft', 'Säfte', 'juice'),
        n('die', 'Milch', '', 'milk'),
        n('die', 'Suppe', 'Suppen', 'soup'),
        n('das', 'Brot', 'Brote', 'bread'),
        n('das', 'Ei', 'Eier', 'egg'),
        n('das', 'Fleisch', '', 'meat'),
        n('das', 'Gemüse', '', 'vegetables'),
        n('der', 'Kuchen', 'Kuchen', 'cake'),
        n('der', 'Fisch', 'Fische', 'fish'),
        n('die', 'Rechnung', 'Rechnungen', 'bill; invoice'),
        n('die', 'Speisekarte', 'Speisekarten', 'menu'),
        x('möchten', 'would like', 'Ich möchte einen Tee.', 'I would like a tea.'),
        x('nehmen', 'to take', 'Ich nehme den Fisch.', 'I’ll take the fish.'),
        x('bestellen', 'to order'),
        x('bezahlen', 'to pay'),
        x('lecker', 'tasty; delicious'),
        /* more A1 words */
        n('der', 'Zucker', '', 'sugar', 'Kaffee mit Zucker, bitte.', 'Coffee with sugar, please.'),
        n('die', 'Tasse', 'Tassen', 'cup', 'Eine Tasse Tee, bitte.', 'A cup of tea, please.'),
        n('die', 'Orange', 'Orangen', 'orange (fruit)'),
        n('die', 'Kartoffel', 'Kartoffeln', 'potato'),
        n('der', 'Reis', '', 'rice'),
        n('die', 'Wurst', 'Würste', 'sausage'),
        n('das', 'Obst', '', 'fruit', 'Ich esse gern Obst.', 'I like eating fruit.'),
        n('die', 'Banane', 'Bananen', 'banana'),
        n('die', 'Tomate', 'Tomaten', 'tomato'),
        n('die', 'Schokolade', 'Schokoladen', 'chocolate'),
        n('das', 'Abendessen', 'Abendessen', 'dinner; supper', 'Was gibt es zum Abendessen?', 'What is there for dinner?'),
        n('die', 'Pizza', 'Pizzas', 'pizza', 'Wir essen heute Pizza.', 'We are having pizza today.'),
      ],
      sentences: [
        s('Ich trinke einen Kaffee.', 'I am drinking a coffee.'),
        s('Ich möchte einen Tee, bitte.', 'I would like a tea, please.'),
        s('Er isst einen Apfel.', 'He is eating an apple.'),
        s('Wir kaufen das Brot.', 'We are buying the bread.'),
        s('Ich nehme die Suppe.', 'I’ll take the soup.'),
        s('Die Rechnung, bitte!', 'The bill, please!'),
        s('Hast du einen Hund?', 'Do you have a dog?'),
        s('Der Kuchen ist lecker.', 'The cake is delicious.'),
      ],
      dialog: {
        title: 'Im Café', setting: 'Alice and Bob order in a café.',
        lines: [
          d('Kellner', 'Guten Tag! Was möchten Sie?', 'Good afternoon! What would you like?'),
          d('Alice', 'Ich möchte einen Kaffee mit Zucker, bitte.', 'I would like a coffee with sugar, please.'),
          d('Bob', 'Ich nehme einen Tee und die Suppe.', 'I will have a tea and the soup.'),
          d('Kellner', 'Möchten Sie auch einen Kuchen?', 'Would you also like a cake?'),
          d('Alice', 'Nein, danke. Ich esse keinen Kuchen.', 'No, thanks. I do not eat cake.'),
          d('Bob', 'Die Rechnung, bitte!', 'The bill, please!'),
          d('Kellner', 'Das macht zwölf Euro.', 'That comes to twelve euros.'),
        ],
        questions: [
          q('Was trinkt Alice?', 'What does Alice drink?', ['einen Kaffee mit Zucker', 'einen Tee', 'einen Saft']),
          q('Was isst Bob?', 'What does Bob eat?', ['die Suppe', 'einen Kuchen', 'eine Pizza']),
          q('Was kostet alles?', 'How much is everything?', ['zwölf Euro', 'zwanzig Euro', 'zehn Euro']),
        ],
      },
    },

    /* ------------------------------------------------------------------ 9 */
    {
      id: 'u9', title: 'Nicht & kein', sub: 'Saying no · describing things',
      goal: 'Negate anything and describe things with common adjectives.',
      tips: [
        { h: 'kein = “not a / no” (for nouns)', html:
          `<p>If the positive sentence has <b>ein</b> or no article, negate with <b>kein</b>. It takes the same endings as ein: {{Ich habe ein Auto.}} → {{Ich habe kein Auto.}} · {{Ich habe Zeit.}} → {{Ich habe keine Zeit.}}</p>` },
        { h: 'nicht = “not” (for everything else)', html:
          `<p>Verbs, adjectives, places, specific things: {{Das ist nicht teuer.}} · {{Ich wohne nicht in Berlin.}}</p>
           <p><b>Where does it go?</b> Directly before the word it negates — or at the very end if it negates the whole action: {{Ich verstehe das nicht.}} · {{Er kommt heute nicht.}}</p>` },
        { h: 'doch — the word English is missing', html:
          `<p>Answering “yes” to a negative question: {{Hast du keine Zeit?}} — {{Doch!}} (Yes, I do!)</p>` },
      ],
      words: [
        x('nicht', 'not'),
        x('kein', 'no; not a', 'Ich habe kein Auto.', 'I don’t have a car.'),
        x('groß', 'big; tall'), x('klein', 'small; short'),
        x('alt', 'old'), x('jung', 'young'),
        x('teuer', 'expensive'), x('billig', 'cheap'),
        x('heiß', 'hot'), x('kalt', 'cold'),
        x('schnell', 'fast'), x('langsam', 'slow'),
        x('richtig', 'correct'), x('falsch', 'wrong; false'),
        x('leicht', 'easy; light'), x('schwer', 'difficult; heavy'),
        x('nichts', 'nothing', 'Ich verstehe nichts.', 'I understand nothing.'),
        x('nie', 'never'),
        x('doch', 'yes (contradicting a “no”)'),
        n('das', 'Problem', 'Probleme', 'problem'),
        /* more A1 words */
        x('dunkel', 'dark', 'Im Winter ist es früh dunkel.', 'In winter it gets dark early.'),
        x('rot', 'red'),
        x('blau', 'blue', 'Der Himmel ist blau.', 'The sky is blue.'),
        x('grün', 'green'),
        x('gelb', 'yellow'),
        x('schwarz', 'black'),
        x('weiß', 'white'),
        x('braun', 'brown'),
        x('grau', 'grey'),
        x('lang', 'long', 'Der Film ist lang.', 'The film is long.'),
        x('kurz', 'short'),
      ],
      sentences: [
        s('Ich habe kein Auto.', 'I don’t have a car.'),
        s('Das ist nicht teuer.', 'That is not expensive.'),
        s('Ich trinke keinen Kaffee.', 'I don’t drink coffee.'),
        s('Er kommt heute nicht.', 'He is not coming today.', ['Heute kommt er nicht.']),
        s('Das ist nicht richtig.', 'That is not correct.'),
        s('Ich habe keine Zeit.', 'I have no time.'),
        s('Deutsch ist nicht schwer.', 'German is not difficult.'),
      ],
      dialog: {
        title: 'Eine neue Tasche', setting: 'Alice is looking for a bag in a shop.',
        lines: [
          d('Alice', 'Guten Tag! Ich brauche eine Tasche.', 'Hello! I need a bag.'),
          d('Verkäufer', 'Die Tasche hier ist schön. Sie ist rot.', 'This bag is nice. It is red.'),
          d('Alice', 'Ja, schön. Haben Sie die Tasche auch in Blau?', 'Yes, nice. Do you have the bag in blue too?'),
          d('Verkäufer', 'Nein, nicht in Blau. Aber in Schwarz.', 'No, not in blue. But in black.'),
          d('Alice', 'Und was kostet die Tasche in Schwarz?', 'And how much is the bag in black?'),
          d('Verkäufer', 'Zwanzig Euro. Das ist nicht teuer.', 'Twenty euros. That is not expensive.'),
          d('Alice', 'Gut, ich nehme sie.', 'Good, I will take it.'),
        ],
        questions: [
          q('Welche Farbe hat die erste Tasche?', 'What colour is the first bag?', ['rot', 'blau', 'schwarz']),
          q('Gibt es die Tasche in Blau?', 'Is the bag available in blue?', ['Nein.', 'Ja.', 'Ja, aber sie ist teuer.']),
          q('Was kostet die Tasche in Schwarz?', 'How much is the bag in black?', ['zwanzig Euro', 'zwölf Euro', 'dreißig Euro']),
        ],
      },
    },

    /* ----------------------------------------------------------------- 10 */
    {
      id: 'u10', title: 'Können, müssen, wollen', sub: 'Modal verbs',
      goal: 'Say what you can, must, want and may do — this multiplies everything you already know.',
      tips: [
        { h: 'The verb sandwich', html:
          tbl(['1', '2 = modal', 'middle', 'end = infinitive'], [
            ['Ich', '<b>kann</b>', 'Deutsch', '<b>sprechen</b>.'],
            ['Heute', '<b>muss</b>', 'ich', '<b>arbeiten</b>.'],
            ['<b>Kannst</b>', 'du', 'mir', '<b>helfen</b>?'],
          ]) +
          `<p>The modal is conjugated and sits in position 2. The real action goes to the very end, unconjugated. Learn six modals and every verb you know becomes six times more useful.</p>` },
        { h: 'ich and er share a form — with no ending', html:
          tbl(['', 'können', 'müssen', 'wollen', 'dürfen', 'sollen'], [
            ['ich / er', '{{kann}}', '{{muss}}', '{{will}}', '{{darf}}', '{{soll}}'],
            ['du', '{{kannst}}', '{{musst}}', '{{willst}}', '{{darfst}}', '{{sollst}}'],
            ['wir / sie', '{{können}}', '{{müssen}}', '{{wollen}}', '{{dürfen}}', '{{sollen}}'],
            ['ihr', '{{könnt}}', '{{müsst}}', '{{wollt}}', '{{dürft}}', '{{sollt}}'],
          ]) },
        { h: 'Three traps', html:
          `<p>{{Ich will}} = I <b>want</b> (not “I will”).</p>
           <p>{{Du musst nicht}} = you <b>don’t have to</b>. “You must not” is {{Du darfst nicht}}.</p>
           <p><b>gern</b> after a verb = you like doing it: {{Ich schwimme gern.}}</p>` },
      ],
      words: [
        x('können', 'can; to be able to'),
        x('müssen', 'must; to have to'),
        x('wollen', 'to want'),
        x('dürfen', 'may; to be allowed to'),
        x('sollen', 'should; to be supposed to'),
        x('helfen', 'to help', 'Kannst du mir helfen?', 'Can you help me?'),
        x('schlafen', 'to sleep'),
        x('kochen', 'to cook'),
        x('schwimmen', 'to swim'),
        x('tanzen', 'to dance'),
        x('bleiben', 'to stay'),
        x('fragen', 'to ask'),
        x('warten', 'to wait'),
        x('vielleicht', 'maybe; perhaps'),
        x('gern', 'gladly (like doing)', 'Ich koche gern.', 'I like cooking.'),
        x('zusammen', 'together'),
        x('allein', 'alone'),
        x('mehr', 'more'),
        n('die', 'Hilfe', '', 'help'),
        /* more A1 words */
        x('mögen', 'to like', 'Ich mag Kaffee.', 'I like coffee.'),
        n('das', 'Theater', 'Theater', 'theatre'),
        n('das', 'Schwimmbad', 'Schwimmbäder', 'swimming pool', 'Wir gehen ins Schwimmbad.', 'We are going to the swimming pool.'),
        n('der', 'Fußball', 'Fußbälle', 'football'),
        n('das', 'Konzert', 'Konzerte', 'concert'),
        x('singen', 'to sing'),
        n('die', 'Gitarre', 'Gitarren', 'guitar', 'Kannst du Gitarre spielen?', 'Can you play the guitar?'),
        x('toll', 'great; brilliant', 'Das ist toll!', 'That is great!'),
        x('natürlich', 'of course', 'Natürlich kannst du kommen.', 'Of course you can come.'),
        x('frei', 'free (not busy)', 'Bist du heute frei?', 'Are you free today?'),
        x('spazieren gehen', 'to go for a walk'),
      ],
      sentences: [
        s('Ich kann Deutsch sprechen.', 'I can speak German.'),
        s('Kannst du mir helfen?', 'Can you help me?'),
        s('Ich muss heute arbeiten.', 'I have to work today.', ['Heute muss ich arbeiten.']),
        s('Wir wollen Pizza essen.', 'We want to eat pizza.'),
        s('Darf ich hier warten?', 'May I wait here?'),
        s('Du sollst mehr schlafen.', 'You should sleep more.'),
        s('Ich schwimme gern.', 'I like swimming.'),
        s('Ich möchte zu Hause bleiben.', 'I would like to stay at home.'),
      ],
      dialog: {
        title: 'Heute Abend', setting: 'Bob calls Alice to make plans.',
        lines: [
          d('Bob', 'Hallo, Alice! Kannst du heute Abend kommen? Wir wollen tanzen.', 'Hi, Alice! Can you come tonight? We want to go dancing.'),
          d('Alice', 'Heute kann ich nicht. Ich muss arbeiten.', 'I cannot today. I have to work.'),
          d('Bob', 'Und morgen? Wir können ins Schwimmbad gehen.', 'And tomorrow? We can go to the swimming pool.'),
          d('Alice', 'Ja, gern! Wann?', 'Yes, I would like that! When?'),
          d('Bob', 'Um zehn Uhr.', 'At ten o’clock.'),
          d('Alice', 'Darf meine Schwester auch kommen?', 'May my sister come too?'),
          d('Bob', 'Natürlich!', 'Of course!'),
        ],
        questions: [
          q('Was wollen sie heute Abend machen?', 'What do they want to do tonight?', ['tanzen', 'schwimmen', 'kochen']),
          q('Warum kann Alice heute nicht?', 'Why can Alice not come today?', ['Sie muss arbeiten.', 'Sie ist müde.', 'Sie will schlafen.']),
          q('Wohin gehen sie morgen?', 'Where are they going tomorrow?', ['ins Schwimmbad', 'ins Theater', 'ins Restaurant']),
        ],
      },
    },

    /* ----------------------------------------------------------------- 11 */
    {
      id: 'u11', title: 'Unterwegs', sub: 'Getting around · the dative',
      goal: 'Ask the way, use transport and handle the prepositions you need every day.',
      tips: [
        { h: 'These seven always take the dative', html:
          `<p><b>aus · bei · mit · nach · seit · von · zu</b> — no thinking required, the noun after them is dative.</p>` +
          tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
            ['subject', g('der'), g('die'), g('das'), 'die'],
            ['dative', g('der', 'dem'), g('die', 'der'), g('das', 'dem'), 'den (+n)'],
          ]) +
          `<p>{{mit dem Bus}} · {{mit der Familie}} · {{mit dem Auto}}</p>` },
        { h: 'Contractions you will hear all day', html:
          `<p>zu + dem = {{zum}} · zu + der = {{zur}} · in + dem = {{im}} · bei + dem = {{beim}} · von + dem = {{vom}}</p>
           <p>{{Ich gehe zum Bahnhof.}} · {{Ich gehe zur Schule.}} · {{Ich bin im Büro.}}</p>` },
        { h: 'Going where?', html:
          `<p><b>nach</b> + cities and countries: {{Ich fahre nach Berlin.}}<br><b>zu</b> + people and places: {{Ich gehe zum Supermarkt.}}</p>
           <p class="note">Home is special: {{Ich gehe nach Hause.}} (going home) vs {{Ich bin zu Hause.}} (at home).</p>` },
      ],
      words: [
        n('der', 'Bahnhof', 'Bahnhöfe', 'train station'),
        n('der', 'Supermarkt', 'Supermärkte', 'supermarket'),
        n('die', 'Schule', 'Schulen', 'school'),
        n('das', 'Büro', 'Büros', 'office'),
        n('das', 'Restaurant', 'Restaurants', 'restaurant'),
        n('der', 'Bus', 'Busse', 'bus'),
        n('das', 'Fahrrad', 'Fahrräder', 'bicycle'),
        n('die', 'Apotheke', 'Apotheken', 'pharmacy'),
        n('der', 'Flughafen', 'Flughäfen', 'airport'),
        n('die', 'Arbeit', '', 'work; job'),
        x('links', 'left; on the left'),
        x('rechts', 'right; on the right'),
        x('geradeaus', 'straight ahead'),
        x('mit', 'with; by (transport)', 'Ich fahre mit dem Zug.', 'I go by train.'),
        x('zu', 'to (a place or person)'),
        x('bei', 'at; near; at someone’s place', 'Ich wohne bei Freunden.', 'I live with friends.'),
        x('nach', 'to (a city or country); after'),
        x('von', 'from; of'),
        x('weit', 'far', 'Ist es weit?', 'Is it far?'),
        x('in der Nähe', 'nearby', 'Ist hier eine Apotheke in der Nähe?', 'Is there a pharmacy nearby?'),
        /* more A1 words */
        n('die', 'Bank', 'Banken', 'bank'),
        n('die', 'Post', '', 'post office'),
        n('das', 'Krankenhaus', 'Krankenhäuser', 'hospital'),
        n('die', 'Straßenbahn', 'Straßenbahnen', 'tram'),
        n('das', 'Hotel', 'Hotels', 'hotel'),
        n('der', 'Markt', 'Märkte', 'market', 'Samstags gehe ich auf den Markt.', 'On Saturdays I go to the market.'),
        n('die', 'Ampel', 'Ampeln', 'traffic light', 'Gehen Sie bis zur Ampel.', 'Go as far as the traffic light.'),
        n('das', 'Taxi', 'Taxis', 'taxi'),
        n('die', 'Ecke', 'Ecken', 'corner'),
        n('der', 'Park', 'Parks', 'park'),
        n('der', 'Weg', 'Wege', 'way; path'),
        n('die', 'Bäckerei', 'Bäckereien', 'bakery', 'Die Bäckerei ist an der Ecke.', 'The bakery is on the corner.'),
      ],
      sentences: [
        s('Ich fahre mit dem Bus.', 'I go by bus.'),
        s('Wo ist der Bahnhof?', 'Where is the train station?'),
        s('Ich gehe zum Supermarkt.', 'I am going to the supermarket.'),
        s('Wir sind im Restaurant.', 'We are in the restaurant.'),
        s('Sie fährt mit dem Fahrrad zur Schule.', 'She rides her bike to school.'),
        s('Ich fahre nach Berlin.', 'I am going to Berlin.'),
        s('Gehen Sie geradeaus und dann links.', 'Go straight ahead and then left.'),
        s('Ich bin zu Hause.', 'I am at home.'),
      ],
      dialog: {
        title: 'Wo ist der Bahnhof?', setting: 'Alice asks a passer-by for the way.',
        lines: [
          d('Alice', 'Entschuldigung, wo ist der Bahnhof?', 'Excuse me, where is the train station?'),
          d('Passant', 'Gehen Sie geradeaus bis zur Ampel und dann links.', 'Go straight on to the traffic light and then left.'),
          d('Alice', 'Ist das weit?', 'Is that far?'),
          d('Passant', 'Nein, der Bahnhof ist in der Nähe.', 'No, the station is nearby.'),
          d('Alice', 'Und wo ist hier eine Bäckerei?', 'And where is there a bakery here?'),
          d('Passant', 'Die Bäckerei ist an der Ecke, rechts.', 'The bakery is on the corner, on the right.'),
          d('Alice', 'Danke schön!', 'Thank you very much!'),
          d('Passant', 'Bitte schön!', 'You are welcome!'),
        ],
        questions: [
          q('Wie kommt Alice zum Bahnhof?', 'How does Alice get to the station?', ['geradeaus bis zur Ampel, dann links', 'geradeaus, dann rechts', 'links, dann geradeaus']),
          q('Ist der Bahnhof weit?', 'Is the station far?', ['Nein, er ist in der Nähe.', 'Ja, er ist weit.', 'Ja, sie muss mit dem Bus fahren.']),
          q('Wo ist die Bäckerei?', 'Where is the bakery?', ['an der Ecke, rechts', 'am Bahnhof', 'bei der Ampel, links']),
        ],
      },
    },

    /* ----------------------------------------------------------------- 12 */
    {
      id: 'u12', title: 'Zeit & Alltag', sub: 'Time, routine, separable verbs',
      goal: 'Tell the time, make plans and describe your day.',
      tips: [
        { h: 'Telling the time', html:
          `<p>{{Wie spät ist es?}} — {{Es ist drei Uhr.}} “At three” is {{um drei Uhr}}.</p>
           <p>{{Viertel nach drei}} = 3:15 · {{Viertel vor drei}} = 2:45.</p>
           <p class="note">Careful: {{halb drei}} is <b>2:30</b> — “half (way to) three”, not half past three.</p>` },
        { h: 'Separable verbs split', html:
          tbl(['1', '2 = verb', 'middle', 'end = prefix'], [
            ['Ich', '<b>stehe</b>', 'um sieben Uhr', '<b>auf</b>.'],
            ['Der Film', '<b>fängt</b>', 'um acht', '<b>an</b>.'],
            ['Ich', '<b>rufe</b>', 'dich morgen', '<b>an</b>.'],
          ]) +
          `<p>Verbs like {{aufstehen}}, {{anfangen}}, {{einkaufen}}, {{anrufen}} send their prefix to the end. With a modal they stay whole: {{Ich muss früh aufstehen.}}</p>` },
        { h: 'Days and parts of the day', html:
          `<p>{{Montag}} {{Dienstag}} {{Mittwoch}} {{Donnerstag}} {{Freitag}} {{Samstag}} {{Sonntag}} — all ${g('der')}.</p>
           <p>“On Monday” = {{am Montag}}. Also {{am Morgen}}, {{am Abend}}, {{am Wochenende}} — but {{in der Nacht}}.</p>` },
      ],
      words: [
        n('die', 'Uhr', 'Uhren', 'clock; o’clock'),
        n('die', 'Stunde', 'Stunden', 'hour'),
        n('die', 'Minute', 'Minuten', 'minute'),
        n('der', 'Tag', 'Tage', 'day'),
        n('die', 'Woche', 'Wochen', 'week'),
        n('der', 'Monat', 'Monate', 'month'),
        n('das', 'Jahr', 'Jahre', 'year'),
        n('der', 'Morgen', 'Morgen', 'morning'),
        n('der', 'Abend', 'Abende', 'evening'),
        n('die', 'Nacht', 'Nächte', 'night'),
        n('das', 'Frühstück', '', 'breakfast'),
        n('das', 'Wochenende', 'Wochenenden', 'weekend'),
        x('aufstehen', 'to get up', 'Ich stehe früh auf.', 'I get up early.'),
        x('anfangen', 'to begin', 'Wann fängt der Film an?', 'When does the film start?'),
        x('einkaufen', 'to go shopping'),
        x('anrufen', 'to call (by phone)', 'Ich rufe dich an.', 'I’ll call you.'),
        x('fernsehen', 'to watch TV'),
        x('um', 'at (clock time)', 'Um neun Uhr.', 'At nine o’clock.'),
        x('halb', 'half'),
        n('das', 'Viertel', 'Viertel', 'quarter'),
        /* more A1 words */
        n('der', 'Frühling', 'Frühlinge', 'spring'),
        n('der', 'Sommer', 'Sommer', 'summer', 'Im Sommer ist es heiß.', 'In summer it is hot.'),
        n('der', 'Herbst', 'Herbste', 'autumn'),
        n('der', 'Winter', 'Winter', 'winter'),
        n('der', 'Mittag', 'Mittage', 'midday; noon'),
        n('der', 'Nachmittag', 'Nachmittage', 'afternoon', 'Am Nachmittag gehe ich spazieren.', 'In the afternoon I go for a walk.'),
        x('morgens', 'in the mornings', 'Morgens trinke ich Kaffee.', 'In the mornings I drink coffee.'),
        x('abends', 'in the evenings'),
        x('mitkommen', 'to come along', 'Kommst du mit?', 'Are you coming along?'),
        x('zumachen', 'to close', 'Mach bitte die Tür zu.', 'Please close the door.'),
        x('ausgehen', 'to go out'),
        x('aufhören', 'to stop'),
      ],
      sentences: [
        s('Wie spät ist es?', 'What time is it?'),
        s('Es ist acht Uhr.', 'It is eight o’clock.'),
        s('Ich stehe um sieben Uhr auf.', 'I get up at seven o’clock.', ['Um sieben Uhr stehe ich auf.']),
        s('Der Film fängt um acht Uhr an.', 'The film starts at eight o’clock.', ['Um acht Uhr fängt der Film an.']),
        s('Ich rufe dich morgen an.', 'I’ll call you tomorrow.', ['Morgen rufe ich dich an.']),
        s('Am Wochenende kaufe ich ein.', 'At the weekend I go shopping.', ['Ich kaufe am Wochenende ein.']),
        s('Es ist halb drei.', 'It is half past two.'),
      ],
      dialog: {
        title: 'Mein Tag', setting: 'Alice and Bob compare their daily routines.',
        lines: [
          d('Bob', 'Wann stehst du auf?', 'When do you get up?'),
          d('Alice', 'Ich stehe um sechs Uhr auf. Morgens trinke ich Kaffee.', 'I get up at six. In the mornings I drink coffee.'),
          d('Bob', 'Sehr früh! Ich stehe um halb neun auf.', 'Very early! I get up at half past eight.'),
          d('Alice', 'Und wann fängt deine Arbeit an?', 'And when does your work start?'),
          d('Bob', 'Um zehn Uhr. Und am Nachmittag habe ich frei.', 'At ten. And in the afternoon I am free.'),
          d('Alice', 'Ich arbeite bis fünf. Abends sehe ich fern.', 'I work until five. In the evenings I watch TV.'),
          d('Bob', 'Und am Wochenende?', 'And at the weekend?'),
          d('Alice', 'Am Wochenende kaufe ich ein und gehe aus.', 'At the weekend I go shopping and go out.'),
        ],
        questions: [
          q('Wann steht Alice auf?', 'When does Alice get up?', ['um sechs Uhr', 'um halb neun', 'um zehn Uhr']),
          q('Wann fängt die Arbeit von Bob an?', 'When does Bob’s work start?', ['um zehn Uhr', 'um sechs Uhr', 'um fünf Uhr']),
          q('Was macht Alice abends?', 'What does Alice do in the evenings?', ['Sie sieht fern.', 'Sie kauft ein.', 'Sie arbeitet.']),
        ],
      },
    },

    /* ----------------------------------------------------------------- 13 */
    {
      id: 'u13', title: 'Perfekt', sub: 'Talking about the past',
      goal: 'Say what you did yesterday — with the one past tense Germans actually use when speaking.',
      tips: [
        { h: 'Another verb sandwich', html:
          tbl(['1', '2 = haben / sein', 'middle', 'end = participle'], [
            ['Ich', '<b>habe</b>', 'Deutsch', '<b>gelernt</b>.'],
            ['Wir', '<b>haben</b>', 'Pizza', '<b>gegessen</b>.'],
            ['Ich', '<b>bin</b>', 'nach Berlin', '<b>gefahren</b>.'],
          ]) +
          `<p>Spoken German uses this for nearly every past event. It covers both “I learned” and “I have learned”.</p>` },
        { h: 'Building the participle', html:
          `<p><b>Regular:</b> ge + stem + t — {{machen}} → {{gemacht}} · {{lernen}} → {{gelernt}} · {{kaufen}} → {{gekauft}}</p>
           <p><b>Irregular:</b> ge + stem + en, often with a vowel change — {{essen}} → {{gegessen}} · {{trinken}} → {{getrunken}} · {{sehen}} → {{gesehen}}. Learn these as pairs.</p>
           <p class="note">No ge- for verbs starting with be-, ver-, er- or ending in -ieren: {{bestellt}}, {{verstanden}}, {{studiert}}.</p>` },
        { h: 'haben or sein?', html:
          `<p>Default is <b>haben</b>. Use <b>sein</b> for movement from A to B or a change of state: {{Ich bin gegangen.}} · {{Ich bin gefahren.}} · {{Ich bin gekommen.}} — plus two odd ones: {{Ich bin geblieben.}} and {{Ich bin gewesen.}}</p>
           <p class="note">Shortcut for “was” and “had”: use the short forms {{ich war}} and {{ich hatte}}.</p>` },
      ],
      words: [
        x('gestern', 'yesterday'),
        x('schon', 'already'),
        x('noch', 'still; yet', 'Ich bin noch hier.', 'I am still here.'),
        x('gemacht', 'done; made (from machen)'),
        x('gelernt', 'learned (from lernen)'),
        x('gekauft', 'bought (from kaufen)'),
        x('gegessen', 'eaten (from essen)'),
        x('getrunken', 'drunk (from trinken)'),
        x('gesehen', 'seen (from sehen)'),
        x('gegangen', 'gone (from gehen)', 'Er ist nach Hause gegangen.', 'He went home.'),
        x('gefahren', 'driven; travelled (from fahren)'),
        x('gekommen', 'come (from kommen)'),
        x('geblieben', 'stayed (from bleiben)'),
        x('gewesen', 'been (from sein)'),
        x('war', 'was (ich / er form)', 'Ich war müde.', 'I was tired.'),
        x('hatte', 'had (ich / er form)', 'Ich hatte keine Zeit.', 'I had no time.'),
        n('der', 'Film', 'Filme', 'film; movie'),
        n('der', 'Urlaub', 'Urlaube', 'holiday; vacation'),
        n('das', 'Wetter', '', 'weather'),
        n('die', 'Reise', 'Reisen', 'trip; journey'),
        /* more A1 words */
        x('geschlafen', 'slept (from schlafen)'),
        x('gelesen', 'read, past (from lesen)', 'Ich habe ein Buch gelesen.', 'I read a book.'),
        x('geschrieben', 'written (from schreiben)'),
        x('gesprochen', 'spoken (from sprechen)'),
        x('gefunden', 'found (from finden)'),
        x('angerufen', 'called (from anrufen)', 'Hast du Bob angerufen?', 'Did you call Bob?'),
        x('aufgestanden', 'got up (from aufstehen)', 'Ich bin früh aufgestanden.', 'I got up early.'),
        x('eingekauft', 'shopped (from einkaufen)'),
        x('gekocht', 'cooked (from kochen)'),
        x('gearbeitet', 'worked (from arbeiten)'),
        x('vorgestern', 'the day before yesterday'),
        x('letztes Jahr', 'last year', 'Letztes Jahr war ich in Spanien.', 'Last year I was in Spain.'),
      ],
      sentences: [
        s('Ich habe Deutsch gelernt.', 'I learned German.'),
        s('Was hast du gestern gemacht?', 'What did you do yesterday?'),
        s('Wir haben Pizza gegessen.', 'We ate pizza.'),
        s('Ich bin nach Berlin gefahren.', 'I went to Berlin.'),
        s('Er ist nach Hause gegangen.', 'He went home.'),
        s('Hast du den Film gesehen?', 'Did you see the film?'),
        s('Gestern war ich müde.', 'Yesterday I was tired.', ['Ich war gestern müde.']),
        s('Das Wetter war schön.', 'The weather was nice.'),
      ],
      dialog: {
        title: 'Das Wochenende', setting: 'On Monday, Alice asks Bob about his weekend.',
        lines: [
          d('Alice', 'Was hast du am Wochenende gemacht?', 'What did you do at the weekend?'),
          d('Bob', 'Ich bin nach Hamburg gefahren.', 'I went to Hamburg.'),
          d('Alice', 'Schön! Wie war das Wetter?', 'Nice! How was the weather?'),
          d('Bob', 'Das Wetter war gut. Ich habe Fisch gegessen und viel gesehen.', 'The weather was good. I ate fish and saw a lot.'),
          d('Alice', 'Und am Sonntag?', 'And on Sunday?'),
          d('Bob', 'Am Sonntag war ich müde. Ich habe viel geschlafen. Und du?', 'On Sunday I was tired. I slept a lot. And you?'),
          d('Alice', 'Ich bin zu Hause geblieben und habe ein Buch gelesen.', 'I stayed at home and read a book.'),
        ],
        questions: [
          q('Wohin ist Bob gefahren?', 'Where did Bob go?', ['nach Hamburg', 'nach Berlin', 'nach Hause']),
          q('Was hat Bob gegessen?', 'What did Bob eat?', ['Fisch', 'Pizza', 'Kuchen']),
          q('Was hat Alice gemacht?', 'What did Alice do?', ['Sie hat ein Buch gelesen.', 'Sie ist nach Hamburg gefahren.', 'Sie hat viel gearbeitet.']),
        ],
      },
    },
  ];

  /* Present tense: ich, du, er/sie/es, wir, ihr, sie/Sie */
  const VERBS = [
    ['sein', 'to be', ['bin', 'bist', 'ist', 'sind', 'seid', 'sind']],
    ['haben', 'to have', ['habe', 'hast', 'hat', 'haben', 'habt', 'haben']],
    ['machen', 'to do, to make', ['mache', 'machst', 'macht', 'machen', 'macht', 'machen']],
    ['lernen', 'to learn', ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen']],
    ['wohnen', 'to live', ['wohne', 'wohnst', 'wohnt', 'wohnen', 'wohnt', 'wohnen']],
    ['arbeiten', 'to work', ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten']],
    ['kommen', 'to come', ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen']],
    ['gehen', 'to go', ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen']],
    ['trinken', 'to drink', ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken']],
    ['sprechen', 'to speak', ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen']],
    ['essen', 'to eat', ['esse', 'isst', 'isst', 'essen', 'esst', 'essen']],
    ['lesen', 'to read', ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen']],
    ['sehen', 'to see', ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen']],
    ['fahren', 'to drive, to go', ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren']],
    ['nehmen', 'to take', ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen']],
    ['schlafen', 'to sleep', ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen']],
    ['helfen', 'to help', ['helfe', 'hilfst', 'hilft', 'helfen', 'helft', 'helfen']],
    ['können', 'can', ['kann', 'kannst', 'kann', 'können', 'könnt', 'können']],
    ['müssen', 'must', ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen']],
    ['wollen', 'to want', ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen']],
    ['dürfen', 'may', ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen']],
    ['sollen', 'should', ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen']],
    ['möchten', 'would like', ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten']],
  ].map(([inf, en, forms]) => ({ inf, en, forms }));

  const SHEETS = [
    { title: 'Articles in three cases', html:
      tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['<b>Nominative</b><br><small>subject</small>', g('der') + ' · ein', g('die') + ' · eine', g('das') + ' · ein', 'die · –'],
        ['<b>Accusative</b><br><small>direct object</small>', g('der', 'den') + ' · ' + g('der', 'einen'), g('die') + ' · eine', g('das') + ' · ein', 'die · –'],
        ['<b>Dative</b><br><small>after mit, zu, bei…</small>', g('der', 'dem') + ' · ' + g('der', 'einem'), g('die', 'der') + ' · ' + g('die', 'einer'), g('das', 'dem') + ' · ' + g('das', 'einem'), 'den (+n) · –'],
      ]) +
      `<p class="note"><b>kein</b> and the possessives (<b>mein, dein, sein, ihr, unser</b>) take exactly the endings of <b>ein</b>. Feminine and neuter look the same in nominative and accusative — only masculine changes.</p>` },

    { title: 'Guessing der / die / das', html:
      tbl(['', 'Endings', 'Meaning groups'], [
        [g('der'), '-er (doers), -ling, -ismus, -or', 'male people · days, months, seasons · most weather words'],
        [g('die'), '-ung, -heit, -keit, -schaft, -ion, -tät, -ie, -ik · most -e', 'female people · most flowers and trees · numbers as nouns'],
        [g('das'), '-chen, -lein · -ment, -um, -o', 'verbs used as nouns ({{das Essen}}) · most metals · young beings ({{das Kind}}, {{das Baby}})'],
      ]) +
      `<p class="note">Compound nouns take the gender of their <b>last</b> part: ${g('das')} Haus + ${g('die')} Tür = {{die Haustür}}.</p>` },

    { title: 'Pronouns', html:
      tbl(['', 'I', 'you', 'he', 'she', 'it', 'we', 'you (pl.)', 'they', 'you (formal)'], [
        ['<b>Nom.</b>', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'Sie'],
        ['<b>Acc.</b>', 'mich', 'dich', 'ihn', 'sie', 'es', 'uns', 'euch', 'sie', 'Sie'],
        ['<b>Dat.</b>', 'mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen', 'Ihnen'],
        ['<b>my…</b>', 'mein', 'dein', 'sein', 'ihr', 'sein', 'unser', 'euer', 'ihr', 'Ihr'],
      ]) +
      `<p>{{Ich sehe dich.}} · {{Kannst du mir helfen?}} · {{Das ist mein Bruder.}} · {{Wie geht es Ihnen?}}</p>` },

    { title: 'Present tense', html:
      tbl(['', 'regular', 'sein', 'haben', 'können'], [
        ['ich', 'lern<b>e</b>', 'bin', 'habe', 'kann'],
        ['du', 'lern<b>st</b>', 'bist', 'hast', 'kannst'],
        ['er / sie / es', 'lern<b>t</b>', 'ist', 'hat', 'kann'],
        ['wir', 'lern<b>en</b>', 'sind', 'haben', 'können'],
        ['ihr', 'lern<b>t</b>', 'seid', 'habt', 'könnt'],
        ['sie / Sie', 'lern<b>en</b>', 'sind', 'haben', 'können'],
      ]) +
      `<p class="note">Vowel-changing verbs change only in du and er/sie/es: sprechen → sprichst, spricht · fahren → fährst, fährt · lesen → liest · sehen → siehst · nehmen → nimmst, nimmt.</p>` },

    { title: 'Word order patterns', html:
      tbl(['Pattern', '1', '2', 'middle', 'end'], [
        ['Statement', 'Ich', '<b>trinke</b>', 'morgens Kaffee.', ''],
        ['Something else first', 'Morgens', '<b>trinke</b>', 'ich Kaffee.', ''],
        ['W-question', 'Was', '<b>trinkst</b>', 'du?', ''],
        ['Yes/no question', '<b>Trinkst</b>', 'du', 'Kaffee?', ''],
        ['Modal verb', 'Ich', '<b>kann</b>', 'heute nicht', '<b>kommen</b>.'],
        ['Separable verb', 'Ich', '<b>stehe</b>', 'um sieben Uhr', '<b>auf</b>.'],
        ['Perfekt', 'Ich', '<b>habe</b>', 'Kaffee', '<b>getrunken</b>.'],
      ]) +
      `<p class="note">Extra information usually runs <b>time → manner → place</b>: {{Ich fahre heute mit dem Bus nach Berlin.}}</p>` },

    { title: 'Prepositions and their cases', html:
      tbl(['Case', 'Prepositions', 'Example'], [
        ['Always <b>accusative</b>', 'für · um · durch · gegen · ohne', '{{für den Mann}} · {{ohne das Auto}}'],
        ['Always <b>dative</b>', 'aus · bei · mit · nach · seit · von · zu', '{{mit dem Bus}} · {{zur Schule}}'],
        ['<b>Two-way</b>', 'in · an · auf · über · unter · vor · hinter · neben · zwischen', 'movement to → accusative: {{Ich gehe in die Schule.}}<br>location → dative: {{Ich bin in der Schule.}}'],
      ]) +
      `<p class="note">Two-way test: ask <b>wohin?</b> (where to → accusative) or <b>wo?</b> (where → dative).</p>` },

    { title: 'Pronunciation at a glance', html:
      tbl(['Spelling', 'Sound', 'Example'], [
        ['ei', '“eye”', '{{Wein}}'], ['ie', '“ee”', '{{Bier}}'], ['eu / äu', '“oy”', '{{heute}}'],
        ['w', 'v', '{{Wasser}}'], ['v', 'f', '{{Vater}}'], ['z', 'ts', '{{Zug}}'], ['j', 'y', '{{ja}}'],
        ['sch', 'sh', '{{schön}}'], ['sp- / st-', 'shp / sht', '{{Sport}} {{Stadt}}'],
        ['ch after a, o, u', 'throaty', '{{Buch}}'], ['ch elsewhere', 'soft hiss', '{{ich}}'],
        ['ß', 'ss', '{{Straße}}'], ['ä · ö · ü', '“e” · rounded “ay” · rounded “ee”', '{{Käse}} {{schön}} {{früh}}'],
      ]) },

    { title: 'Days, months, time', html:
      `<p><b>Days</b> (${g('der')}, “on” = am): {{Montag}} {{Dienstag}} {{Mittwoch}} {{Donnerstag}} {{Freitag}} {{Samstag}} {{Sonntag}}</p>
       <p><b>Months</b> (${g('der')}, “in” = im): {{Januar}} {{Februar}} {{März}} {{April}} {{Mai}} {{Juni}} {{Juli}} {{August}} {{September}} {{Oktober}} {{November}} {{Dezember}}</p>
       <p><b>Time:</b> {{Es ist drei Uhr.}} · {{Viertel nach drei}} (3:15) · {{halb vier}} (3:30) · {{Viertel vor vier}} (3:45) · {{um acht Uhr}} (at 8)</p>
       <p><b>When:</b> {{gestern}} · {{heute}} · {{morgen}} · {{jetzt}} · {{später}} · {{nächste Woche}}</p>` },

    { title: 'Survival phrases', html:
      `<ul class="phrases">
        <li>{{Sprechen Sie Englisch?}} <span>Do you speak English?</span></li>
        <li>{{Ich spreche nur ein bisschen Deutsch.}} <span>I only speak a little German.</span></li>
        <li>{{Können Sie das bitte wiederholen?}} <span>Could you repeat that, please?</span></li>
        <li>{{Langsamer, bitte.}} <span>Slower, please.</span></li>
        <li>{{Was bedeutet das?}} <span>What does that mean?</span></li>
        <li>{{Wie sagt man das auf Deutsch?}} <span>How do you say that in German?</span></li>
        <li>{{Ich hätte gern einen Kaffee.}} <span>I’d like a coffee.</span></li>
        <li>{{Wo ist die Toilette?}} <span>Where is the toilet?</span></li>
        <li>{{Ich weiß nicht.}} <span>I don’t know.</span></li>
        <li>{{Alles klar.}} <span>All clear / got it.</span></li>
        <li>{{Zahlen, bitte!}} <span>The bill, please!</span></li>
        <li>{{Ich brauche Hilfe.}} <span>I need help.</span></li>
      </ul>` },
  ];

  const METHOD = [
    ['repeat', 'Spaced repetition', 'Each word comes back just before you would forget it: after 1 day, then 3, 7, 14, 30, 60. Spacing practice is one of the most replicated findings in memory research.'],
    ['edit', 'Recall, don’t re-read', 'You choose, type and build answers instead of staring at lists. Pulling a word out of memory is what makes it stick. Exercises get harder as a word gets stronger.'],
    ['target', 'Most useful words first', 'Each level teaches the core words and sentence patterns that carry everyday conversation, in the order you will need them. Nouns always come with their article and colour.'],
    ['volume', 'Sound from day one', 'Everything German is tappable and spoken aloud. Repeat it out loud every time — your mouth needs the practice as much as your memory.'],
    ['layers', 'One grammar idea per unit', 'A short explicit rule, then immediate use. Research on language teaching favours combining clear explanations with lots of input over either alone.'],
    ['clock', 'Little and often', 'Fifteen focused minutes a day beats a two-hour weekend session. The streak counter is there to protect the habit.'],
  ];

  const RESOURCES = [
    ['Nicos Weg — Deutsche Welle', 'https://learngerman.dw.com/en/overview', 'Free video course from A1 to B1 that follows one story. The best next step for listening and real dialogue. Do one episode after each unit here.'],
    ['Goethe-Institut — Deutsch üben', 'https://www.goethe.de/en/spr/ueb.html', 'Free exercises, an A1 app and practice material from the institute that runs the official German exams.'],
    ['vhs-Lernportal', 'https://www.vhs-lernportal.de', 'Free, structured online courses from A1 to B2 by the German adult education association.'],
    ['Easy German', 'https://www.easygerman.org', 'Street interviews with German and English subtitles. Real people, real speed — great once you finish unit 7.'],
    ['Lingolia German grammar', 'https://deutsch.lingolia.com/en/', 'Clear grammar explanations with exercises, for when you want more depth on one topic.'],
    ['dict.cc', 'https://www.dict.cc', 'Fast German–English dictionary with gender, plurals and audio.'],
    ['Forvo', 'https://forvo.com/languages/de/', 'Recordings of single words by native speakers. Use it when the synthetic voice sounds off.'],
    ['Anki', 'https://apps.ankiweb.net', 'Free spaced-repetition flashcards for when your vocabulary outgrows this app.'],
    ['Tandem', 'https://www.tandem.net', 'Language exchange with native speakers. No app replaces actually talking — start around unit 6.'],
  ];

  /* The A1 month plan. Each unit takes two days (its words in two halves), each week ends
     with a checkpoint: a quiz on that week's units and a speaking task. The last checkpoint
     is the final test over all of A1. That makes 30 days; slower paces add consolidation
     days in between (see app.js). `drills` names the unit that unlocks each drill. */
  const PLAN = {
    level: 'a1',
    pass: 80,
    drills: { u3: 'numbers', u4: 'gender', u6: 'verbs' },
    weeks: [
      { units: ['u1', 'u2', 'u3'],
        check: { id: 'cp1', title: 'Week 1 checkpoint',
          write: { type: 'form', title: 'Anmeldung zum Deutschkurs',
            intro: 'Bob wants to join a German course. Read his message, then fill in the form for him.',
            text: 'Hallo! Mein Name ist Bob. Ich komme aus Kanada und ich bin dreißig Jahre alt. Ich spreche Englisch und Deutsch. Meine Telefonnummer ist null eins sieben sechs, zwei drei vier, fünf sechs sieben. Bis bald!',
            fields: [
              f('Vorname', 'first name', 'Bob', { all: ['bob'] }),
              f('Land', 'country', 'Kanada', { all: ['kanada'] }),
              f('Alter', 'age', '30', { all: ['dreissig'], digits: ['30'] }),
              f('Telefonnummer', 'phone number', '0176 234 567', { digits: ['0176234567'] }),
              f('Sprachen', 'languages', 'Englisch, Deutsch', { all: ['englisch', 'deutsch'] }),
            ] },
          speak: 'Introduce yourself out loud: greet, say your name, where you come from and how old you are, then ask the same back. {{Guten Tag!}} {{Woher kommst du?}} {{Wie alt bist du?}}' } },
      { units: ['u4', 'u5', 'u6'],
        check: { id: 'cp2', title: 'Week 2 checkpoint',
          write: { type: 'message', title: 'Eine Nachricht an Alice', min: 25,
            intro: 'You have a new flat. Write your friend Alice a short message of about 30 words.',
            points: [
              p('Say where you live now.', ['wohne', 'wohnung']),
              p('Say what the flat has: rooms, a balcony, a garden …', ['zimmer', 'balkon', 'garten', 'kueche', 'bad', 'dusche', 'sofa', 'fenster']),
              p('Invite Alice to visit.', ['kommst', 'besuch', 'zeit', 'einlad']),
            ],
            greet: ['liebe', 'lieber', 'hallo', 'hi'],
            close: ['viele gruesse', 'liebe gruesse', 'bis bald', 'tschuess', 'gruss'],
            model: 'Liebe Alice, ich habe eine neue Wohnung! Ich wohne jetzt in Berlin. Die Wohnung hat zwei Zimmer und einen Balkon. Hast du am Samstag Zeit? Komm doch zu mir! Viele Grüße, Bob' },
          speak: 'Name five things around you with der, die or das, then say who is in your family and what they do. {{Das ist ein Tisch.}} {{Ich habe eine Schwester.}} {{Sie wohnt in Berlin.}}' } },
      { units: ['u7', 'u8', 'u9'],
        check: { id: 'cp3', title: 'Week 3 checkpoint',
          write: { type: 'form', title: 'Tisch reservieren im Café Sonne',
            intro: 'Alice wants to book a table at Café Sonne. Read her message to the café, then fill in the booking form.',
            text: 'Guten Tag! Hier ist Alice. Ich möchte am Freitag um drei Uhr mit drei Freunden zu Ihnen kommen. Wir trinken Kaffee und Tee, und wir möchten einen Kuchen essen. Meine Telefonnummer ist null drei null, eins zwei drei, vier fünf sechs. Danke!',
            fields: [
              f('Name', 'name', 'Alice', { all: ['alice'] }),
              f('Tag', 'day', 'Freitag', { all: ['freitag'] }),
              f('Uhrzeit', 'time', '15 Uhr', { all: ['drei'], digits: ['3', '15', '300', '1500'] }),
              f('Personen', 'number of people', '4', { all: ['vier'], digits: ['4'] }),
              f('Getränke', 'drinks', 'Kaffee, Tee', { all: ['kaffee', 'tee'] }),
              f('Essen', 'food', 'Kuchen', { all: ['kuchen'] }),
            ] },
          speak: 'Play a café visit: ask for the menu, order a drink and a meal, say what you do not want, and ask for the bill. {{Die Speisekarte, bitte.}} {{Ich möchte einen Kaffee.}} {{Ich nehme keinen Kuchen.}} {{Die Rechnung, bitte!}}' } },
      { units: ['u10', 'u11', 'u12', 'u13'],
        check: { id: 'cp4', title: 'Final A1 test',
          write: { type: 'message', title: 'Ich kann nicht kommen', min: 25,
            intro: 'You cannot come to your German course on Monday. Write to your teacher Bob, about 30 words.',
            points: [
              p('Say sorry.', ['leider', 'tut mir leid', 'entschuldig']),
              p('Say why you cannot come.', ['krank', 'arbeiten', 'arzt', 'muss', 'weil']),
              p('Ask about the homework or a new date.', ['hausaufgabe', 'wann', 'neuen termin', 'dienstag', 'mittwoch', 'donnerstag', 'freitag']),
            ],
            greet: ['lieber', 'liebe', 'hallo', 'sehr geehrte', 'guten tag'],
            close: ['viele gruesse', 'liebe gruesse', 'freundlichen gruessen', 'bis bald', 'gruss'],
            model: 'Lieber Bob, leider kann ich am Montag nicht zum Kurs kommen. Ich bin krank und muss zum Arzt gehen. Was sind die Hausaufgaben? Kann ich am Mittwoch kommen? Viele Grüße, Alice' },
          speak: 'Talk for one minute without stopping: introduce yourself, describe a normal day with times, say what you can and must do, and tell what you did yesterday. {{Ich stehe um sieben Uhr auf.}} {{Ich muss heute arbeiten.}} {{Gestern habe ich Deutsch gelernt.}}' } },
    ],
  };

  /* Levels follow the Common European Framework (CEFR). A2 and B1 are built towards the
     telc Deutsch A2 and telc Deutsch B1 exams. `roast` is the level's nickname in the app. */
  const LEVELS = [
    { id: 'a1', name: 'A1', title: 'Beginner', roast: 'Helle Röstung', roastEn: 'light roast', exam: '',
      blurb: 'First words and sentences: introduce yourself, order, ask the way, talk about your day.' },
    { id: 'a2', name: 'A2', title: 'Elementary', roast: 'Mittlere Röstung', roastEn: 'medium roast', exam: 'telc Deutsch A2',
      blurb: 'Everyday life in full sentences: tell what happened, give reasons, compare, ask politely.' },
    { id: 'b1', name: 'B1', title: 'Intermediate', roast: 'Dunkle Röstung', roastEn: 'dark roast', exam: 'telc Deutsch B1',
      blurb: 'Independent German: tell stories, argue a point, write letters, plan together.' },
  ];
  UNITS.forEach((u) => { u.level = 'a1'; });
  SHEETS.forEach((sh) => { sh.level = 'a1'; });

  root.DE_BUILD = { n, x, s, c, g, tbl, d, q };
  root.DE_DATA = {
    LEVELS, UNITS, VERBS, SHEETS, METHOD, RESOURCES, PLAN,
    addUnits(level, units) { units.forEach((u) => { u.level = level; UNITS.push(u); }); },
    addSheets(level, sheets) { sheets.forEach((sh) => { sh.level = level; SHEETS.push(sh); }); },
  };
})(typeof window !== 'undefined' ? window : globalThis);
