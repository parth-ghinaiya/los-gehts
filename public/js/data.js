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
      ],
      sentences: [
        s('Das Wasser ist kalt.', 'The water is cold.'),
        s('Die Stadt ist schön.', 'The city is beautiful.'),
        s('Das Haus ist neu.', 'The house is new.'),
        s('Es ist schon spät.', 'It is already late.'),
        s('Ich trinke Wasser.', 'I am drinking water.'),
        s('Heute scheint die Sonne.', 'The sun is shining today.', ['Die Sonne scheint heute.']),
      ],
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
      ],
      sentences: [
        s('Wie alt bist du?', 'How old are you?'),
        s('Ich bin dreißig Jahre alt.', 'I am thirty years old.'),
        s('Was kostet das?', 'What does that cost?'),
        s('Das kostet fünf Euro.', 'That costs five euros.'),
        s('Ich habe zwei Kinder.', 'I have two children.'),
      ],
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

  root.DE_BUILD = { n, x, s, c, g, tbl };
  root.DE_DATA = {
    LEVELS, UNITS, VERBS, SHEETS, METHOD, RESOURCES,
    addUnits(level, units) { units.forEach((u) => { u.level = level; UNITS.push(u); }); },
    addSheets(level, sheets) { sheets.forEach((sh) => { sh.level = level; SHEETS.push(sh); }); },
  };
})(typeof window !== 'undefined' ? window : globalThis);
