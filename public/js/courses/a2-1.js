/* Course A2, units 1–6. Built towards telc Deutsch A2. */
(function (root) {
  'use strict';
  const { n, x, s, c, g, tbl } = root.DE_BUILD;

  const GENDER_HEAD = ['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'];

  root.DE_DATA.addUnits('a2', [
    /* --------------------------------------------------------------- a2u1 */
    {
      id: 'a2u1', title: 'Mein Alltag', sub: 'Daily routine · the Perfekt',
      goal: 'Describe your day and tell what happened yesterday, choosing haben or sein without hesitating.',
      tips: [
        { h: 'haben or sein? The full picture', html:
          `<p>Most verbs build the Perfekt with <b>haben</b>. <b>sein</b> is for verbs that have no direct object and describe:</p>` +
          tbl(['sein with…', 'Examples'], [
            ['movement from A to B', '{{Ich bin nach Hause gegangen.}} {{Wir sind nach Köln gefahren.}}'],
            ['a change of state', '{{Ich bin aufgewacht.}} {{Das Kind ist eingeschlafen.}}'],
            ['sein, bleiben, passieren', '{{Ich bin zu Hause geblieben.}} {{Was ist passiert?}}'],
          ]) +
          `<p class="note">{{schlafen}} is a state, not a change: {{Ich habe gut geschlafen.}} But {{einschlafen}} takes you from awake to asleep: {{Ich bin eingeschlafen.}}</p>` },
        { h: 'Where does ge- go?', html:
          tbl(['Verb type', 'Participle', 'Examples'], [
            ['separable (auf-, ein-, an-, ab-, zurück- …)', 'prefix + <b>ge</b> + rest', '{{aufgestanden}} {{eingekauft}} {{abgeholt}}'],
            ['inseparable (be-, ge-, er-, ver-, ent-, zer-)', 'no ge-', '{{besucht}} {{vergessen}} {{erzählt}}'],
            ['ending in -ieren', 'no ge-, always -t', '{{telefoniert}} {{studiert}} {{passiert}}'],
          ]) +
          `<p>{{Ich habe meine Schwester abgeholt.}} · {{Wir haben meine Eltern besucht.}} · {{Ich habe mit meiner Chefin telefoniert.}}</p>
           <p class="note">Test: is the prefix stressed? <b>AUF</b>stehen → separable, ge goes in the middle. be<b>SU</b>chen → inseparable, no ge.</p>` },
        { h: 'Time words for the past', html:
          `<p>{{gestern}} yesterday · {{vorgestern}} the day before yesterday · {{gestern Abend}} last night · {{heute Morgen}} this morning · {{vor zwei Tagen}} two days ago</p>
           <p><b>last …</b> needs no preposition. It is accusative, so the ending follows the gender: {{letzten Montag}} (${g('der')}) · {{letzte Woche}} (${g('die')}) · {{letztes Jahr}} (${g('das')}).</p>
           <p><b>schon</b> = already, <b>noch nicht</b> = not yet: {{Hast du schon gegessen?}} — {{Nein, noch nicht.}} · {{Ich habe noch nicht geduscht.}}</p>` },
        { h: 'telc: talking about your day', html:
          `<p>Put events in order with {{zuerst}} (first), {{dann}} (then), {{danach}} (after that), {{später}} (later) and {{zum Schluss}} (finally). Each one fills position 1, so the verb comes straight after it:</p>
           <p>{{Zuerst habe ich gefrühstückt. Dann bin ich zur Arbeit gefahren. Danach habe ich eingekauft.}}</p>
           <p>Your routine, in the present: {{Normalerweise stehe ich um sieben Uhr auf.}} · {{Nach der Arbeit gehe ich einkaufen.}} · {{Am Abend sehe ich fern.}}</p>
           <p>Keep the conversation going by asking back: {{Was hast du am Wochenende gemacht?}} · {{Und du? Wann stehst du auf?}} · {{Was machst du nach der Arbeit?}}</p>` },
      ],
      words: [
        n('der', 'Alltag', '', 'everyday life', 'Mein Alltag ist oft stressig.', 'My everyday life is often stressful.'),
        x('aufwachen', 'to wake up', 'Ich bin heute früh aufgewacht.', 'I woke up early today.'),
        x('frühstücken', 'to have breakfast', 'Wir haben zusammen gefrühstückt.', 'We had breakfast together.'),
        x('duschen', 'to take a shower', 'Ich habe schon geduscht.', 'I have already had a shower.'),
        x('aufräumen', 'to tidy up', 'Hast du dein Zimmer aufgeräumt?', 'Have you tidied your room?'),
        x('putzen', 'to clean', 'Am Samstag habe ich das Bad geputzt.', 'On Saturday I cleaned the bathroom.'),
        x('abholen', 'to pick up', 'Ich habe meine Tochter von der Schule abgeholt.', 'I picked my daughter up from school.'),
        x('besuchen', 'to visit', 'Wir haben meine Eltern besucht.', 'We visited my parents.'),
        x('vergessen', 'to forget', 'Ich habe meinen Schlüssel vergessen.', 'I forgot my key.'),
        x('treffen', 'to meet', 'Ich habe gestern eine Freundin getroffen.', 'I met a friend yesterday.'),
        x('passieren', 'to happen', 'Was ist passiert?', 'What happened?'),
        x('einschlafen', 'to fall asleep', 'Das Kind ist sofort eingeschlafen.', 'The child fell asleep immediately.'),
        x('zurückkommen', 'to come back', 'Ich bin erst um acht Uhr zurückgekommen.', 'I did not come back until eight o’clock.'),
        n('der', 'Haushalt', 'Haushalte', 'household; housework', 'Am Samstag habe ich den Haushalt gemacht.', 'On Saturday I did the housework.'),
        n('die', 'Pause', 'Pausen', 'break', 'Wir haben eine Pause gemacht.', 'We took a break.'),
        n('das', 'Mittagessen', 'Mittagessen', 'lunch', 'Nach dem Mittagessen bin ich nach Hause gegangen.', 'After lunch I went home.'),
        n('der', 'Feierabend', 'Feierabende', 'end of the workday', 'Um fünf Uhr habe ich Feierabend.', 'I finish work at five o’clock.'),
        x('letzte Woche', 'last week', 'Letzte Woche sind wir ins Kino gegangen.', 'Last week we went to the cinema.'),
        x('noch nicht', 'not yet', 'Ich habe noch nicht gegessen.', 'I haven’t eaten yet.'),
        x('danach', 'after that', 'Danach habe ich eingekauft.', 'After that I went shopping.'),
      ],
      sentences: [
        s('Ich bin um sechs Uhr aufgewacht.', 'I woke up at six o’clock.', ['Um sechs Uhr bin ich aufgewacht.']),
        s('Gestern habe ich die Wohnung aufgeräumt.', 'Yesterday I tidied the apartment.', ['Ich habe gestern die Wohnung aufgeräumt.']),
        s('Hast du schon gefrühstückt?', 'Have you had breakfast yet?'),
        s('Ich habe meine Schwester vom Bahnhof abgeholt.', 'I picked my sister up from the station.'),
        s('Wir sind letzte Woche nach Hamburg gefahren.', 'We went to Hamburg last week.', ['Letzte Woche sind wir nach Hamburg gefahren.']),
        s('Er hat den Termin leider vergessen.', 'Unfortunately he forgot the appointment.', ['Leider hat er den Termin vergessen.', 'Den Termin hat er leider vergessen.']),
        s('Wir haben den Film noch nicht gesehen.', 'We haven’t seen the film yet.', ['Den Film haben wir noch nicht gesehen.']),
        s('Was ist gestern Abend passiert?', 'What happened last night?'),
      ],
      cloze: [
        c('Ich ___ gestern um sieben Uhr aufgestanden.', 'bin', ['habe', 'bist', 'hat'], 'I got up at seven o’clock yesterday.', 'aufstehen is a change of position, so the Perfekt uses sein: ich bin.'),
        c('Wir ___ am Wochenende meine Großeltern besucht.', 'haben', ['sind', 'hat', 'seid'], 'We visited my grandparents at the weekend.', 'besuchen has a direct object, so the Perfekt uses haben.'),
        c('Hast du die Küche schon ___?', 'aufgeräumt', ['geaufräumt', 'aufräumt', 'aufgeräumen'], 'Have you already tidied the kitchen?', 'Separable verbs put ge between prefix and stem: auf-ge-räumt.'),
        c('Ich habe meinen Termin ___.', 'vergessen', ['gevergessen', 'vergesst', 'vergegessen'], 'I forgot my appointment.', 'Verbs starting with ver- never take ge-: the participle is vergessen.'),
        c('Der Zug ist pünktlich in Berlin ___.', 'angekommen', ['ankommen', 'angekommt', 'geankommen'], 'The train arrived in Berlin on time.', 'ankommen is separable and irregular: an-ge-kommen.'),
        c('Hast du schon gegessen? — Nein, ___ nicht.', 'noch', ['schon', 'nie', 'kein'], 'Have you eaten yet? — No, not yet.', 'The negative answer to schon is noch nicht.'),
        c('___ Woche habe ich viel gearbeitet.', 'Letzte', ['Letzten', 'Letzter', 'Letztes'], 'Last week I worked a lot.', 'Time expressions without a preposition are accusative: die Woche → letzte Woche.'),
        c('Was ___ gestern passiert?', 'ist', ['hat', 'sind', 'haben'], 'What happened yesterday?', 'passieren always forms the Perfekt with sein.'),
      ],
    },

    /* --------------------------------------------------------------- a2u2 */
    {
      id: 'a2u2', title: 'Früher', sub: 'Childhood · the simple past',
      goal: 'Talk about your childhood and how life used to be, using war, hatte and the past of the modal verbs.',
      tips: [
        { h: 'war and hatte', html:
          `<p>For <b>sein</b> and <b>haben</b>, Germans usually prefer these short past forms (the Präteritum) to the Perfekt, even when speaking:</p>` +
          tbl(['', 'sein', 'haben'], [
            ['ich', '{{ich war}}', '{{ich hatte}}'],
            ['du', '{{du warst}}', '{{du hattest}}'],
            ['er / sie / es', '{{er war}}', '{{er hatte}}'],
            ['wir', '{{wir waren}}', '{{wir hatten}}'],
            ['ihr', '{{ihr wart}}', '{{ihr hattet}}'],
            ['sie / Sie', '{{sie waren}}', '{{sie hatten}}'],
          ]) +
          `<p class="note">As with the modal verbs in the present, <b>ich</b> and <b>er/sie/es</b> share one form.</p>` },
        { h: 'Modal verbs in the past', html:
          `<p>Take the infinitive, drop the umlaut if there is one, and swap <b>-en</b> for <b>-te</b> plus the ending:</p>` +
          tbl(['', 'können', 'müssen', 'dürfen', 'wollen', 'sollen'], [
            ['ich / er', '{{konnte}}', '{{musste}}', '{{durfte}}', '{{wollte}}', '{{sollte}}'],
            ['du', '{{konntest}}', '{{musstest}}', '{{durftest}}', '{{wolltest}}', '{{solltest}}'],
            ['wir / sie', '{{konnten}}', '{{mussten}}', '{{durften}}', '{{wollten}}', '{{sollten}}'],
            ['ihr', '{{konntet}}', '{{musstet}}', '{{durftet}}', '{{wolltet}}', '{{solltet}}'],
          ]) +
          `<p>The verb sandwich stays the same: {{Ich musste gestern lange arbeiten.}} · {{Wir konnten leider nicht kommen.}}</p>
           <p class="note"><b>möchten</b> has no past of its own. Use <b>wollte</b>: {{Ich möchte ein Eis.}} → {{Ich wollte ein Eis.}}</p>` },
        { h: 'früher, damals, als Kind', html:
          `<p>English “used to” has no special form in German. Use a past form plus <b>früher</b> (in the past) or <b>damals</b> (back then): {{Früher hatten wir kein Auto.}} · {{Damals war ich noch Schüler.}}</p>
           <p>{{als Kind}} = as a child · {{mit zehn Jahren}} = at the age of ten: {{Als Kind durfte ich nicht lange fernsehen.}} · {{Mit zehn Jahren konnte ich schon gut schwimmen.}}</p>
           <p class="note">Mix the tenses when you tell a story: Perfekt for ordinary verbs, the short past for sein, haben and the modals. {{Als Kind habe ich viel draußen gespielt, aber ich durfte nicht fernsehen.}}</p>` },
        { h: 'telc: talking about your childhood', html:
          `<p>Where you come from: {{Ich bin in Indien geboren.}} · {{Ich bin in einer kleinen Stadt aufgewachsen.}} · {{Seit zwei Jahren wohne ich in Deutschland.}}</p>
           <p>Then and now: {{Als Kind wollte ich Ärztin werden.}} · {{Früher hatte ich viel Zeit, heute habe ich wenig Zeit.}} · {{In der Schule war ich gut in Mathematik.}}</p>
           <p>Keep the conversation going: {{Wo bist du aufgewachsen?}} · {{Was wolltest du als Kind werden?}} · {{Wie war deine Schule?}}</p>` },
      ],
      words: [
        n('die', 'Kindheit', '', 'childhood', 'Ich hatte eine schöne Kindheit.', 'I had a happy childhood.'),
        x('früher', 'in the past', 'Früher hatten wir kein Auto.', 'We used to have no car.'),
        x('damals', 'back then', 'Damals war ich noch sehr klein.', 'Back then I was still very small.'),
        x('als Kind', 'as a child', 'Als Kind wollte ich Ärztin werden.', 'As a child I wanted to become a doctor.'),
        x('geboren', 'born', 'Ich bin in Indien geboren.', 'I was born in India.'),
        x('aufwachsen', 'to grow up', 'Wo bist du aufgewachsen?', 'Where did you grow up?'),
        x('die Eltern', 'parents (always plural)', 'Meine Eltern waren sehr streng.', 'My parents were very strict.'),
        n('die', 'Großmutter', 'Großmütter', 'grandmother', 'Meine Großmutter konnte sehr gut kochen.', 'My grandmother could cook very well.'),
        n('der', 'Großvater', 'Großväter', 'grandfather', 'Mein Großvater hatte einen Hund.', 'My grandfather had a dog.'),
        n('der', 'Schüler', 'Schüler', 'pupil; school student', 'Ich war kein guter Schüler.', 'I was not a good pupil.'),
        n('die', 'Klasse', 'Klassen', 'class (at school)', 'In meiner Klasse waren dreißig Kinder.', 'There were thirty children in my class.'),
        n('die', 'Hausaufgabe', 'Hausaufgaben', 'homework', 'Ich musste jeden Tag Hausaufgaben machen.', 'I had to do homework every day.'),
        n('das', 'Spielzeug', 'Spielzeuge', 'toy', 'Wir hatten nicht viel Spielzeug.', 'We didn’t have many toys.'),
        n('der', 'Fernseher', 'Fernseher', 'television set', 'Wir hatten nur einen Fernseher.', 'We had only one television.'),
        n('das', 'Handy', 'Handys', 'mobile phone', 'Mit zwölf durfte ich noch kein Handy haben.', 'At twelve I wasn’t allowed to have a mobile phone yet.'),
        x('streng', 'strict', 'Unser Lehrer war streng, aber nett.', 'Our teacher was strict but nice.'),
        x('lustig', 'funny', 'Der Film war sehr lustig.', 'The film was very funny.'),
        x('langweilig', 'boring', 'Die Schule war manchmal langweilig.', 'School was sometimes boring.'),
        n('der', 'Kindergarten', 'Kindergärten', 'kindergarten', 'Mit vier Jahren war ich im Kindergarten.', 'At the age of four I was in kindergarten.'),
        x('draußen', 'outside', 'Wir durften lange draußen spielen.', 'We were allowed to play outside for a long time.'),
      ],
      sentences: [
        s('Als Kind wollte ich Ärztin werden.', 'As a child I wanted to become a doctor.', ['Ich wollte als Kind Ärztin werden.']),
        s('Früher hatten wir kein Auto.', 'We used to have no car.', ['Wir hatten früher kein Auto.']),
        s('Ich musste jeden Tag Hausaufgaben machen.', 'I had to do homework every day.', ['Jeden Tag musste ich Hausaufgaben machen.']),
        s('Meine Großmutter konnte sehr gut kochen.', 'My grandmother could cook very well.'),
        s('Wir durften abends nicht fernsehen.', 'We were not allowed to watch TV in the evening.', ['Abends durften wir nicht fernsehen.']),
        s('Wo warst du gestern Abend?', 'Where were you last night?'),
        s('Ich war krank und konnte nicht kommen.', 'I was ill and couldn’t come.'),
        s('Meine Eltern waren damals sehr streng.', 'My parents were very strict back then.', ['Damals waren meine Eltern sehr streng.']),
      ],
      cloze: [
        c('Als Kind ___ ich einen Hund.', 'hatte', ['war', 'hattest', 'hatten'], 'As a child I had a dog.', 'Präteritum of haben for ich: hatte.'),
        c('Wo ___ du gestern? Ich habe dich angerufen.', 'warst', ['war', 'wart', 'hattest'], 'Where were you yesterday? I called you.', 'Präteritum of sein for du: warst.'),
        c('Früher ___ ich nicht schwimmen, aber heute kann ich es.', 'konnte', ['könnte', 'konnten', 'gekonnt'], 'I used to be unable to swim, but today I can.', 'Modal verbs lose the umlaut in the Präteritum: können → ich konnte.'),
        c('Wir ___ gestern lange arbeiten.', 'mussten', ['müssten', 'musste', 'gemusst'], 'We had to work late yesterday.', 'müssen → musste, without umlaut; with wir the form is mussten.'),
        c('Als Kind ___ ich abends nicht fernsehen.', 'durfte', ['darfst', 'durften', 'gedurft'], 'As a child I wasn’t allowed to watch TV in the evening.', 'dürfen → ich durfte: no umlaut, and no extra ending for ich.'),
        c('Als Kind ___ meine Schwester Sängerin werden.', 'wollte', ['wollten', 'willst', 'gewollt'], 'As a child my sister wanted to become a singer.', 'Präteritum of wollen for er / sie / es: wollte, the same form as for ich.'),
        c('Du ___ mich doch gestern anrufen! Was war los?', 'solltest', ['sollst', 'solltet', 'gesollt'], 'You were supposed to call me yesterday! What happened?', 'gestern needs the past: du solltest.'),
        c('___ ihr gestern auch im Kino?', 'Wart', ['Warst', 'Waren', 'Hattet'], 'Were you at the cinema yesterday too?', 'Präteritum of sein for ihr: wart.'),
      ],
    },

    /* --------------------------------------------------------------- a2u3 */
    {
      id: 'a2u3', title: 'Wohnen & Umziehen', sub: 'Home and moving · two-way prepositions',
      goal: 'Describe your home, say where things are and where to put them, and talk about moving.',
      tips: [
        { h: 'Nine prepositions, two cases', html:
          `<p>{{in}} · {{an}} · {{auf}} · {{über}} · {{unter}} · {{vor}} · {{hinter}} · {{neben}} · {{zwischen}} — the case depends on the question you are answering:</p>` +
          tbl(GENDER_HEAD, [
            ['<b>wohin?</b> movement to a place → accusative', g('der', 'den'), g('die'), g('das'), 'die'],
            ['<b>wo?</b> location → dative', g('der', 'dem'), g('die', 'der'), g('das', 'dem'), 'den (+n)'],
          ]) +
          `<p>{{Ich gehe in die Küche.}} (wohin?) · {{Ich bin in der Küche.}} (wo?)</p>
           <p class="note">Short forms: in + das = {{ins}} · in + dem = {{im}} · an + das = {{ans}} · an + dem = {{am}}</p>` },
        { h: 'Putting it there, being there', html:
          tbl(['Action: wohin? + accusative', 'Result: wo? + dative'], [
            ['<b>stellen</b> (put upright)<br>{{Ich stelle die Lampe auf den Tisch.}}', '<b>stehen</b> (stand)<br>{{Die Lampe steht auf dem Tisch.}}'],
            ['<b>legen</b> (lay flat)<br>{{Ich lege das Buch auf das Bett.}}', '<b>liegen</b> (lie)<br>{{Das Buch liegt auf dem Bett.}}'],
            ['<b>hängen</b> (hang up)<br>{{Ich hänge das Bild an die Wand.}}', '<b>hängen</b> (be hanging)<br>{{Das Bild hängt an der Wand.}}'],
          ]) +
          `<p class="note">English says “put” and “is” for everything. German wants the position: upright things (bottles, lamps, furniture) <b>stehen</b>, flat things (papers, keys, rugs) <b>liegen</b>.</p>` },
        { h: 'in, an or auf?', html:
          `<p><b>in</b> = inside: {{im Schrank}}, {{in der Küche}}. <b>auf</b> = on top of a flat surface: {{auf dem Tisch}}, {{auf dem Boden}}. <b>an</b> = on a vertical surface or right at something: {{an der Wand}}, {{am Fenster}}.</p>
           <p>After moving day you need the Perfekt. It is still wohin?, so still accusative: {{Ich habe das Regal neben die Tür gestellt.}} · {{Wir haben den Teppich ins Wohnzimmer gelegt.}}</p>
           <p class="note">Dative plural: the article is <b>den</b> and the noun adds <b>-n</b>: {{zwischen den Fenstern}}.</p>` },
        { h: 'telc: describing your home', html:
          `<p>Describe it: {{Ich wohne in einer Dreizimmerwohnung im zweiten Stock.}} (on the second floor) · {{Die Wohnung ist siebzig Quadratmeter groß.}} · {{Wir haben einen Balkon, aber keinen Garten.}}</p>
           <p>Ask about a flat: {{Ist die Wohnung noch frei?}} · {{Wie hoch ist die Miete?}} · {{Wie hoch sind die Nebenkosten?}} (extra costs such as heating and water) · {{Wann kann ich die Wohnung besichtigen?}} (view) · {{Ab wann kann ich einziehen?}} (move in)</p>
           <p>Moving: {{Ich bin letzten Monat umgezogen.}} · {{Kannst du mir beim Umzug helfen?}}</p>` },
      ],
      words: [
        n('die', 'Küche', 'Küchen', 'kitchen', 'Ich stelle den Stuhl in die Küche.', 'I am putting the chair in the kitchen.'),
        n('das', 'Bad', 'Bäder', 'bathroom', 'Das Bad ist neben dem Schlafzimmer.', 'The bathroom is next to the bedroom.'),
        n('das', 'Wohnzimmer', 'Wohnzimmer', 'living room', 'Wir essen heute im Wohnzimmer.', 'We are eating in the living room today.'),
        n('das', 'Schlafzimmer', 'Schlafzimmer', 'bedroom', 'Der Schrank steht im Schlafzimmer.', 'The wardrobe is in the bedroom.'),
        n('das', 'Bett', 'Betten', 'bed', 'Die Katze liegt auf dem Bett.', 'The cat is lying on the bed.'),
        n('der', 'Schrank', 'Schränke', 'wardrobe; cupboard', 'Ich hänge die Jacke in den Schrank.', 'I am hanging the jacket in the wardrobe.'),
        n('das', 'Regal', 'Regale', 'shelf', 'Ich stelle die Bücher ins Regal.', 'I am putting the books on the shelf.'),
        n('der', 'Teppich', 'Teppiche', 'rug; carpet', 'Der Teppich liegt unter dem Tisch.', 'The rug is under the table.'),
        n('das', 'Bild', 'Bilder', 'picture', 'Das Bild hängt über dem Sofa.', 'The picture is hanging above the sofa.'),
        n('die', 'Wand', 'Wände', 'wall', 'Ich hänge die Uhr an die Wand.', 'I am hanging the clock on the wall.'),
        n('der', 'Boden', 'Böden', 'floor', 'Die Tasche steht auf dem Boden.', 'The bag is on the floor.'),
        n('der', 'Schlüssel', 'Schlüssel', 'key', 'Der Schlüssel liegt auf dem Tisch.', 'The key is on the table.'),
        n('die', 'Miete', 'Mieten', 'rent', 'Wie hoch ist die Miete?', 'How much is the rent?'),
        n('der', 'Nachbar', 'Nachbarn', 'neighbour', 'Mein Nachbar wohnt über mir.', 'My neighbour lives above me.'),
        x('umziehen', 'to move house', 'Wir sind letzten Monat umgezogen.', 'We moved last month.'),
        x('stellen', 'to put (upright)', 'Ich stelle die Lampe neben das Bett.', 'I am putting the lamp next to the bed.'),
        x('legen', 'to put (flat)', 'Ich lege das Buch auf den Tisch.', 'I am putting the book on the table.'),
        x('hängen', 'to hang', 'Die Lampe hängt über dem Tisch.', 'The lamp hangs above the table.'),
        x('stehen', 'to stand', 'Das Fahrrad steht vor der Tür.', 'The bicycle is in front of the door.'),
        x('liegen', 'to lie (be lying)', 'Dein Handy liegt in der Küche.', 'Your mobile phone is in the kitchen.'),
      ],
      sentences: [
        s('Ich stelle die Lampe auf den Tisch.', 'I am putting the lamp on the table.'),
        s('Die Lampe steht auf dem Tisch.', 'The lamp is on the table.', ['Auf dem Tisch steht die Lampe.']),
        s('Das Bild hängt an der Wand.', 'The picture is hanging on the wall.', ['An der Wand hängt das Bild.']),
        s('Wohin soll ich das Regal stellen?', 'Where should I put the shelf?'),
        s('Die Katze liegt unter dem Bett.', 'The cat is lying under the bed.', ['Unter dem Bett liegt die Katze.']),
        s('Ich lege die Zeitung auf das Sofa.', 'I am putting the newspaper on the sofa.'),
        s('Wir sind letzten Monat nach Köln umgezogen.', 'We moved to Cologne last month.', ['Letzten Monat sind wir nach Köln umgezogen.']),
        s('Das Regal steht zwischen dem Fenster und der Tür.', 'The shelf is between the window and the door.', ['Das Regal steht zwischen der Tür und dem Fenster.']),
      ],
      cloze: [
        c('Ich gehe jetzt in ___ Küche.', 'die', ['der', 'den', 'dem'], 'I am going into the kitchen now.', 'Wohin? Movement to a place takes the accusative: in die Küche.'),
        c('Wir frühstücken heute in ___ Küche.', 'der', ['die', 'den', 'das'], 'We are having breakfast in the kitchen today.', 'Wo? A location takes the dative: die Küche → in der Küche.'),
        c('Das Buch ___ auf dem Tisch.', 'liegt', ['legt', 'stellt', 'hängt'], 'The book is lying on the table.', 'liegen describes where something flat is; legen and stellen need an object.'),
        c('Kannst du die Flasche bitte in den Kühlschrank ___?', 'stellen', ['stehen', 'liegen', 'sitzen'], 'Can you put the bottle in the fridge, please?', 'Putting something somewhere (wohin?) is stellen; stehen only says where it already is.'),
        c('Der Teppich liegt unter ___ Tisch.', 'dem', ['den', 'der', 'das'], 'The rug is under the table.', 'liegen answers wo?, so dative: der Tisch → unter dem Tisch.'),
        c('Ich stelle den Stuhl neben ___ Bett.', 'das', ['dem', 'der', 'den'], 'I am putting the chair next to the bed.', 'stellen answers wohin?, so accusative: das Bett → neben das Bett.'),
        c('Wir sitzen abends gern ___ Wohnzimmer.', 'im', ['ins', 'in den', 'in die'], 'We like sitting in the living room in the evening.', 'Wo? takes the dative, and in + dem shortens to im.'),
        c('Letztes Jahr sind wir nach Hamburg ___.', 'umgezogen', ['umgezieht', 'umziehen', 'geumzogen'], 'Last year we moved to Hamburg.', 'umziehen is separable and irregular: um-ge-zogen, with sein.'),
      ],
    },

    /* --------------------------------------------------------------- a2u4 */
    {
      id: 'a2u4', title: 'Gesundheit', sub: 'Health · reflexive verbs, advice',
      goal: 'Say what hurts and how you feel, understand the doctor’s instructions and give advice yourself.',
      tips: [
        { h: 'Reflexive verbs', html:
          `<p>Some verbs need a pronoun that points back at the subject: {{sich fühlen}} (to feel), {{sich ausruhen}} (to rest), {{sich erkälten}} (to catch a cold), {{sich setzen}} (to sit down).</p>` +
          tbl(['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'], [
            ['mich', 'dich', '<b>sich</b>', 'uns', 'euch', '<b>sich</b>'],
          ]) +
          `<p>{{Ich fühle mich nicht gut.}} · {{Er ruht sich aus.}} · {{Setzen Sie sich, bitte!}}</p>
           <p class="note">These are the normal accusative pronouns, except <b>sich</b>. In the Perfekt, reflexive verbs always take <b>haben</b>: {{Ich habe mich erkältet.}}</p>` },
        { h: 'sollen: advice from someone else', html:
          `<p><b>sollen</b> reports what another person tells you to do. The doctor says: {{Trinken Sie viel!}} You report: {{Der Arzt sagt, ich soll viel trinken.}}</p>
           <p>Asking for instructions: {{Soll ich morgen wiederkommen?}} · {{Was soll ich machen?}}</p>
           <p>Giving friendly advice yourself: <b>du solltest</b> / <b>Sie sollten</b> (you should) — {{Du solltest zum Arzt gehen.}} · {{Sie sollten mehr schlafen.}}</p>
           <p class="note">{{solltest}} looks exactly like the past form from the unit <i>Früher</i>. Here it means a polite “should”; the context makes it clear.</p>` },
        { h: 'The imperative: du and Sie', html:
          tbl(['', 'How to build it', 'Examples'], [
            ['<b>Sie</b>', 'infinitive + Sie', '{{Nehmen Sie Platz!}} {{Bleiben Sie im Bett!}}'],
            ['<b>du</b>', 'du-form without -st and without du', '{{Trink viel Wasser!}} {{Nimm die Tablette!}} {{Bleib zu Hause!}}'],
          ]) +
          `<p>du nimmst → {{Nimm!}} keeps its e → i change, but a → ä verbs lose the umlaut: du schläfst → {{Schlaf gut!}}</p>
           <p>Separable and reflexive verbs: {{Ruf mich an!}} · {{Ruh dich aus!}} · {{Ruhen Sie sich aus!}} — and sein is irregular: {{Sei vorsichtig!}} · {{Seien Sie vorsichtig!}}</p>
           <p class="note">Add <b>bitte</b> and an order becomes a request: {{Kommen Sie bitte herein!}}</p>` },
        { h: 'telc: at the doctor’s', html:
          `<p>Making an appointment: {{Ich brauche einen Termin, bitte.}} · {{Haben Sie heute noch einen Termin frei?}} · {{Geht es auch am Nachmittag?}}</p>
           <p>Saying what is wrong: {{Ich habe Kopfschmerzen.}} · {{Ich habe Fieber und Husten.}} · {{Mein Rücken tut weh.}} · {{Seit drei Tagen fühle ich mich schlecht.}}</p>
           <p>Any body part + {{Schmerzen}} makes a complaint: {{Bauchschmerzen}} · {{Halsschmerzen}} · {{Zahnschmerzen}} · {{Rückenschmerzen}}</p>
           <p>You will hear: {{Was fehlt Ihnen?}} (What’s the matter?) · {{Seit wann haben Sie die Schmerzen?}} · {{Machen Sie bitte den Mund auf!}}</p>
           <p>Telling work or school: {{Leider bin ich krank und kann heute nicht kommen.}} · {{Ich brauche eine Krankschreibung.}} (sick note) — and to someone who is ill: {{Gute Besserung!}}</p>` },
      ],
      words: [
        n('der', 'Arzt', 'Ärzte', 'doctor', 'Du solltest zum Arzt gehen.', 'You should go to the doctor.'),
        n('der', 'Kopf', 'Köpfe', 'head', 'Mein Kopf tut weh.', 'My head hurts.'),
        n('der', 'Bauch', 'Bäuche', 'stomach; belly', 'Seit gestern tut mein Bauch weh.', 'My stomach has been hurting since yesterday.'),
        n('der', 'Rücken', 'Rücken', 'back', 'Ich habe Schmerzen im Rücken.', 'I have pain in my back.'),
        n('der', 'Hals', 'Hälse', 'throat; neck', 'Mein Hals ist rot und tut weh.', 'My throat is red and hurts.'),
        n('der', 'Zahn', 'Zähne', 'tooth', 'Mir tut ein Zahn weh.', 'One of my teeth hurts.'),
        n('das', 'Bein', 'Beine', 'leg', 'Legen Sie das Bein hoch!', 'Put your leg up!'),
        n('der', 'Fuß', 'Füße', 'foot', 'Meine Füße tun weh.', 'My feet hurt.'),
        n('das', 'Fieber', '', 'fever', 'Ich habe seit gestern Fieber.', 'I have had a fever since yesterday.'),
        n('der', 'Husten', '', 'cough', 'Ich habe Husten.', 'I have a cough.'),
        n('die', 'Erkältung', 'Erkältungen', 'cold (illness)', 'Ich habe eine Erkältung.', 'I have a cold.'),
        n('der', 'Schmerz', 'Schmerzen', 'pain', 'Haben Sie starke Schmerzen?', 'Are you in a lot of pain?'),
        n('das', 'Medikament', 'Medikamente', 'medicine; medication', 'Nehmen Sie das Medikament nach dem Essen.', 'Take the medicine after meals.'),
        n('das', 'Rezept', 'Rezepte', 'prescription', 'Ich brauche ein Rezept vom Arzt.', 'I need a prescription from the doctor.'),
        x('krank', 'ill; sick', 'Ich bin krank und bleibe heute zu Hause.', 'I am ill and am staying at home today.'),
        x('gesund', 'healthy', 'Iss mehr Gemüse, das ist gesund!', 'Eat more vegetables, they are healthy!'),
        x('wehtun', 'to hurt', 'Wo tut es weh?', 'Where does it hurt?'),
        x('sich fühlen', 'to feel', 'Ich fühle mich heute nicht gut.', 'I don’t feel well today.'),
        x('sich ausruhen', 'to rest', 'Ruh dich am Wochenende aus!', 'Rest at the weekend!'),
        x('Gute Besserung!', 'Get well soon!'),
      ],
      sentences: [
        s('Ich fühle mich heute nicht gut.', 'I don’t feel well today.', ['Heute fühle ich mich nicht gut.']),
        s('Mein Kopf tut seit gestern weh.', 'My head has been hurting since yesterday.', ['Seit gestern tut mein Kopf weh.']),
        s('Du solltest zum Arzt gehen.', 'You should go to the doctor.'),
        s('Der Arzt sagt, ich soll viel trinken.', 'The doctor says I should drink a lot.', ['Ich soll viel trinken, sagt der Arzt.']),
        s('Nehmen Sie die Tabletten dreimal am Tag!', 'Take the tablets three times a day!'),
        s('Bleib im Bett und ruh dich aus!', 'Stay in bed and rest!', ['Ruh dich aus und bleib im Bett!']),
        s('Ich habe mich am Wochenende ausgeruht.', 'I rested at the weekend.', ['Am Wochenende habe ich mich ausgeruht.']),
        s('Wie fühlen Sie sich heute?', 'How are you feeling today?'),
      ],
      cloze: [
        c('Ich fühle ___ heute nicht gut.', 'mich', ['mir', 'sich', 'dich'], 'I don’t feel well today.', 'The reflexive pronoun matches the subject: ich → mich.'),
        c('Ich ___ mich gestern den ganzen Tag ausgeruht.', 'habe', ['bin', 'war', 'werde'], 'I rested all day yesterday.', 'Reflexive verbs always form the Perfekt with haben.'),
        c('Meine Tochter hat ___ erkältet.', 'sich', ['ihr', 'sie', 'es'], 'My daughter has caught a cold.', 'The reflexive pronoun for er / sie / es is sich.'),
        c('Der Arzt sagt, ich ___ im Bett bleiben.', 'soll', ['sollst', 'sollen', 'sollt'], 'The doctor says I should stay in bed.', 'sollen passes on someone else’s instruction; the ich form has no ending: ich soll.'),
        c('___ Sie bitte drei Tage im Bett!', 'Bleiben', ['Bleib', 'Bleibt', 'Bleibst'], 'Please stay in bed for three days!', 'Formal imperative: infinitive + Sie.'),
        c('Bob, ___ die Tablette mit viel Wasser!', 'nimm', ['nimmst', 'nehmen', 'nehmt'], 'Bob, take the tablet with plenty of water!', 'du-imperative: du nimmst without -st → nimm.'),
        c('Mein Rücken ___ seit zwei Tagen weh.', 'tut', ['macht', 'ist', 'hat'], 'My back has been hurting for two days.', 'The fixed expression is wehtun: etwas tut weh.'),
        c('Du ___ zum Arzt gehen, du hast hohes Fieber.', 'solltest', ['solltet', 'sollten', 'sollt'], 'You should go to the doctor; you have a high fever.', 'Friendly advice to one person: du solltest + infinitive at the end.'),
      ],
    },

    /* --------------------------------------------------------------- a2u5 */
    {
      id: 'a2u5', title: 'Kleidung & Einkaufen', sub: 'Clothes and shopping · adjective endings',
      goal: 'Shop for clothes, ask for sizes and colours, describe what you want and return what doesn’t fit.',
      tips: [
        { h: 'After der, die, das: -e or -en', html:
          tbl(GENDER_HEAD, [
            ['Nominative', 'der blau<b>e</b> Mantel', 'die blau<b>e</b> Jacke', 'das blau<b>e</b> Hemd', 'die blau<b>en</b> Schuhe'],
            ['Accusative', 'den blau<b>en</b> Mantel', 'die blau<b>e</b> Jacke', 'das blau<b>e</b> Hemd', 'die blau<b>en</b> Schuhe'],
          ]) +
          `<p>Singular <b>-e</b>, except masculine accusative; plural always <b>-en</b>. {{Der blaue Mantel ist schön.}} · {{Ich nehme den blauen Mantel.}}</p>
           <p class="note">No ending at all after sein: {{Der Mantel ist blau.}} Colours you will need: {{rot}} · {{blau}} · {{grün}} · {{gelb}} · {{schwarz}} · {{weiß}} · {{grau}} · {{braun}}</p>` },
        { h: 'After ein, kein, mein: the adjective shows the gender', html:
          tbl(GENDER_HEAD, [
            ['Nominative', 'ein blau<b>er</b> Mantel', 'eine blau<b>e</b> Jacke', 'ein blau<b>es</b> Hemd', 'keine blau<b>en</b> Schuhe'],
            ['Accusative', 'einen blau<b>en</b> Mantel', 'eine blau<b>e</b> Jacke', 'ein blau<b>es</b> Hemd', 'keine blau<b>en</b> Schuhe'],
          ]) +
          `<p><b>ein</b> does not show whether a noun is ${g('der')} or ${g('das')}, so the adjective does that job: de<b>r</b> → blau<b>er</b>, da<b>s</b> → blau<b>es</b>.</p>
           <p>{{Das ist ein schöner Pullover.}} · {{Ich suche ein weißes Hemd.}} · {{Ich habe keinen warmen Mantel.}}</p>
           <p class="note">Plural with no article at all: <b>-e</b> — {{Ich brauche neue Schuhe.}}</p>` },
        { h: 'welcher? — dieser!', html:
          `<p><b>welch-</b> (which) and <b>dies-</b> (this) take the same endings as der, die, das:</p>` +
          tbl(GENDER_HEAD, [
            ['Nominative', 'welch<b>er</b> · dies<b>er</b>', 'welch<b>e</b> · dies<b>e</b>', 'welch<b>es</b> · dies<b>es</b>', 'welch<b>e</b> · dies<b>e</b>'],
            ['Accusative', 'welch<b>en</b> · dies<b>en</b>', 'welch<b>e</b> · dies<b>e</b>', 'welch<b>es</b> · dies<b>es</b>', 'welch<b>e</b> · dies<b>e</b>'],
          ]) +
          `<p>{{Welcher Mantel gefällt dir?}} — {{Dieser hier.}} · {{Welchen Rock nimmst du?}} — {{Den roten.}} · Adjectives after dieser behave as after der: {{dieser blaue Mantel}}.</p>
           <p class="note">{{gefallen}} and {{passen}} work “backwards”: the thing is the subject, the person is dative. {{Die Jacke gefällt mir.}} · {{Die Schuhe passen ihm nicht.}}</p>` },
        { h: 'telc: shopping and returning things', html:
          `<p>Asking: {{Entschuldigung, ich suche eine Jacke.}} · {{Haben Sie diese Hose auch in Schwarz?}} · {{Haben Sie das Hemd auch eine Nummer größer?}} · {{Wo kann ich das anprobieren?}}</p>
           <p>Deciding: {{Die Hose ist mir zu eng.}} · {{Das Kleid steht dir gut.}} (suits you) · {{Das ist mir zu teuer.}} · {{Ich nehme den schwarzen Pullover.}} · {{Kann ich mit Karte bezahlen?}}</p>
           <p>Returning: {{Ich habe diesen Pullover gestern gekauft, aber er passt nicht.}} · {{Kann ich ihn umtauschen?}} · {{Hier ist die Quittung.}} · {{Kann ich mein Geld zurückbekommen?}}</p>` },
      ],
      words: [
        n('die', 'Hose', 'Hosen', 'trousers', 'Ich suche eine schwarze Hose.', 'I am looking for black trousers.'),
        n('das', 'Hemd', 'Hemden', 'shirt', 'Er trägt heute ein weißes Hemd.', 'He is wearing a white shirt today.'),
        n('die', 'Jacke', 'Jacken', 'jacket', 'Die neue Jacke ist sehr warm.', 'The new jacket is very warm.'),
        n('der', 'Mantel', 'Mäntel', 'coat', 'Ich brauche einen warmen Mantel.', 'I need a warm coat.'),
        n('der', 'Pullover', 'Pullover', 'sweater', 'Das ist ein schöner Pullover.', 'That is a nice sweater.'),
        n('das', 'Kleid', 'Kleider', 'dress', 'Sie kauft das rote Kleid.', 'She is buying the red dress.'),
        n('der', 'Schuh', 'Schuhe', 'shoe', 'Die neuen Schuhe waren teuer.', 'The new shoes were expensive.'),
        n('die', 'Größe', 'Größen', 'size', 'Welche Größe haben Sie?', 'What size are you?'),
        n('die', 'Farbe', 'Farben', 'colour', 'Diese Farbe gefällt mir nicht.', 'I don’t like this colour.'),
        n('das', 'Geschäft', 'Geschäfte', 'shop; store', 'Das Geschäft schließt um acht Uhr.', 'The shop closes at eight o’clock.'),
        n('die', 'Kasse', 'Kassen', 'checkout; till', 'Bezahlen Sie bitte an der Kasse.', 'Please pay at the checkout.'),
        n('die', 'Quittung', 'Quittungen', 'receipt', 'Haben Sie die Quittung noch?', 'Do you still have the receipt?'),
        x('tragen', 'to wear; to carry', 'Sie trägt einen blauen Rock.', 'She is wearing a blue skirt.'),
        x('anprobieren', 'to try on', 'Kann ich diese Jacke anprobieren?', 'Can I try this jacket on?'),
        x('passen', 'to fit', 'Die Jacke passt mir nicht.', 'The jacket doesn’t fit me.'),
        x('gefallen', 'to please; to appeal to', 'Welches Hemd gefällt dir?', 'Which shirt do you like?'),
        x('umtauschen', 'to exchange', 'Ich möchte diesen Mantel umtauschen.', 'I would like to exchange this coat.'),
        x('suchen', 'to look for', 'Ich suche einen schwarzen Mantel.', 'I am looking for a black coat.'),
        x('eng', 'tight; narrow', 'Die Hose ist mir zu eng.', 'The trousers are too tight for me.'),
        x('günstig', 'inexpensive; good value', 'Der Mantel ist heute sehr günstig.', 'The coat is very good value today.'),
      ],
      sentences: [
        s('Ich suche einen warmen Mantel.', 'I am looking for a warm coat.'),
        s('Das ist ein schönes Kleid.', 'That is a beautiful dress.'),
        s('Der blaue Pullover gefällt mir gut.', 'I really like the blue sweater.', ['Mir gefällt der blaue Pullover gut.']),
        s('Welche Größe haben Sie?', 'What size are you?'),
        s('Kann ich diese Hose anprobieren?', 'Can I try these trousers on?'),
        s('Ich möchte dieses Hemd umtauschen.', 'I would like to exchange this shirt.'),
        s('Die schwarzen Schuhe passen mir nicht.', 'The black shoes don’t fit me.', ['Mir passen die schwarzen Schuhe nicht.']),
        s('Sie trägt heute eine rote Jacke.', 'She is wearing a red jacket today.', ['Heute trägt sie eine rote Jacke.']),
      ],
      cloze: [
        c('Das ist ein ___ Pullover.', 'schöner', ['schöne', 'schönes', 'schönen'], 'That is a nice sweater.', 'der Pullover, nominative after ein: the adjective shows the gender with -er.'),
        c('Ich kaufe einen ___ Mantel.', 'neuen', ['neue', 'neuer', 'neues'], 'I am buying a new coat.', 'Masculine accusative: the adjective always ends in -en.'),
        c('Sie trägt ein ___ Kleid.', 'rotes', ['roter', 'rote', 'roten'], 'She is wearing a red dress.', 'das Kleid after ein: the adjective ends in -es.'),
        c('Die ___ Jacke gefällt mir.', 'blaue', ['blauen', 'blauer', 'blaues'], 'I like the blue jacket.', 'After der / die / das in the nominative singular the ending is -e.'),
        c('Ich nehme die ___ Schuhe.', 'schwarzen', ['schwarze', 'schwarzer', 'schwarzes'], 'I’ll take the black shoes.', 'Plural after die: the adjective always ends in -en.'),
        c('___ Hemd möchten Sie anprobieren?', 'Welches', ['Welcher', 'Welche', 'Welchen'], 'Which shirt would you like to try on?', 'welch- takes the endings of der / die / das: das Hemd → welches Hemd.'),
        c('Ich möchte ___ Mantel umtauschen.', 'diesen', ['dieser', 'dieses', 'diese'], 'I would like to exchange this coat.', 'der Mantel as a direct object: dieser → diesen.'),
        c('Die Schuhe ___ mir nicht, sie sind zu klein.', 'passen', ['passt', 'gefällt', 'tragen'], 'The shoes don’t fit me; they are too small.', 'passen means to fit, and the verb agrees with the plural subject die Schuhe.'),
      ],
    },

    /* --------------------------------------------------------------- a2u6 */
    {
      id: 'a2u6', title: 'Stadt, Land, Wetter', sub: 'Town, country, weather · comparing',
      goal: 'Compare life in town and in the country, describe places and talk about the weather.',
      tips: [
        { h: 'Comparing: -er and am …-sten', html:
          `<p>Comparative = adjective + <b>-er</b>. Superlative = <b>am</b> + adjective + <b>-sten</b>. Many short adjectives with a, o or u also take an umlaut.</p>` +
          tbl(['', 'more', 'most'], [
            ['{{klein}}', '{{kleiner}}', '{{am kleinsten}}'],
            ['{{schön}}', '{{schöner}}', '{{am schönsten}}'],
            ['{{ruhig}}', '{{ruhiger}}', '{{am ruhigsten}}'],
            ['{{warm}}', '{{wärmer}}', '{{am wärmsten}}'],
            ['{{groß}}', '{{größer}}', '{{am größten}}'],
            ['{{alt}}', '{{älter}}', '{{am ältesten}}'],
            ['{{kalt}}', '{{kälter}}', '{{am kältesten}}'],
            ['{{teuer}}', '{{teurer}}', '{{am teuersten}}'],
          ]) +
          `<p class="note">After -t, -d, -s, -ß or -z the superlative gets an extra e: am kält<b>e</b>sten, am heiß<b>e</b>sten (but: am größten). And never “mehr + adjective”: <i>more interesting</i> is simply {{interessanter}}.</p>` },
        { h: 'Five irregular ones', html:
          tbl(['', 'more', 'most'], [
            ['{{gut}}', '{{besser}}', '{{am besten}}'],
            ['{{viel}}', '{{mehr}}', '{{am meisten}}'],
            ['{{gern}}', '{{lieber}}', '{{am liebsten}}'],
            ['{{hoch}}', '{{höher}}', '{{am höchsten}}'],
            ['{{nah}}', '{{näher}}', '{{am nächsten}}'],
          ]) +
          `<p><b>gern – lieber – am liebsten</b> is how you state preferences: {{Ich fahre gern Bus.}} · {{Ich fahre lieber Fahrrad.}} · {{Am liebsten gehe ich zu Fuß.}}</p>` },
        { h: 'als or wie?', html:
          `<p><b>Different</b> → comparative + <b>als</b> (than): {{Berlin ist größer als Hamburg.}} · {{Auf dem Land ist es ruhiger als in der Stadt.}}</p>
           <p><b>Equal</b> → <b>so</b> + basic form + <b>wie</b> (as … as): {{Heute ist es so warm wie gestern.}} · {{Das Dorf ist nicht so laut wie die Stadt.}} · {{Hier ist es genauso schön wie am Meer.}}</p>
           <p class="note">“than” is never <i>dann</i> and, in standard German, never <i>wie</i>: größer <b>als</b>.</p>` },
        { h: 'telc: town or country, and the weather', html:
          `<p>Give an opinion and compare: {{Ich wohne lieber in der Stadt.}} · {{Ich finde, das Leben auf dem Land ist ruhiger.}} · {{In der Stadt gibt es mehr Geschäfte und mehr Arbeit.}} · {{Auf dem Land ist die Luft besser, aber man braucht ein Auto.}}</p>
           <p>Describe where you live: {{Meine Stadt liegt im Süden von Deutschland.}} · {{Es gibt einen Fluss und viele Parks.}} · {{Am besten gefällt mir der Park am Fluss.}}</p>
           <p>Weather sentences start with <b>es</b>: {{Es regnet.}} · {{Es schneit.}} · {{Es ist sonnig.}} · {{Es ist windig.}} · {{Es ist bewölkt.}} (cloudy) · {{Es sind zwanzig Grad.}} · {{Morgen soll es regnen.}} · {{Wie ist das Wetter bei dir?}}</p>` },
      ],
      words: [
        n('das', 'Dorf', 'Dörfer', 'village', 'Das Dorf ist viel ruhiger als die Stadt.', 'The village is much quieter than the town.'),
        x('auf dem Land', 'in the countryside', 'Meine Großeltern wohnen auf dem Land.', 'My grandparents live in the countryside.'),
        n('der', 'Verkehr', '', 'traffic', 'In der Stadt gibt es mehr Verkehr.', 'There is more traffic in the city.'),
        n('die', 'Luft', '', 'air', 'Die Luft ist hier besser als in der Stadt.', 'The air is better here than in the city.'),
        n('die', 'Natur', '', 'nature', 'Am liebsten bin ich in der Natur.', 'Most of all I like being in nature.'),
        n('der', 'Fluss', 'Flüsse', 'river', 'Unsere Stadt liegt an einem Fluss.', 'Our town is on a river.'),
        n('der', 'Berg', 'Berge', 'mountain', 'Welcher Berg ist am höchsten?', 'Which mountain is the highest?'),
        n('der', 'See', 'Seen', 'lake', 'Der See ist im August am wärmsten.', 'The lake is warmest in August.'),
        n('der', 'Wald', 'Wälder', 'forest', 'Im Wald ist es nicht so heiß wie in der Stadt.', 'It is not as hot in the forest as in the city.'),
        n('der', 'Regen', '', 'rain', 'Bei Regen fahre ich lieber mit dem Bus.', 'When it rains I prefer to take the bus.'),
        n('der', 'Schnee', '', 'snow', 'In den Bergen liegt mehr Schnee als hier.', 'There is more snow in the mountains than here.'),
        n('der', 'Wind', 'Winde', 'wind', 'Der Wind ist heute sehr kalt.', 'The wind is very cold today.'),
        n('die', 'Temperatur', 'Temperaturen', 'temperature', 'Die Temperatur ist heute höher als gestern.', 'The temperature is higher today than yesterday.'),
        x('regnen', 'to rain', 'Es regnet seit drei Tagen.', 'It has been raining for three days.'),
        x('schneien', 'to snow', 'Im Januar schneit es hier oft.', 'It often snows here in January.'),
        x('sonnig', 'sunny', 'Morgen wird es sonnig.', 'It will be sunny tomorrow.'),
        x('warm', 'warm', 'Heute ist es wärmer als gestern.', 'Today it is warmer than yesterday.'),
        x('ruhig', 'quiet; calm', 'Meine Straße ist sehr ruhig.', 'My street is very quiet.'),
        x('laut', 'loud; noisy', 'In der Stadt ist es lauter als auf dem Land.', 'It is noisier in the city than in the country.'),
        x('lieber', 'rather; preferably', 'Ich wohne lieber auf dem Land.', 'I prefer living in the country.'),
      ],
      sentences: [
        s('Berlin ist größer als Hamburg.', 'Berlin is bigger than Hamburg.'),
        s('Auf dem Land ist es ruhiger als in der Stadt.', 'It is quieter in the country than in the city.', ['Es ist auf dem Land ruhiger als in der Stadt.']),
        s('Heute ist es wärmer als gestern.', 'Today it is warmer than yesterday.', ['Es ist heute wärmer als gestern.']),
        s('Mein Dorf ist nicht so groß wie deine Stadt.', 'My village is not as big as your town.'),
        s('Im August ist das Wetter am schönsten.', 'The weather is nicest in August.', ['Das Wetter ist im August am schönsten.', 'Am schönsten ist das Wetter im August.']),
        s('Ich wohne lieber in der Stadt.', 'I prefer living in the city.', ['In der Stadt wohne ich lieber.']),
        s('Morgen soll es den ganzen Tag regnen.', 'It is supposed to rain all day tomorrow.', ['Es soll morgen den ganzen Tag regnen.']),
        s('Am liebsten fahre ich mit dem Fahrrad.', 'Most of all I like going by bike.', ['Ich fahre am liebsten mit dem Fahrrad.']),
      ],
      cloze: [
        c('Hamburg ist größer ___ München.', 'als', ['wie', 'so', 'dann'], 'Hamburg is bigger than Munich.', 'After a comparative, “than” is als.'),
        c('Mein Zimmer ist nicht so groß ___ dein Zimmer.', 'wie', ['als', 'von', 'dann'], 'My room is not as big as your room.', 'so + adjective is completed by wie.'),
        c('Heute ist es ___ als gestern.', 'kälter', ['kalter', 'mehr kalt', 'am kältesten'], 'Today it is colder than yesterday.', 'kalt takes an umlaut in the comparative: kälter.'),
        c('Im Juli ist es hier am ___.', 'wärmsten', ['wärmer', 'warmsten', 'wärmste'], 'It is warmest here in July.', 'Superlative: am + adjective + -sten, here with umlaut: am wärmsten.'),
        c('Ich fahre gern Bus, aber ich fahre ___ Fahrrad.', 'lieber', ['gerner', 'mehr gern', 'liebsten'], 'I like taking the bus, but I prefer cycling.', 'gern is irregular: gern – lieber – am liebsten.'),
        c('Die Luft auf dem Land ist ___ als in der Stadt.', 'besser', ['guter', 'güter', 'am besten'], 'The air in the country is better than in the city.', 'gut is irregular: gut – besser – am besten.'),
        c('In der Stadt gibt es ___ Verkehr als auf dem Land.', 'mehr', ['vieler', 'mehrer', 'am meisten'], 'There is more traffic in the city than in the country.', 'viel is irregular: viel – mehr – am meisten.'),
        c('___ regnet schon den ganzen Tag.', 'Es', ['Er', 'Sie', 'Das Wetter'], 'It has been raining all day.', 'Weather verbs always take the impersonal subject es.'),
      ],
    },
  ]);

  root.DE_DATA.addSheets('a2', [
    { title: 'Perfekt: haben or sein?', html:
      tbl(['Auxiliary', 'When', 'Examples'], [
        ['<b>sein</b>', 'movement from A to B', '{{Ich bin gegangen.}} {{Sie ist geflogen.}}'],
        ['<b>sein</b>', 'change of state', '{{Ich bin aufgewacht.}} {{Er ist eingeschlafen.}}'],
        ['<b>sein</b>', 'sein, bleiben, werden, passieren', '{{Ich bin geblieben.}} {{Was ist passiert?}}'],
        ['<b>haben</b>', 'everything else, including every verb with a direct object and every reflexive verb', '{{Ich habe gegessen.}} {{Ich habe mich ausgeruht.}}'],
      ]) +
      tbl(['Verb type', 'Participle', 'Examples'], [
        ['regular', 'ge + stem + t', 'machen → {{gemacht}} · putzen → {{geputzt}}'],
        ['irregular', 'ge + stem + en, vowel often changes', 'treffen → {{getroffen}} · schreiben → {{geschrieben}}'],
        ['separable', 'prefix + ge + rest', 'aufräumen → {{aufgeräumt}} · ankommen → {{angekommen}}'],
        ['be-, ge-, er-, ver-, ent-, zer-', 'no ge-', 'besuchen → {{besucht}} · vergessen → {{vergessen}}'],
        ['-ieren', 'no ge-, always -t', 'telefonieren → {{telefoniert}}'],
      ]) +
      tbl(['Infinitive', 'Perfekt (er / sie / es)', 'English'], [
        ['nehmen', '{{hat genommen}}', 'took'],
        ['sprechen', '{{hat gesprochen}}', 'spoke'],
        ['schreiben', '{{hat geschrieben}}', 'wrote'],
        ['lesen', '{{hat gelesen}}', 'read'],
        ['finden', '{{hat gefunden}}', 'found'],
        ['treffen', '{{hat getroffen}}', 'met'],
        ['helfen', '{{hat geholfen}}', 'helped'],
        ['bringen', '{{hat gebracht}}', 'brought'],
        ['wissen', '{{hat gewusst}}', 'knew'],
        ['fliegen', '{{ist geflogen}}', 'flew'],
        ['laufen', '{{ist gelaufen}}', 'ran; walked'],
        ['werden', '{{ist geworden}}', 'became'],
      ]) +
      `<p class="note">Learn every irregular verb as a pair with its auxiliary: fliegen – ist geflogen.</p>` },

    { title: 'Präteritum: war, hatte and the modals', html:
      tbl(['', 'sein', 'haben', 'können', 'müssen', 'dürfen', 'wollen', 'sollen'], [
        ['ich', 'war', 'hatte', 'konnte', 'musste', 'durfte', 'wollte', 'sollte'],
        ['du', 'warst', 'hattest', 'konntest', 'musstest', 'durftest', 'wolltest', 'solltest'],
        ['er / sie / es', 'war', 'hatte', 'konnte', 'musste', 'durfte', 'wollte', 'sollte'],
        ['wir', 'waren', 'hatten', 'konnten', 'mussten', 'durften', 'wollten', 'sollten'],
        ['ihr', 'wart', 'hattet', 'konntet', 'musstet', 'durftet', 'wolltet', 'solltet'],
        ['sie / Sie', 'waren', 'hatten', 'konnten', 'mussten', 'durften', 'wollten', 'sollten'],
      ]) +
      `<p>{{Ich war müde.}} · {{Wir hatten keine Zeit.}} · {{Ich konnte nicht kommen.}} · {{Als Kind musste ich früh ins Bett gehen.}}</p>
       <p class="note">No umlaut in the past of the modals. <b>ich</b> and <b>er/sie/es</b> always share a form. <b>möchten</b> borrows its past from wollen: ich möchte → ich wollte.</p>` },

    { title: 'Two-way prepositions', html:
      `<p>{{in}} · {{an}} · {{auf}} · {{über}} · {{unter}} · {{vor}} · {{hinter}} · {{neben}} · {{zwischen}}</p>` +
      tbl(GENDER_HEAD, [
        ['<b>wohin?</b> → accusative', g('der', 'den'), g('die'), g('das'), 'die'],
        ['<b>wo?</b> → dative', g('der', 'dem'), g('die', 'der'), g('das', 'dem'), 'den (+n)'],
      ]) +
      tbl(['wohin? + accusative', 'wo? + dative'], [
        ['<b>stellen</b> · {{Ich stelle die Lampe auf den Tisch.}}', '<b>stehen</b> · {{Die Lampe steht auf dem Tisch.}}'],
        ['<b>legen</b> · {{Ich lege das Buch auf das Bett.}}', '<b>liegen</b> · {{Das Buch liegt auf dem Bett.}}'],
        ['<b>hängen</b> · {{Ich hänge das Bild an die Wand.}}', '<b>hängen</b> · {{Das Bild hängt an der Wand.}}'],
        ['<b>sich setzen</b> · {{Ich setze mich auf das Sofa.}}', '<b>sitzen</b> · {{Ich sitze auf dem Sofa.}}'],
      ]) +
      `<p class="note">Short forms: in + das = ins · in + dem = im · an + das = ans · an + dem = am. The action verbs are regular in the Perfekt: gestellt, gelegt, gehängt, gesetzt.</p>` },

    { title: 'Adjective endings and comparison', html:
      tbl(['Adjective ending', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['after der / die / das — nominative', '-e', '-e', '-e', '-en'],
        ['after der / die / das — accusative', '-en', '-e', '-e', '-en'],
        ['after ein / kein / mein — nominative', '-er', '-e', '-es', '-en'],
        ['after ein / kein / mein — accusative', '-en', '-e', '-es', '-en'],
      ]) +
      `<p>{{der neue Mantel}} · {{ein neuer Mantel}} · {{Ich kaufe den neuen Mantel.}} · {{das neue Hemd}} · {{ein neues Hemd}} · {{meine neuen Schuhe}}</p>
       <p class="note"><b>dieser</b> and <b>welcher</b> take the endings of der / die / das, and adjectives after them behave as after der. After sein there is no ending: {{Der Mantel ist neu.}}</p>` +
      tbl(['', 'more', 'most'], [
        ['klein', 'kleiner', 'am kleinsten'],
        ['alt', 'älter', 'am ältesten'],
        ['groß', 'größer', 'am größten'],
        ['teuer', 'teurer', 'am teuersten'],
        ['gut', 'besser', 'am besten'],
        ['viel', 'mehr', 'am meisten'],
        ['gern', 'lieber', 'am liebsten'],
        ['hoch', 'höher', 'am höchsten'],
      ]) +
      `<p>{{Berlin ist größer als Hamburg.}} · {{Hamburg ist nicht so groß wie Berlin.}}</p>` },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
