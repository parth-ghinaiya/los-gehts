/* Course B1, units 1–6. Built towards telc Deutsch B1. */
(function (root) {
  'use strict';
  const { n, x, s, c, g, tbl } = root.DE_BUILD;

  root.DE_DATA.addUnits('b1', [
    /* ------------------------------------------------------------------ 1 */
    {
      id: 'b1u1', title: 'Erzählen', sub: 'Telling stories · the Präteritum',
      goal: 'Tell what happened — in writing with the Präteritum, in conversation with the Perfekt.',
      tips: [
        { h: 'Two past tenses, one meaning', html:
          `<p>{{Ich habe einen Film gesehen.}} and {{Ich sah einen Film.}} mean the same thing. The difference is where you meet them: the <b>Perfekt</b> is for speaking and chatty messages, the <b>Präteritum</b> is for writing — stories, news, reports.</p>
           <p class="note">Even when speaking, Germans prefer the Präteritum for <b>sein</b>, <b>haben</b> and the modal verbs: {{Ich war krank.}} · {{Wir hatten Glück.}} · {{Er konnte nicht kommen.}} · {{Ich musste arbeiten.}}</p>` },
        { h: 'Regular verbs: stem + te', html:
          tbl(['', 'machen', 'arbeiten'], [
            ['ich', 'mach<b>te</b>', 'arbeit<b>ete</b>'],
            ['du', 'mach<b>test</b>', 'arbeit<b>etest</b>'],
            ['er / sie / es', 'mach<b>te</b>', 'arbeit<b>ete</b>'],
            ['wir', 'mach<b>ten</b>', 'arbeit<b>eten</b>'],
            ['ihr', 'mach<b>tet</b>', 'arbeit<b>etet</b>'],
            ['sie / Sie', 'mach<b>ten</b>', 'arbeit<b>eten</b>'],
          ]) +
          `<p>The ich form and the er/sie/es form are always identical. Stems ending in -t or -d get an extra e so you can hear the ending: {{Sie wartete lange.}} · {{Er redete viel.}}</p>` },
        { h: 'Strong verbs: new vowel, no ending', html:
          `<p>Strong verbs change their vowel and take <b>no ending</b> for ich and er/sie/es. They have to be learned, but the most common ones come up all the time.</p>` +
          tbl(['Infinitive', 'ich / er', 'wir / sie'], [
            ['gehen', 'ging', 'gingen'],
            ['kommen', 'kam', 'kamen'],
            ['sehen', 'sah', 'sahen'],
            ['geben', 'gab', 'gaben'],
            ['finden', 'fand', 'fanden'],
            ['bleiben', 'blieb', 'blieben'],
          ]) +
          `<p>{{Er kam um acht, sah mich nicht und ging wieder.}}</p>
           <p class="note">The other persons take the usual endings: {{du kamst}}, {{ihr kamt}}. A few “mixed” verbs change the vowel <i>and</i> add -te: {{bringen}} → {{brachte}} · {{denken}} → {{dachte}} · {{wissen}} → {{wusste}} · {{kennen}} → {{kannte}}.</p>` },
        { h: 'telc: telling about an experience', html:
          `<p>A clear order and a few linking words make any story easy to follow, whether you tell it or write it in a letter.</p>
           <ul class="phrases">
             <li>{{Vor zwei Jahren war ich zum ersten Mal in Wien.}} <span>Two years ago I was in Vienna for the first time.</span></li>
             <li>{{zuerst}} · {{dann}} · {{danach}} · {{am Ende}} <span>first · then · after that · in the end</span></li>
             <li>{{Plötzlich hat es angefangen zu regnen.}} <span>Suddenly it started to rain.</span></li>
             <li>{{Zum Glück ist nichts passiert.}} <span>Luckily nothing happened.</span></li>
             <li>{{Das war ein tolles Erlebnis.}} <span>That was a great experience.</span></li>
             <li>{{So etwas habe ich noch nie erlebt.}} <span>I have never experienced anything like it.</span></li>
             <li>{{Das werde ich nie vergessen.}} <span>I will never forget that.</span></li>
             <li>{{Ist dir so etwas auch schon einmal passiert?}} <span>Has something like that ever happened to you?</span></li>
           </ul>` },
      ],
      words: [
        n('das', 'Erlebnis', 'Erlebnisse', 'experience (event)', 'Die Reise war ein tolles Erlebnis.', 'The trip was a great experience.'),
        x('erleben', 'to experience', 'Im Urlaub erlebten wir jeden Tag etwas Neues.', 'On holiday we experienced something new every day.'),
        n('das', 'Ereignis', 'Ereignisse', 'event; incident', 'Das war das wichtigste Ereignis des Jahres.', 'That was the most important event of the year.'),
        x('geschehen', 'to happen', 'Der Unfall geschah am frühen Morgen.', 'The accident happened in the early morning.'),
        n('der', 'Unfall', 'Unfälle', 'accident', 'Auf der Autobahn gab es einen schweren Unfall.', 'There was a serious accident on the motorway.'),
        x('berichten', 'to report', 'Die Zeitung berichtete über das Fest.', 'The newspaper reported on the festival.'),
        n('die', 'Nachricht', 'Nachrichten', 'news; message', 'Die Nachricht kam am späten Abend.', 'The news came late in the evening.'),
        x('erfahren', 'to find out', 'Ich erfuhr es erst am nächsten Tag.', 'I only found out the next day.'),
        x('bemerken', 'to notice', 'Ich bemerkte den Fehler zu spät.', 'I noticed the mistake too late.'),
        x('sich erinnern an', 'to remember', 'Ich erinnere mich gut an diesen Tag.', 'I remember that day well.'),
        n('der', 'Zeuge', 'Zeugen', 'witness', 'Ein Zeuge sah den Dieb und rief die Polizei.', 'A witness saw the thief and called the police.'),
        n('der', 'Dieb', 'Diebe', 'thief', 'Der Dieb lief schnell weg.', 'The thief ran away quickly.'),
        n('der', 'Zufall', 'Zufälle', 'coincidence', 'Wir trafen uns durch Zufall am Bahnhof.', 'We met by chance at the station.'),
        x('plötzlich', 'suddenly', 'Plötzlich ging das Licht aus.', 'Suddenly the light went out.'),
        x('neulich', 'the other day; recently', 'Neulich traf ich einen alten Freund in der Stadt.', 'The other day I met an old friend in town.'),
        x('eines Tages', 'one day', 'Eines Tages bekam ich einen Brief von ihr.', 'One day I got a letter from her.'),
        x('schließlich', 'finally; in the end', 'Schließlich fanden wir den richtigen Weg.', 'In the end we found the right way.'),
        x('zum Glück', 'luckily', 'Zum Glück war die Tür offen.', 'Luckily the door was open.'),
        x('überrascht', 'surprised', 'Wir waren alle sehr überrascht.', 'We were all very surprised.'),
        x('aufregend', 'exciting', 'Der erste Tag in der neuen Stadt war aufregend.', 'The first day in the new city was exciting.'),
      ],
      sentences: [
        s('Als ich ankam, regnete es stark.', 'When I arrived, it was raining heavily.', ['Es regnete stark, als ich ankam.']),
        s('Gestern fuhr er mit dem Zug nach Hamburg.', 'Yesterday he took the train to Hamburg.', ['Er fuhr gestern mit dem Zug nach Hamburg.']),
        s('Die Kinder spielten den ganzen Nachmittag im Garten.', 'The children played in the garden all afternoon.', ['Den ganzen Nachmittag spielten die Kinder im Garten.']),
        s('Plötzlich stand ein fremder Mann vor der Tür.', 'Suddenly a strange man was standing at the door.', ['Ein fremder Mann stand plötzlich vor der Tür.', 'Vor der Tür stand plötzlich ein fremder Mann.']),
        s('Die Polizei fand den Dieb nach zwei Tagen.', 'The police found the thief after two days.', ['Nach zwei Tagen fand die Polizei den Dieb.']),
        s('Früher gab es hier noch keinen Supermarkt.', 'There used to be no supermarket here.', ['Hier gab es früher noch keinen Supermarkt.']),
        s('Sie sah ihn und lief sofort weg.', 'She saw him and ran away at once.'),
        s('Ich wusste nicht, dass du krank warst.', 'I didn’t know that you were ill.'),
      ],
      cloze: [
        c('Vor zehn Jahren ___ meine Eltern noch in einem kleinen Dorf.', 'wohnten', ['wohnen', 'gewohnt', 'wohntet'], 'Ten years ago my parents still lived in a small village.', 'Regular Präteritum: stem + -te; the plural form (sie) is wohnten.'),
        c('Ich habe meinen alten Lehrer durch ___ im Supermarkt getroffen.', 'Zufall', ['Unfall', 'Ereignis', 'Erlebnis'], 'I met my old teacher by chance in the supermarket.', 'durch Zufall = by chance.'),
        c('Ich ___ gestern leider nicht kommen, weil ich arbeiten musste.', 'konnte', ['könnte', 'kann', 'gekonnt'], 'Unfortunately I couldn’t come yesterday because I had to work.', 'Modal verbs lose their umlaut in the Präteritum: können → konnte.'),
        c('___ ich ein Kind war, hatten wir keinen Fernseher.', 'Als', ['Wenn', 'Wann', 'Ob'], 'When I was a child, we had no television.', 'One period or event in the past takes als, not wenn.'),
        c('In dieser Straße ___ es früher viele kleine Läden.', 'gab', ['gibt', 'gaben', 'gegeben'], 'There used to be many small shops in this street.', 'es gibt → es gab; it stays singular whatever follows.'),
        c('Sie ___ den ganzen Tag im Bett, weil sie Fieber hatte.', 'blieb', ['bliebt', 'bleibte', 'geblieben'], 'She stayed in bed all day because she had a fever.', 'bleiben is strong: blieb, with no ending for ich and er/sie/es.'),
        c('Ich kann mich noch gut ___ meinen ersten Schultag erinnern.', 'an', ['auf', 'über', 'für'], 'I can still remember my first day at school well.', 'sich erinnern takes an + accusative.'),
        c('Niemand weiß genau, was in dieser Nacht ___ ist.', 'geschehen', ['berichtet', 'erlebt', 'bemerkt'], 'Nobody knows exactly what happened that night.', 'geschehen (to happen) forms its Perfekt with sein; the other three need haben.'),
      ],
    },

    /* ------------------------------------------------------------------ 2 */
    {
      id: 'b1u2', title: 'Vorher & nachher', sub: 'Life story · the Plusquamperfekt',
      goal: 'Tell your life story and put events in order: what had happened before, what came after and what went on meanwhile.',
      tips: [
        { h: 'The past before the past', html:
          `<p>The <b>Plusquamperfekt</b> says that something was already over before another past event. Build it like the Perfekt, but put haben or sein into the Präteritum: <b>hatte</b> / <b>war</b> + participle.</p>` +
          tbl(['', 'with haben', 'with sein'], [
            ['ich', '<b>hatte</b> gegessen', '<b>war</b> gegangen'],
            ['du', '<b>hattest</b> gegessen', '<b>warst</b> gegangen'],
            ['er / sie / es', '<b>hatte</b> gegessen', '<b>war</b> gegangen'],
            ['wir', '<b>hatten</b> gegessen', '<b>waren</b> gegangen'],
            ['ihr', '<b>hattet</b> gegessen', '<b>wart</b> gegangen'],
            ['sie / Sie', '<b>hatten</b> gegessen', '<b>waren</b> gegangen'],
          ]) +
          `<p>{{Als ich ankam, war der Zug schon abgefahren.}} · {{Ich hatte den Schlüssel vergessen.}}</p>` },
        { h: 'nachdem and bevor', html:
          `<p><b>nachdem</b> (after) introduces what happened <i>first</i>, so its clause goes one tense further back: Plusquamperfekt there, Präteritum or Perfekt in the main clause.</p>
           <p>{{Nachdem ich die Schule beendet hatte, machte ich eine Ausbildung.}}</p>
           <p><b>bevor</b> (before) introduces what happened <i>later</i>. It usually keeps the tense of the main clause: {{Bevor ich nach Deutschland kam, arbeitete ich in einem Hotel.}}</p>
           <p class="note">Both send the verb to the end of their clause. If that clause comes first, the main clause starts with its verb: …beendet <b>hatte</b>, <b>machte</b> ich… Talking about now? Use Perfekt + present: {{Nachdem ich gegessen habe, gehe ich spazieren.}}</p>` },
        { h: 'während and seit(dem)', html:
          `<p><b>während</b> (while): two things happen at the same time, so both halves take the same tense. {{Während ich studierte, arbeitete ich in einem Café.}}</p>
           <p><b>seit</b> or <b>seitdem</b> (since): something began in the past and is still going on. German uses the <b>present</b> here, where English says “have lived”. {{Seitdem ich hier wohne, fahre ich jeden Tag Fahrrad.}}</p>
           <p class="note">With a noun instead of a clause: {{während des Studiums}} (genitive) · {{seit einem Jahr}} (dative) · {{nach der Schule}} · {{vor der Prüfung}}.</p>` },
        { h: 'telc: talking about your life so far', html:
          `<p>Being able to sum up your own background is useful in any conversation and in letters. Prepare your own version of these sentences.</p>
           <ul class="phrases">
             <li>{{Ich bin in einer kleinen Stadt geboren und aufgewachsen.}} <span>I was born and grew up in a small town.</span></li>
             <li>{{Nach der Schule habe ich eine Ausbildung als Mechaniker gemacht.}} <span>After school I trained as a mechanic.</span></li>
             <li>{{Ich habe vier Jahre Informatik studiert.}} <span>I studied computer science for four years.</span></li>
             <li>{{Danach habe ich zwei Jahre in einem Büro gearbeitet.}} <span>After that I worked in an office for two years.</span></li>
             <li>{{Vor drei Jahren bin ich nach Deutschland gekommen.}} <span>I came to Germany three years ago.</span></li>
             <li>{{Seit einem Jahr lerne ich Deutsch.}} <span>I have been learning German for a year.</span></li>
             <li>{{Zurzeit mache ich einen Sprachkurs.}} <span>At the moment I am taking a language course.</span></li>
             <li>{{In Zukunft möchte ich in meinem Beruf arbeiten.}} <span>In future I would like to work in my profession.</span></li>
           </ul>` },
      ],
      words: [
        n('die', 'Grundschule', 'Grundschulen', 'primary school', 'Meine Tochter geht seit einem Jahr in die Grundschule.', 'My daughter has been going to primary school for a year.'),
        n('die', 'Jugend', '', 'youth', 'In seiner Jugend spielte er viel Fußball.', 'In his youth he played a lot of football.'),
        x('heiraten', 'to marry', 'Nachdem sie geheiratet hatten, zogen sie nach Wien.', 'After they had got married, they moved to Vienna.'),
        x('verbringen', 'to spend (time)', 'Wir verbrachten die Ferien immer bei den Großeltern.', 'We always spent the holidays at our grandparents’.'),
        n('das', 'Fach', 'Fächer', 'school subject', 'Welches Fach mochtest du in der Schule am liebsten?', 'Which subject did you like best at school?'),
        n('die', 'Note', 'Noten', 'grade; mark', 'In Mathematik hatte ich immer gute Noten.', 'I always had good grades in maths.'),
        n('das', 'Zeugnis', 'Zeugnisse', 'certificate; school report', 'Am Ende des Schuljahres bekamen wir unsere Zeugnisse.', 'At the end of the school year we got our reports.'),
        n('der', 'Abschluss', 'Abschlüsse', 'degree; qualification', 'Sie hat ihren Abschluss in Wien gemacht.', 'She got her degree in Vienna.'),
        n('die', 'Lehre', 'Lehren', 'apprenticeship', 'Nachdem er die Schule beendet hatte, begann er eine Lehre als Bäcker.', 'After he had finished school, he started an apprenticeship as a baker.'),
        n('das', 'Studium', '', 'university studies', 'Während des Studiums wohnte ich bei meinen Eltern.', 'During my studies I lived with my parents.'),
        n('die', 'Prüfung', 'Prüfungen', 'exam', 'Vor der Prüfung war ich sehr nervös.', 'Before the exam I was very nervous.'),
        x('beenden', 'to finish; to complete', 'Sie beendete ihr Studium nach vier Jahren.', 'She finished her studies after four years.'),
        x('bestehen', 'to pass (an exam)', 'Er hatte die Prüfung schon beim ersten Mal bestanden.', 'He had already passed the exam the first time.'),
        x('sich entscheiden für', 'to decide on', 'Ich habe mich für eine Ausbildung entschieden.', 'I decided on vocational training.'),
        x('nachdem', 'after (+ clause)', 'Nachdem ich angekommen war, rief ich meine Eltern an.', 'After I had arrived, I called my parents.'),
        x('bevor', 'before (+ clause)', 'Bevor ich nach Hause ging, hatte ich alles erledigt.', 'Before I went home, I had finished everything.'),
        x('während', 'while; during', 'Während ich kochte, deckte er den Tisch.', 'While I was cooking, he set the table.'),
        x('seitdem', 'since (+ clause)', 'Seitdem sie hier arbeitet, ist sie viel zufriedener.', 'Since she has been working here, she has been much happier.'),
        x('vorher', 'beforehand', 'Vorher hatte ich noch nie im Ausland gelebt.', 'Before that I had never lived abroad.'),
        x('inzwischen', 'in the meantime', 'Inzwischen hatte es aufgehört zu regnen.', 'In the meantime it had stopped raining.'),
      ],
      sentences: [
        s('Nachdem wir gegessen hatten, gingen wir spazieren.', 'After we had eaten, we went for a walk.', ['Wir gingen spazieren, nachdem wir gegessen hatten.']),
        s('Der Zug war schon abgefahren, als ich ankam.', 'The train had already left when I arrived.', ['Als ich ankam, war der Zug schon abgefahren.']),
        s('Bevor ich nach Deutschland kam, hatte ich Englisch studiert.', 'Before I came to Germany, I had studied English.', ['Ich hatte Englisch studiert, bevor ich nach Deutschland kam.']),
        s('Während sie studierte, arbeitete sie in einem Café.', 'While she was studying, she worked in a café.', ['Sie arbeitete in einem Café, während sie studierte.']),
        s('Seitdem ich hier wohne, fahre ich immer Fahrrad.', 'Since I have lived here, I always cycle.', ['Ich fahre immer Fahrrad, seitdem ich hier wohne.']),
        s('Ich hatte das Buch vorher noch nie gelesen.', 'I had never read the book before.', ['Vorher hatte ich das Buch noch nie gelesen.', 'Das Buch hatte ich vorher noch nie gelesen.']),
        s('Nachdem er die Prüfung bestanden hatte, feierte er.', 'After he had passed the exam, he celebrated.', ['Er feierte, nachdem er die Prüfung bestanden hatte.']),
        s('Sie war schon gegangen, bevor ich anrufen konnte.', 'She had already left before I could call.', ['Bevor ich anrufen konnte, war sie schon gegangen.']),
      ],
      cloze: [
        c('Nachdem ich die Schule beendet ___, machte ich eine Ausbildung.', 'hatte', ['habe', 'war', 'hätte'], 'After I had finished school, I did vocational training.', 'nachdem + Plusquamperfekt before a main clause in the past; beenden takes haben.'),
        c('Als wir am Bahnhof ankamen, ___ der Zug schon abgefahren.', 'war', ['hatte', 'wurde', 'wäre'], 'When we arrived at the station, the train had already left.', 'Plusquamperfekt of a movement verb: war + participle.'),
        c('___ ich in Deutschland lebe, spreche ich jeden Tag Deutsch.', 'Seitdem', ['Nachdem', 'Bevor', 'Als'], 'Since I have been living in Germany, I have spoken German every day.', 'seitdem = since: it began in the past and is still true, so German uses the present.'),
        c('___ du das Haus verlässt, mach bitte alle Fenster zu.', 'Bevor', ['Nachdem', 'Seitdem', 'Während'], 'Before you leave the house, please close all the windows.', 'bevor = before: the windows have to be closed first.'),
        c('___ des Studiums arbeitete sie abends in einem Restaurant.', 'Während', ['Seit', 'Nach', 'Bei'], 'During her studies she worked in a restaurant in the evenings.', 'während + genitive (des Studiums); seit, nach and bei need the dative.'),
        c('Er hat die Prüfung beim ersten Mal ___.', 'bestanden', ['gestanden', 'entstanden', 'bestellt'], 'He passed the exam at the first attempt.', 'eine Prüfung bestehen = to pass an exam.'),
        c('Ich bin in einem kleinen Dorf ___ und dort auch zur Schule gegangen.', 'aufgewachsen', ['gewachsen', 'aufgehört', 'aufgepasst'], 'I grew up in a small village and also went to school there.', 'aufwachsen = to grow up; its Perfekt takes sein.'),
        c('Nach der Schule hat sie sich ___ eine Ausbildung entschieden.', 'für', ['an', 'auf', 'um'], 'After school she decided on vocational training.', 'sich entscheiden für + accusative.'),
      ],
    },

    /* ------------------------------------------------------------------ 3 */
    {
      id: 'b1u3', title: 'Menschen & Beziehungen', sub: 'Describing people · relative clauses',
      goal: 'Describe the people in your life and say exactly which person or thing you mean with a relative clause.',
      tips: [
        { h: 'A clause that describes a noun', html:
          `<p>A relative clause tells you <i>which</i> person or thing you mean. It starts after a comma with a pronoun that looks like the article, and its verb goes to the end.</p>
           <p>{{Das ist der Mann, der nebenan wohnt.}}<br>{{Das ist die Frau, die bei uns arbeitet.}}<br>{{Das ist das Kind, das immer lacht.}}<br>{{Das sind die Leute, die uns geholfen haben.}}</p>
           <p class="note">English can drop the pronoun (“the man I know”). German never can: {{der Mann, den ich kenne}}.</p>` },
        { h: 'Gender from the noun, case from the clause', html:
          `<p><b>Gender and number</b> come from the noun you describe. The <b>case</b> depends on the pronoun’s job inside the relative clause.</p>` +
          tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
            ['Nominative', g('der'), g('die'), g('das'), 'die'],
            ['Accusative', g('der', 'den'), g('die'), g('das'), 'die'],
            ['Dative', g('der', 'dem'), g('die', 'der'), g('das', 'dem'), '<b>denen</b>'],
          ]) +
          `<p>{{Der Mann, den ich gestern getroffen habe, ist mein Nachbar.}} (ich treffe <i>ihn</i> → accusative)<br>{{Die Freundin, der ich alles erzähle, wohnt in Berlin.}} (ich erzähle <i>ihr</i> → dative)</p>
           <p class="note">Almost the same as the article table. The only new form is the dative plural <b>denen</b>: {{die Kinder, denen wir helfen}}.</p>` },
        { h: 'With a preposition', html:
          `<p>If the verb in the relative clause needs a preposition, the preposition comes <b>first</b>, directly before the pronoun — and it decides the case.</p>
           <p>{{Das ist der Kollege, mit dem ich zusammenarbeite.}} (mit + dative)<br>{{Das ist die Freundin, für die ich das Geschenk gekauft habe.}} (für + accusative)<br>{{Das sind Freunde, auf die ich mich verlassen kann.}} (sich verlassen auf + accusative)</p>
           <p class="note">English likes to leave the preposition at the end (“the colleague I work <i>with</i>”). In German it can never stand there.</p>` },
        { h: 'telc: describing a person', html:
          `<p>Useful when you talk about family and friends or introduce someone in a letter.</p>
           <ul class="phrases">
             <li>{{Ich möchte Ihnen meine beste Freundin vorstellen.}} <span>I would like to introduce my best friend to you.</span></li>
             <li>{{Wir kennen uns seit der Schulzeit.}} <span>We have known each other since our school days.</span></li>
             <li>{{Sie ist ein Mensch, der immer zuhört.}} <span>She is a person who always listens.</span></li>
             <li>{{Er ist jemand, auf den man sich verlassen kann.}} <span>He is someone you can rely on.</span></li>
             <li>{{Ich finde ihn sehr zuverlässig und ehrlich.}} <span>I find him very reliable and honest.</span></li>
             <li>{{An ihr gefällt mir besonders, dass sie so geduldig ist.}} <span>What I especially like about her is that she is so patient.</span></li>
             <li>{{Wir verstehen uns sehr gut.}} <span>We get on very well.</span></li>
             <li>{{Wir haben viel gemeinsam.}} <span>We have a lot in common.</span></li>
           </ul>` },
      ],
      words: [
        n('die', 'Beziehung', 'Beziehungen', 'relationship', 'Sie hat eine gute Beziehung zu ihren Eltern.', 'She has a good relationship with her parents.'),
        n('die', 'Freundschaft', 'Freundschaften', 'friendship', 'Das ist eine Freundschaft, die schon zwanzig Jahre dauert.', 'That is a friendship that has already lasted twenty years.'),
        n('der', 'Charakter', 'Charaktere', 'character; personality', 'Er hat einen guten Charakter.', 'He has a good character.'),
        n('die', 'Eigenschaft', 'Eigenschaften', 'quality; trait', 'Geduld ist eine Eigenschaft, die ich an ihr mag.', 'Patience is a quality that I like about her.'),
        n('der', 'Humor', '', 'sense of humour', 'Ich mag Menschen, die Humor haben.', 'I like people who have a sense of humour.'),
        x('zuverlässig', 'reliable', 'Er ist ein Kollege, der sehr zuverlässig ist.', 'He is a colleague who is very reliable.'),
        x('ehrlich', 'honest', 'Ich brauche einen Freund, der ehrlich zu mir ist.', 'I need a friend who is honest with me.'),
        x('geduldig', 'patient', 'Sie ist eine Lehrerin, die sehr geduldig ist.', 'She is a teacher who is very patient.'),
        x('sympathisch', 'likeable; nice', 'Der Verkäufer, der uns bediente, war sehr sympathisch.', 'The shop assistant who served us was very likeable.'),
        x('großzügig', 'generous', 'Mein Onkel ist sehr großzügig.', 'My uncle is very generous.'),
        x('neugierig', 'curious; nosy', 'Meine Nachbarin ist ziemlich neugierig.', 'My neighbour is rather nosy.'),
        x('schüchtern', 'shy', 'Als Kind war ich sehr schüchtern.', 'As a child I was very shy.'),
        x('vertrauen', 'to trust', 'Er ist der Mensch, dem ich am meisten vertraue.', 'He is the person I trust most.'),
        x('sich unterhalten mit', 'to chat with', 'Das ist der Nachbar, mit dem ich mich oft unterhalte.', 'That is the neighbour I often chat with.'),
        x('sich kümmern um', 'to look after', 'Das ist die Nachbarin, die sich um unsere Katze kümmert.', 'That is the neighbour who looks after our cat.'),
        x('kennenlernen', 'to get to know', 'Das ist die Frau, die ich im Urlaub kennengelernt habe.', 'That is the woman I got to know on holiday.'),
        x('sich verlieben in', 'to fall in love with', 'Er hat sich in eine Kollegin verliebt.', 'He has fallen in love with a colleague.'),
        x('verwandt', 'related (by family)', 'Wir heißen gleich, aber wir sind nicht verwandt.', 'We have the same name, but we are not related.'),
        x('ähnlich', 'similar', 'Sie sieht ihrer Mutter sehr ähnlich.', 'She looks very much like her mother.'),
        n('das', 'Vorbild', 'Vorbilder', 'role model', 'Meine Großmutter ist ein Mensch, der für mich ein Vorbild ist.', 'My grandmother is a person who is a role model for me.'),
      ],
      sentences: [
        s('Das ist der Mann, der nebenan wohnt.', 'That is the man who lives next door.'),
        s('Die Frau, die dort steht, ist meine Chefin.', 'The woman who is standing there is my boss.', ['Meine Chefin ist die Frau, die dort steht.']),
        s('Der Freund, den ich besuche, wohnt in Köln.', 'The friend I am visiting lives in Cologne.'),
        s('Das ist die Kollegin, mit der ich zusammenarbeite.', 'That is the colleague I work with.'),
        s('Die Kinder, denen wir helfen, sind sehr nett.', 'The children we help are very nice.'),
        s('Ich habe einen Bruder, der in Wien lebt.', 'I have a brother who lives in Vienna.'),
        s('Er ist ein Mensch, auf den man sich verlassen kann.', 'He is a person you can rely on.'),
        s('Wo ist das Kind, dem dieser Ball gehört?', 'Where is the child this ball belongs to?'),
      ],
      cloze: [
        c('Das ist das Mädchen, ___ neben uns wohnt.', 'das', ['die', 'der', 'dem'], 'That is the girl who lives next to us.', 'The pronoun follows the grammatical gender: das Mädchen is neuter, here in the nominative.'),
        c('Der Film, ___ wir gestern gesehen haben, war langweilig.', 'den', ['der', 'dem', 'das'], 'The film we saw yesterday was boring.', 'sehen needs a direct object: masculine accusative den.'),
        c('Die Frau, ___ ich geholfen habe, hat sich sehr gefreut.', 'der', ['die', 'den', 'dem'], 'The woman I helped was very pleased.', 'helfen takes the dative; feminine dative is der.'),
        c('Die Freunde, mit ___ ich in den Urlaub fahre, kenne ich seit der Schule.', 'denen', ['den', 'die', 'dem'], 'I have known the friends I go on holiday with since school.', 'mit + dative; the dative plural relative pronoun is denen.'),
        c('Das ist die Kollegin, auf ___ ich gerade warte.', 'die', ['der', 'den', 'dem'], 'That is the colleague I am waiting for right now.', 'warten auf + accusative; feminine accusative is die.'),
        c('Mit meiner Nachbarin kann ich mich stundenlang ___.', 'unterhalten', ['kennenlernen', 'vertrauen', 'kümmern'], 'I can chat with my neighbour for hours.', 'sich unterhalten mit = to chat with.'),
        c('Sie sagt immer die Wahrheit, sie ist also sehr ___.', 'ehrlich', ['schüchtern', 'neugierig', 'großzügig'], 'She always tells the truth, so she is very honest.', 'ehrlich = honest; the others mean shy, curious and generous.'),
        c('Er kümmert sich jeden Tag ___ seine kranke Mutter.', 'um', ['für', 'über', 'auf'], 'He looks after his sick mother every day.', 'sich kümmern um + accusative.'),
      ],
    },

    /* ------------------------------------------------------------------ 4 */
    {
      id: 'b1u4', title: 'Wünsche & Ratschläge', sub: 'Wishes and advice · Konjunktiv II',
      goal: 'Say what you would do, wish for things that are not real and give friendly advice.',
      tips: [
        { h: 'würde + infinitive', html:
          `<p>The <b>Konjunktiv II</b> is for things that are not real: imagined, wished for or simply polite. For most verbs you use <b>würde</b> in position 2 and the infinitive at the end — just like English “would”.</p>` +
          tbl(['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'], [
            ['würde', 'würdest', 'würde', 'würden', 'würdet', 'würden'],
          ]) +
          `<p>{{Ich würde gern mehr reisen.}} · {{Was würdest du tun?}} · {{Wir würden lieber zu Hause bleiben.}}</p>` },
        { h: 'hätte, wäre and the modal verbs', html:
          `<p>A handful of very common verbs use their own one-word form instead of würde. Take the Präteritum and add an umlaut:</p>` +
          tbl(['Infinitive', 'Präteritum', 'Konjunktiv II', 'English'], [
            ['haben', 'hatte', '<b>hätte</b>', 'would have'],
            ['sein', 'war', '<b>wäre</b>', 'would be'],
            ['können', 'konnte', '<b>könnte</b>', 'could'],
            ['müssen', 'musste', '<b>müsste</b>', 'would have to'],
            ['dürfen', 'durfte', '<b>dürfte</b>', 'would be allowed to'],
            ['sollen', 'sollte', '<b>sollte</b>', 'should'],
          ]) +
          `<p>{{Ich hätte gern mehr Zeit.}} · {{Das wäre schön.}} · {{Könntest du mir helfen?}}</p>
           <p class="note">sollte and wollte get no umlaut. The endings are the usual ones: {{ich hätte}}, {{du hättest}}, {{wir hätten}} · {{ich wäre}}, {{du wärst}}, {{wir wären}}.</p>` },
        { h: 'Unreal conditions with wenn', html:
          `<p>“If I had…, I would…”: German puts the Konjunktiv II into <b>both</b> halves.</p>
           <p>{{Wenn ich mehr Geld hätte, würde ich ein Haus kaufen.}}<br>{{Wenn ich du wäre, würde ich das nicht machen.}}</p>
           <p>The verb goes to the end of the wenn-clause, and the main clause then starts with its verb. You can also turn it around: {{Ich würde ein Haus kaufen, wenn ich mehr Geld hätte.}}</p>
           <p class="note">For a wish, keep only the wenn-half and add <b>doch</b> or <b>nur</b>: {{Wenn ich doch mehr Zeit hätte!}} Or say: {{Ich wünschte, ich hätte mehr Zeit.}}</p>` },
        { h: 'telc: giving advice and making suggestions', html:
          `<p>The Konjunktiv II makes advice sound friendly instead of bossy — ideal when you plan something together or answer a letter asking for help.</p>
           <ul class="phrases">
             <li>{{An deiner Stelle würde ich mit dem Chef sprechen.}} <span>If I were you, I would talk to the boss.</span></li>
             <li>{{Du solltest mehr Pausen machen.}} <span>You should take more breaks.</span></li>
             <li>{{Ich würde dir raten, früh zu buchen.}} <span>I would advise you to book early.</span></li>
             <li>{{Wir könnten auch zusammen kochen.}} <span>We could also cook together.</span></li>
             <li>{{Ich schlage vor, dass wir ein Geschenk kaufen.}} <span>I suggest that we buy a present.</span></li>
             <li>{{Wie wäre es, wenn wir am Samstag fahren würden?}} <span>How about going on Saturday?</span></li>
             <li>{{Es wäre besser, wenn wir früher anfangen würden.}} <span>It would be better if we started earlier.</span></li>
             <li>{{Das wäre eine gute Idee.}} <span>That would be a good idea.</span></li>
           </ul>` },
      ],
      words: [
        n('der', 'Wunsch', 'Wünsche', 'wish', 'Mein größter Wunsch wäre ein eigenes Haus.', 'My greatest wish would be a house of my own.'),
        x('sich wünschen', 'to wish for', 'Ich wünsche mir mehr Zeit für meine Familie.', 'I wish I had more time for my family.'),
        n('der', 'Traum', 'Träume', 'dream', 'Eine Reise nach Japan wäre mein Traum.', 'A trip to Japan would be my dream.'),
        n('die', 'Hoffnung', 'Hoffnungen', 'hope', 'Wir sollten die Hoffnung nicht aufgeben.', 'We should not give up hope.'),
        n('der', 'Ratschlag', 'Ratschläge', 'piece of advice', 'Danke für den guten Ratschlag!', 'Thanks for the good advice!'),
        x('raten', 'to advise', 'Ich würde dir raten, zum Arzt zu gehen.', 'I would advise you to go to the doctor.'),
        x('sich überlegen', 'to think over', 'An deiner Stelle würde ich mir das gut überlegen.', 'If I were you, I would think that over carefully.'),
        x('an deiner Stelle', 'if I were you', 'An deiner Stelle würde ich das Angebot annehmen.', 'If I were you, I would accept the offer.'),
        x('unbedingt', 'definitely; absolutely', 'Den Film solltest du unbedingt sehen.', 'You should definitely see that film.'),
        x('auf keinen Fall', 'under no circumstances', 'Das würde ich auf keinen Fall machen.', 'I would not do that under any circumstances.'),
        x('eigentlich', 'actually', 'Eigentlich müsste ich heute lernen.', 'Actually I ought to study today.'),
        n('die', 'Möglichkeit', 'Möglichkeiten', 'possibility; option', 'Wenn ich die Möglichkeit hätte, würde ich im Ausland arbeiten.', 'If I had the opportunity, I would work abroad.'),
        n('die', 'Chance', 'Chancen', 'chance', 'Du solltest diese Chance nutzen.', 'You should take this chance.'),
        n('die', 'Wahl', 'Wahlen', 'choice', 'Wenn ich die Wahl hätte, würde ich am Meer leben.', 'If I had the choice, I would live by the sea.'),
        n('die', 'Lösung', 'Lösungen', 'solution', 'Das wäre die beste Lösung für alle.', 'That would be the best solution for everyone.'),
        x('verändern', 'to change (something)', 'Diese Stelle würde mein Leben verändern.', 'This job would change my life.'),
        x('ausprobieren', 'to try out', 'Das solltest du unbedingt einmal ausprobieren.', 'You should definitely try that out some time.'),
        x('sich leisten', 'to afford', 'Wenn ich mehr verdienen würde, könnte ich mir ein Auto leisten.', 'If I earned more, I could afford a car.'),
        x('sich Sorgen machen', 'to worry', 'Du solltest dir nicht so viele Sorgen machen.', 'You shouldn’t worry so much.'),
        x('reich', 'rich', 'Wenn ich reich wäre, würde ich weniger arbeiten.', 'If I were rich, I would work less.'),
      ],
      sentences: [
        s('Wenn ich mehr Zeit hätte, würde ich reisen.', 'If I had more time, I would travel.', ['Ich würde reisen, wenn ich mehr Zeit hätte.']),
        s('An deiner Stelle würde ich mit ihm sprechen.', 'If I were you, I would talk to him.', ['Ich würde an deiner Stelle mit ihm sprechen.']),
        s('Du solltest wirklich mehr schlafen.', 'You really should sleep more.'),
        s('Wenn ich reich wäre, würde ich nicht mehr arbeiten.', 'If I were rich, I would stop working.', ['Ich würde nicht mehr arbeiten, wenn ich reich wäre.']),
        s('Ich hätte gern ein Haus mit Garten.', 'I would like to have a house with a garden.'),
        s('Könntest du mir bitte einen Rat geben?', 'Could you give me some advice, please?'),
        s('Es wäre besser, wenn du zum Arzt gehen würdest.', 'It would be better if you went to the doctor.'),
        s('Was würdest du tun, wenn du die Wahl hättest?', 'What would you do if you had the choice?'),
      ],
      cloze: [
        c('Wenn ich ein Auto ___, würde ich dich abholen.', 'hätte', ['habe', 'hatte', 'wäre'], 'If I had a car, I would pick you up.', 'An unreal condition needs the Konjunktiv II: haben → hätte.'),
        c('Wenn ich du ___, würde ich die Stelle annehmen.', 'wäre', ['bin', 'war', 'würde'], 'If I were you, I would take the job.', 'The Konjunktiv II of sein is wäre.'),
        c('An deiner ___ würde ich zuerst mit dem Vermieter sprechen.', 'Stelle', ['Platz', 'Lage', 'Ort'], 'If I were you, I would talk to the landlord first.', 'Fixed phrase: an deiner Stelle (in your place).'),
        c('Du ___ weniger Kaffee trinken, das wäre besser für dich.', 'solltest', ['solltet', 'wärst', 'hättest'], 'You should drink less coffee; that would be better for you.', 'Advice: du solltest + infinitive.'),
        c('Wenn er mehr lernen ___, hätte er bessere Noten.', 'würde', ['wird', 'wurde', 'wäre'], 'If he studied more, he would have better grades.', 'Most verbs form the Konjunktiv II with würde + infinitive.'),
        c('Ich wünschte, ich ___ besser Deutsch sprechen.', 'könnte', ['kann', 'konnte', 'könnten'], 'I wish I could speak German better.', 'A wish is unreal, so it takes the Konjunktiv II: können → könnte.'),
        c('Ich kann mir im Moment kein neues Auto ___.', 'leisten', ['verzichten', 'träumen', 'raten'], 'I can’t afford a new car at the moment.', 'sich etwas leisten = to afford something.'),
        c('Mach dir keine ___, wir finden bestimmt eine Lösung.', 'Sorgen', ['Wünsche', 'Träume', 'Ratschläge'], 'Don’t worry, we will certainly find a solution.', 'sich Sorgen machen = to worry.'),
      ],
    },

    /* ------------------------------------------------------------------ 5 */
    {
      id: 'b1u5', title: 'Arbeit & Bewerbung', sub: 'Job applications · infinitive with zu',
      goal: 'Apply for a job, talk about your plans and say what you do things for with zu, um … zu and damit.',
      tips: [
        { h: 'zu + infinitive', html:
          `<p>After many verbs, adjectives and nouns, the second verb comes at the very end with <b>zu</b> — like English “to”.</p>
           <p>{{Ich versuche, pünktlich zu sein.}}<br>{{Es ist wichtig, höflich zu bleiben.}}<br>{{Ich habe keine Lust, heute zu arbeiten.}}</p>
           <p>Typical triggers: {{versuchen}}, {{vergessen}}, {{anfangen}}, {{aufhören}}, {{hoffen}}, {{vorhaben}} · {{es ist wichtig}}, {{es ist schwer}} · {{Lust haben}}, {{Zeit haben}}.</p>
           <p class="note">Separable verbs take zu in the middle: {{anzurufen}}, {{einzukaufen}}, {{mitzubringen}}. And there is never a zu after a modal verb: {{Ich muss arbeiten.}}</p>` },
        { h: 'um … zu and damit: saying what for', html:
          `<p>Both answer the question <b>Wozu?</b> (what for?).</p>` +
          tbl(['', 'Use it when…', 'Example'], [
            ['<b>um … zu</b>', 'both halves have the same subject', '{{Ich lerne Deutsch, um in Deutschland zu arbeiten.}}'],
            ['<b>damit</b>', 'the subjects are different', '{{Ich spreche langsam, damit Sie mich verstehen.}}'],
          ]) +
          `<p class="note">damit starts a normal subordinate clause: it has its own subject and a conjugated verb at the end. um … zu has no subject of its own. Don’t confuse either with <b>weil</b>, which gives a reason, not a purpose.</p>` },
        { h: 'statt … zu and ohne … zu', html:
          `<p>Two more patterns built exactly like um … zu. English uses “-ing” here; German uses zu + infinitive.</p>
           <p><b>ohne … zu</b> = without doing: {{Er ging, ohne ein Wort zu sagen.}}<br><b>statt … zu</b> = instead of doing: {{Statt zu lernen, spielt er am Computer.}}</p>
           <p>{{Sie hat die Stelle bekommen, ohne viel Erfahrung zu haben.}}<br>{{Statt eine E-Mail zu schreiben, rufe ich lieber an.}}</p>
           <p class="note">You will also see the longer form <b>anstatt … zu</b>. It means the same.</p>` },
        { h: 'telc: writing a job application', html:
          `<p>A formal letter runs on fixed phrases. With these the frame is done and you only fill in your own details.</p>
           <ul class="phrases">
             <li>{{Sehr geehrte Damen und Herren,}} <span>Dear Sir or Madam,</span></li>
             <li>{{mit großem Interesse habe ich Ihre Anzeige gelesen.}} <span>I read your advertisement with great interest.</span></li>
             <li>{{Hiermit bewerbe ich mich um die Stelle als Verkäuferin.}} <span>I hereby apply for the position of sales assistant.</span></li>
             <li>{{Ich habe eine Ausbildung als Verkäuferin abgeschlossen.}} <span>I have completed training as a sales assistant.</span></li>
             <li>{{Ich habe drei Jahre Erfahrung in diesem Beruf.}} <span>I have three years of experience in this profession.</span></li>
             <li>{{Ich arbeite gern im Team und bin sehr zuverlässig.}} <span>I like working in a team and am very reliable.</span></li>
             <li>{{Über eine Einladung zu einem Gespräch würde ich mich sehr freuen.}} <span>I would be very pleased to be invited to an interview.</span></li>
             <li>{{Mit freundlichen Grüßen}} <span>Yours sincerely</span></li>
           </ul>
           <p class="note">The greeting ends with a comma, so the first line of the letter starts with a small letter.</p>` },
      ],
      words: [
        n('der', 'Arbeitsplatz', 'Arbeitsplätze', 'workplace; job', 'Viele Menschen haben Angst, ihren Arbeitsplatz zu verlieren.', 'Many people are afraid of losing their job.'),
        n('die', 'Stellenanzeige', 'Stellenanzeigen', 'job advertisement', 'Ich habe Ihre Stellenanzeige im Internet gelesen.', 'I read your job advertisement on the internet.'),
        n('der', 'Bewerber', 'Bewerber', 'applicant', 'Die Firma hat vor, fünf Bewerber zum Gespräch einzuladen.', 'The company intends to invite five applicants for an interview.'),
        x('sich bewerben um', 'to apply for', 'Sie bewirbt sich um eine Stelle als Verkäuferin.', 'She is applying for a job as a sales assistant.'),
        n('der', 'Lebenslauf', 'Lebensläufe', 'CV; résumé', 'Vergiss nicht, den Lebenslauf mitzuschicken.', 'Don’t forget to send the CV along.'),
        n('das', 'Vorstellungsgespräch', 'Vorstellungsgespräche', 'job interview', 'Er hat morgen ein Vorstellungsgespräch.', 'He has a job interview tomorrow.'),
        x('sich vorbereiten auf', 'to prepare for', 'Ich muss mich auf das Gespräch vorbereiten.', 'I have to prepare for the interview.'),
        n('die', 'Erfahrung', 'Erfahrungen', 'experience', 'Sie hat viel Erfahrung im Verkauf.', 'She has a lot of experience in sales.'),
        n('die', 'Kenntnis', 'Kenntnisse', 'knowledge (of a subject)', 'Für die Stelle braucht man gute Kenntnisse in Englisch.', 'For the job you need a good knowledge of English.'),
        n('die', 'Voraussetzung', 'Voraussetzungen', 'requirement', 'Ein Führerschein ist Voraussetzung für die Stelle.', 'A driving licence is a requirement for the job.'),
        n('der', 'Arbeitgeber', 'Arbeitgeber', 'employer', 'Mein Arbeitgeber bezahlt den Sprachkurs.', 'My employer pays for the language course.'),
        n('die', 'Überstunde', 'Überstunden', 'hour of overtime', 'Er macht viele Überstunden, um mehr zu verdienen.', 'He does a lot of overtime in order to earn more.'),
        x('unterschreiben', 'to sign', 'Lies den Vertrag genau, bevor du ihn unterschreibst.', 'Read the contract carefully before you sign it.'),
        x('einstellen', 'to hire', 'Die Firma stellt zwei neue Mitarbeiter ein.', 'The company is hiring two new employees.'),
        n('die', 'Fortbildung', 'Fortbildungen', 'further training', 'Sie macht eine Fortbildung, um bessere Chancen zu haben.', 'She is doing further training in order to have better chances.'),
        n('das', 'Ziel', 'Ziele', 'goal; aim', 'Mein Ziel ist es, eine feste Stelle zu finden.', 'My goal is to find a permanent job.'),
        x('versuchen', 'to try', 'Ich versuche, jeden Tag pünktlich zu sein.', 'I try to be on time every day.'),
        x('sich bemühen', 'to make an effort', 'Ich bemühe mich, keine Fehler zu machen.', 'I make an effort not to make any mistakes.'),
        x('selbstständig', 'independent; self-employed', 'Ich bin es gewohnt, selbstständig zu arbeiten.', 'I am used to working independently.'),
        x('damit', 'so that', 'Ich schreibe es auf, damit ich es nicht vergesse.', 'I am writing it down so that I don’t forget it.'),
      ],
      sentences: [
        s('Ich habe vor, mich um die Stelle zu bewerben.', 'I intend to apply for the position.'),
        s('Sie lernt Deutsch, um in Deutschland zu arbeiten.', 'She is learning German in order to work in Germany.', ['Um in Deutschland zu arbeiten, lernt sie Deutsch.']),
        s('Ich spreche langsam, damit Sie mich gut verstehen.', 'I speak slowly so that you understand me well.', ['Damit Sie mich gut verstehen, spreche ich langsam.']),
        s('Er ging nach Hause, ohne ein Wort zu sagen.', 'He went home without saying a word.', ['Ohne ein Wort zu sagen, ging er nach Hause.']),
        s('Statt zu arbeiten, liest er die Zeitung.', 'Instead of working, he reads the newspaper.', ['Er liest die Zeitung, statt zu arbeiten.']),
        s('Vergiss bitte nicht, den Lebenslauf mitzuschicken.', 'Please don’t forget to send the CV along.', ['Bitte vergiss nicht, den Lebenslauf mitzuschicken.']),
        s('Es ist wichtig, pünktlich zum Gespräch zu kommen.', 'It is important to come to the interview on time.', ['Es ist wichtig, zum Gespräch pünktlich zu kommen.']),
        s('Ich habe keine Lust, am Wochenende zu arbeiten.', 'I don’t feel like working at the weekend.'),
      ],
      cloze: [
        c('Ich habe vergessen, die Bewerbung ___.', 'abzuschicken', ['abschicken', 'zu abschicken', 'abgeschickt'], 'I forgot to send off the application.', 'With separable verbs, zu goes between prefix and verb: abzuschicken.'),
        c('Sie macht einen Kurs, ___ ihre Chancen zu verbessern.', 'um', ['damit', 'weil', 'dass'], 'She is taking a course in order to improve her chances.', 'Purpose with the same subject: um … zu + infinitive.'),
        c('Ich schicke Ihnen meinen Lebenslauf, ___ Sie mehr über mich erfahren.', 'damit', ['um', 'statt', 'ohne'], 'I am sending you my CV so that you can find out more about me.', 'Different subjects (ich / Sie) and a conjugated verb: damit.'),
        c('Er ist einfach gegangen, ___ sich zu verabschieden.', 'ohne', ['damit', 'dass', 'obwohl'], 'He simply left without saying goodbye.', 'ohne … zu + infinitive = without doing; the others need a conjugated verb.'),
        c('Für diese Stelle muss man gut Englisch ___.', 'sprechen', ['zu sprechen', 'gesprochen', 'spricht'], 'For this job you have to speak English well.', 'After a modal verb the infinitive stands without zu.'),
        c('Sie hat sich ___ eine Stelle als Verkäuferin beworben.', 'um', ['an', 'über', 'nach'], 'She has applied for a job as a sales assistant.', 'sich bewerben um + accusative.'),
        c('Der Vertrag ist fertig, Sie müssen ihn nur noch ___.', 'unterschreiben', ['bewerben', 'verdienen', 'einstellen'], 'The contract is ready; you only need to sign it.', 'einen Vertrag unterschreiben = to sign a contract.'),
        c('In der Anzeige steht, dass man drei Jahre ___ braucht.', 'Erfahrung', ['Erlebnis', 'Kenntnis', 'Bewerbung'], 'The advertisement says that you need three years of experience.', 'Erfahrung is experience you have gained; Erlebnis is a single event.'),
      ],
    },

    /* ------------------------------------------------------------------ 6 */
    {
      id: 'b1u6', title: 'Umwelt & Technik', sub: 'Environment · the passive',
      goal: 'Talk about the environment and describe how things are made or done when it does not matter who does them.',
      tips: [
        { h: 'Passive: werden + participle', html:
          `<p>The passive puts the <b>action</b> in the spotlight; who does it is unknown or unimportant. Build it with <b>werden</b> in position 2 and the participle at the end.</p>` +
          tbl(['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'], [
            ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
          ]) +
          `<p>{{Der Müll wird jeden Montag abgeholt.}} · {{Hier werden Autos gebaut.}}</p>
           <p class="note">The accusative object of the active sentence becomes the subject: {{Man trennt den Müll.}} → {{Der Müll wird getrennt.}}</p>` },
        { h: 'Past passive: wurde', html:
          `<p>For the past, only werden changes: <b>wurde</b> (singular) or <b>wurden</b> (plural) + participle.</p>
           <p>{{Das Haus wurde 1990 gebaut.}} · {{Die Fenster wurden letzte Woche geputzt.}}</p>
           <p>If you do want to name the doer, add <b>von</b> + dative: {{Das Haus wurde von meinem Großvater gebaut.}} · {{Der Brief wurde von der Chefin unterschrieben.}}</p>
           <p class="note">werden has three jobs: {{Er wird Arzt.}} (becomes) · {{Er wird kommen.}} (future: + infinitive) · {{Er wird gefragt.}} (passive: + participle).</p>` },
        { h: 'Passive with modal verbs', html:
          tbl(['1', '2 = modal', 'middle', 'end = participle + werden'], [
            ['Der Müll', '<b>muss</b>', '', '<b>getrennt werden</b>.'],
            ['Hier', '<b>darf</b>', 'nicht', '<b>geraucht werden</b>.'],
            ['Das Problem', '<b>kann</b>', 'schnell', '<b>gelöst werden</b>.'],
          ]) +
          `<p>The modal verb is conjugated; <b>werden</b> stays in the infinitive at the very end. For the past, change only the modal: {{Die Rechnung musste sofort bezahlt werden.}}</p>
           <p class="note">Signs and instructions love this form: {{Die Tür muss geschlossen werden.}}</p>` },
        { h: 'telc: giving your opinion on the environment', html:
          `<p>Say what you think, give a reason and name both sides — in a discussion or in a letter.</p>
           <ul class="phrases">
             <li>{{Meiner Meinung nach sollte weniger Plastik verwendet werden.}} <span>In my opinion less plastic should be used.</span></li>
             <li>{{Ich finde es wichtig, Energie zu sparen.}} <span>I think it is important to save energy.</span></li>
             <li>{{Jeder kann etwas für die Umwelt tun.}} <span>Everyone can do something for the environment.</span></li>
             <li>{{Man sollte öfter mit dem Fahrrad fahren.}} <span>People should cycle more often.</span></li>
             <li>{{Ich bin dafür, dass mehr Radwege gebaut werden.}} <span>I am in favour of more cycle paths being built.</span></li>
             <li>{{Ich bin dagegen, dass so viel weggeworfen wird.}} <span>I am against so much being thrown away.</span></li>
             <li>{{Einerseits ist das Auto praktisch, andererseits schadet es der Umwelt.}} <span>On the one hand the car is practical, on the other hand it harms the environment.</span></li>
             <li>{{Das ist ein Problem, das gelöst werden muss.}} <span>That is a problem that has to be solved.</span></li>
           </ul>` },
      ],
      words: [
        n('die', 'Umwelt', '', 'environment', 'Die Umwelt muss besser geschützt werden.', 'The environment must be protected better.'),
        x('schützen', 'to protect', 'Diese Tiere müssen geschützt werden.', 'These animals must be protected.'),
        n('der', 'Klimawandel', '', 'climate change', 'Über den Klimawandel wird viel diskutiert.', 'Climate change is discussed a lot.'),
        n('der', 'Müll', '', 'rubbish; waste', 'In unserer Straße wird der Müll am Dienstag abgeholt.', 'In our street the rubbish is collected on Tuesdays.'),
        x('trennen', 'to separate; to sort', 'In Deutschland wird der Müll getrennt.', 'In Germany rubbish is sorted.'),
        x('recyceln', 'to recycle', 'Altes Papier wird recycelt.', 'Old paper is recycled.'),
        x('wegwerfen', 'to throw away', 'Es werden zu viele Lebensmittel weggeworfen.', 'Too much food is thrown away.'),
        n('die', 'Verpackung', 'Verpackungen', 'packaging', 'Viele Verpackungen können recycelt werden.', 'A lot of packaging can be recycled.'),
        n('das', 'Plastik', '', 'plastic', 'Es sollte weniger Plastik verwendet werden.', 'Less plastic should be used.'),
        x('umweltfreundlich', 'environmentally friendly', 'Wir brauchen umweltfreundliche Verpackungen.', 'We need environmentally friendly packaging.'),
        x('verschmutzen', 'to pollute', 'In großen Städten ist die Luft oft verschmutzt.', 'In big cities the air is often polluted.'),
        n('die', 'Energie', 'Energien', 'energy', 'In diesem Haus wird wenig Energie verbraucht.', 'Little energy is used in this house.'),
        n('der', 'Strom', '', 'electricity', 'Der Strom wurde für zwei Stunden abgestellt.', 'The electricity was cut off for two hours.'),
        x('verbrauchen', 'to consume; to use up', 'Dieses Auto verbraucht sehr wenig Benzin.', 'This car uses very little petrol.'),
        x('verwenden', 'to use', 'Für das Haus wurde viel Holz verwendet.', 'A lot of wood was used for the house.'),
        n('die', 'Fabrik', 'Fabriken', 'factory', 'Die alte Fabrik wurde letztes Jahr geschlossen.', 'The old factory was closed last year.'),
        x('herstellen', 'to manufacture; to produce', 'Diese Maschinen werden in Deutschland hergestellt.', 'These machines are manufactured in Germany.'),
        n('das', 'Gerät', 'Geräte', 'device; appliance', 'Das Gerät muss repariert werden.', 'The device has to be repaired.'),
        x('entwickeln', 'to develop', 'Das Programm wurde von zwei Studenten entwickelt.', 'The program was developed by two students.'),
        x('erfinden', 'to invent', 'Wann wurde das Telefon erfunden?', 'When was the telephone invented?'),
      ],
      sentences: [
        s('Der Müll wird jeden Montag abgeholt.', 'The rubbish is collected every Monday.', ['Jeden Montag wird der Müll abgeholt.']),
        s('Das Haus wurde vor hundert Jahren gebaut.', 'The house was built a hundred years ago.', ['Vor hundert Jahren wurde das Haus gebaut.']),
        s('Papier und Glas müssen getrennt werden.', 'Paper and glass must be separated.', ['Glas und Papier müssen getrennt werden.']),
        s('Hier darf nicht geraucht werden.', 'Smoking is not allowed here.'),
        s('Das Gerät wurde von einer Studentin entwickelt.', 'The device was developed by a student.'),
        s('In dieser Fabrik werden Fahrräder hergestellt.', 'Bicycles are made in this factory.', ['Fahrräder werden in dieser Fabrik hergestellt.']),
        s('Das Problem kann nicht sofort gelöst werden.', 'The problem cannot be solved immediately.'),
        s('Wann wurde das Fahrrad eigentlich erfunden?', 'When was the bicycle actually invented?'),
      ],
      cloze: [
        c('In Deutschland ___ der Müll in verschiedene Tonnen getrennt.', 'wird', ['werden', 'worden', 'hat'], 'In Germany rubbish is sorted into different bins.', 'Passive present: wird + participle; der Müll is singular.'),
        c('Diese Brücke ___ vor zweihundert Jahren gebaut.', 'wurde', ['wird', 'wurden', 'hat'], 'This bridge was built two hundred years ago.', 'Passive Präteritum with a singular subject: wurde + participle.'),
        c('Die Rechnung muss bis Freitag bezahlt ___.', 'werden', ['worden', 'wird', 'wurde'], 'The bill must be paid by Friday.', 'Passive with a modal verb: participle + werden (infinitive) at the end.'),
        c('Der Roman wurde ___ einer jungen Autorin geschrieben.', 'von', ['aus', 'für', 'durch'], 'The novel was written by a young author.', 'The person who does the action is added with von + dative.'),
        c('Hier werden jeden Tag tausend Autos ___.', 'hergestellt', ['herstellt', 'herzustellen', 'herstellten'], 'A thousand cars are made here every day.', 'The passive needs the Partizip II: herstellen → hergestellt.'),
        c('Früher ___ viel mehr Briefe geschrieben als heute.', 'wurden', ['wurde', 'werden', 'worden'], 'In the past far more letters were written than today.', 'Briefe is plural and the time is past: wurden.'),
        c('Alte Flaschen sollte man nicht ___, sondern zurückbringen.', 'wegwerfen', ['verbrauchen', 'herstellen', 'entwickeln'], 'You shouldn’t throw old bottles away but take them back.', 'wegwerfen = to throw away.'),
        c('Wir müssen mehr tun, um die Umwelt zu ___.', 'schützen', ['trennen', 'verbrauchen', 'erfinden'], 'We must do more to protect the environment.', 'die Umwelt schützen = to protect the environment.'),
      ],
    },
  ]);

  root.DE_DATA.addSheets('b1', [
    { title: 'Präteritum: regular and strong verbs', html:
      `<p><b>Regular:</b> stem + <b>-te</b>, -test, -te, -ten, -tet, -ten → {{ich machte}}, {{du machtest}}, {{wir machten}}. Stems in -t or -d add an e: {{ich arbeitete}}.</p>
       <p><b>Strong:</b> new vowel, no ending for ich and er/sie/es → {{ich ging}}, {{du gingst}}, {{er ging}}, {{wir gingen}}, {{ihr gingt}}, {{sie gingen}}.</p>` +
      tbl(['Infinitive', 'Präteritum', 'Partizip II', 'English'], [
        ['sein', '{{war}}', 'ist gewesen', 'to be'],
        ['haben', '{{hatte}}', 'gehabt', 'to have'],
        ['werden', '{{wurde}}', 'ist geworden', 'to become'],
        ['gehen', '{{ging}}', 'ist gegangen', 'to go'],
        ['kommen', '{{kam}}', 'ist gekommen', 'to come'],
        ['fahren', '{{fuhr}}', 'ist gefahren', 'to drive; to go'],
        ['bleiben', '{{blieb}}', 'ist geblieben', 'to stay'],
        ['laufen', '{{lief}}', 'ist gelaufen', 'to run; to walk'],
        ['sehen', '{{sah}}', 'gesehen', 'to see'],
        ['geben', '{{gab}}', 'gegeben', 'to give'],
        ['nehmen', '{{nahm}}', 'genommen', 'to take'],
        ['finden', '{{fand}}', 'gefunden', 'to find'],
        ['sprechen', '{{sprach}}', 'gesprochen', 'to speak'],
        ['essen', '{{aß}}', 'gegessen', 'to eat'],
        ['trinken', '{{trank}}', 'getrunken', 'to drink'],
        ['lesen', '{{las}}', 'gelesen', 'to read'],
        ['schreiben', '{{schrieb}}', 'geschrieben', 'to write'],
        ['stehen', '{{stand}}', 'gestanden', 'to stand'],
        ['helfen', '{{half}}', 'geholfen', 'to help'],
        ['treffen', '{{traf}}', 'getroffen', 'to meet'],
        ['beginnen', '{{begann}}', 'begonnen', 'to begin'],
        ['rufen', '{{rief}}', 'gerufen', 'to call'],
        ['wissen', '{{wusste}}', 'gewusst', 'to know (a fact)'],
        ['kennen', '{{kannte}}', 'gekannt', 'to know (a person)'],
        ['bringen', '{{brachte}}', 'gebracht', 'to bring'],
        ['denken', '{{dachte}}', 'gedacht', 'to think'],
      ]) +
      `<p class="note"><b>ist</b> marks the verbs that build their Perfekt with sein. The last four are “mixed”: vowel change plus -te. In conversation use the Perfekt for most verbs, but keep {{war}}, {{hatte}}, {{konnte}}, {{musste}}, {{wollte}} and {{es gab}} in the Präteritum.</p>` },

    { title: 'Plusquamperfekt and time connectors', html:
      `<p><b>Plusquamperfekt</b> = <b>hatte</b> / <b>war</b> + Partizip II. It is the past before the past: {{Ich hatte schon gegessen.}} · {{Sie war schon gegangen.}}</p>` +
      tbl(['Connector', 'Meaning', 'Example'], [
        ['<b>als</b>', 'when: one event or period in the past', '{{Als ich ankam, war der Zug schon abgefahren.}}'],
        ['<b>nachdem</b>', 'after: its clause is one tense further back', '{{Nachdem wir gegessen hatten, gingen wir spazieren.}}'],
        ['<b>bevor</b>', 'before', '{{Bevor ich ins Bett gehe, lese ich noch.}}'],
        ['<b>während</b>', 'while: at the same time', '{{Während er kochte, deckte ich den Tisch.}}'],
        ['<b>seit / seitdem</b>', 'since: began in the past, still true (present tense)', '{{Seitdem ich hier wohne, fahre ich Fahrrad.}}'],
        ['<b>bis</b>', 'until', '{{Ich warte, bis du fertig bist.}}'],
      ]) +
      tbl(['nachdem-clause', 'Main clause', 'Example'], [
        ['Plusquamperfekt', 'Präteritum or Perfekt', '{{Nachdem er angekommen war, rief er mich an.}}'],
        ['Perfekt', 'present', '{{Nachdem ich gegessen habe, gehe ich spazieren.}}'],
      ]) +
      `<p class="note">All of these send the verb to the end of their clause. With a noun instead of a clause: {{nach dem Essen}} · {{vor der Arbeit}} · {{während des Studiums}} · {{seit einem Jahr}}. And remember: <b>als</b> for one time in the past, <b>wenn</b> for every time and for the present or future.</p>` },

    { title: 'Relative pronouns', html:
      tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['<b>Nominative</b>', g('der'), g('die'), g('das'), 'die'],
        ['<b>Accusative</b>', g('der', 'den'), g('die'), g('das'), 'die'],
        ['<b>Dative</b>', g('der', 'dem'), g('die', 'der'), g('das', 'dem'), '<b>denen</b>'],
        ['<b>Genitive</b>', g('der', 'dessen'), g('die', 'deren'), g('das', 'dessen'), '<b>deren</b>'],
      ]) +
      `<p><b>Nom.</b> {{Das ist der Mann, der hier wohnt.}}<br>
          <b>Acc.</b> {{Das ist der Mann, den ich kenne.}}<br>
          <b>Dat.</b> {{Das ist der Mann, dem ich geholfen habe.}}<br>
          <b>Gen.</b> {{Das ist der Mann, dessen Auto vor der Tür steht.}}<br>
          <b>Prep.</b> {{Das ist die Kollegin, mit der ich zusammenarbeite.}} · {{Das sind die Freunde, auf die ich mich verlassen kann.}}</p>
       <p class="note">Gender and number come from the noun; the case comes from the pronoun’s role in the relative clause. The verb goes to the end, and a clause in the middle of a sentence has a comma on both sides: {{Der Film, den wir gesehen haben, war gut.}}</p>` },

    { title: 'Konjunktiv II at a glance', html:
      tbl(['', 'sein', 'haben', 'werden', 'können', 'sollen'], [
        ['ich', 'wäre', 'hätte', 'würde', 'könnte', 'sollte'],
        ['du', 'wärst', 'hättest', 'würdest', 'könntest', 'solltest'],
        ['er / sie / es', 'wäre', 'hätte', 'würde', 'könnte', 'sollte'],
        ['wir', 'wären', 'hätten', 'würden', 'könnten', 'sollten'],
        ['ihr', 'wärt', 'hättet', 'würdet', 'könntet', 'solltet'],
        ['sie / Sie', 'wären', 'hätten', 'würden', 'könnten', 'sollten'],
      ]) +
      tbl(['Use', 'Example'], [
        ['Unreal condition', '{{Wenn ich Zeit hätte, würde ich dich besuchen.}}'],
        ['Wish', '{{Wenn ich doch mehr Zeit hätte!}} · {{Ich wünschte, ich könnte bleiben.}}'],
        ['Advice', '{{An deiner Stelle würde ich warten.}} · {{Du solltest zum Arzt gehen.}}'],
        ['Suggestion', '{{Wir könnten ins Kino gehen.}}'],
        ['Polite request', '{{Könnten Sie mir bitte helfen?}} · {{Ich hätte gern einen Termin.}}'],
      ]) +
      `<p class="note">All other verbs: <b>würde</b> + infinitive at the end. More one-word forms: müssen → müsste · dürfen → dürfte · wollen → wollte · wissen → wüsste.</p>` },

    { title: 'The passive at a glance', html:
      tbl(['Form', 'Pattern', 'Example'], [
        ['Present', 'wird + Partizip II', '{{Das Auto wird repariert.}}'],
        ['Präteritum', 'wurde + Partizip II', '{{Das Auto wurde repariert.}}'],
        ['Perfekt', 'ist + Partizip II + worden', '{{Das Auto ist repariert worden.}}'],
        ['With a modal verb', 'modal + Partizip II + werden', '{{Das Auto muss repariert werden.}}'],
        ['Modal verb, past', 'modal in the Präteritum + Partizip II + werden', '{{Das Auto musste repariert werden.}}'],
      ]) +
      tbl(['', 'ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'], [
        ['<b>Present</b>', 'werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
        ['<b>Präteritum</b>', 'wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden'],
      ]) +
      `<p class="note">Name the doer with <b>von</b> + dative: {{Das Auto wurde von einem Mechaniker repariert.}} If the doer is simply “people”, an active sentence with <b>man</b> says the same: {{Man repariert das Auto.}} In a subordinate clause the conjugated verb goes last: {{Ich weiß, dass das Auto repariert wird.}}</p>` },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
