/* Course A2, units 7–12. Built towards telc Deutsch A2. */
(function (root) {
  'use strict';
  const { n, x, s, c, g, tbl } = root.DE_BUILD;

  root.DE_DATA.addUnits('a2', [
    /* ------------------------------------------------------------------ 7 */
    {
      id: 'a2u7', title: 'Freizeit & Meinungen', sub: 'Hobbies and opinions · weil, dass',
      goal: 'Talk about your free time and say what you think and why, using weil and dass.',
      tips: [
        { h: 'weil sends the verb to the end', html:
          `<p><b>weil</b> (because) opens a subordinate clause. A comma comes before it, and the conjugated verb moves to the very <b>end</b>.</p>` +
          tbl(['Main clause', 'link', 'middle', 'end = verb'], [
            ['Ich bleibe zu Hause,', '<b>weil</b>', 'ich müde', '<b>bin</b>.'],
            ['Sie lernt Deutsch,', '<b>weil</b>', 'sie in Berlin', '<b>arbeitet</b>.'],
            ['Er kommt nicht,', '<b>weil</b>', 'er arbeiten', '<b>muss</b>.'],
          ]) +
          `<p class="note">Whatever is conjugated goes last — also a modal verb or the haben / sein of the Perfekt: {{Ich bin müde, weil ich schlecht geschlafen habe.}}</p>` },
        { h: 'dass: I think that…', html:
          `<p><b>dass</b> (that) introduces what you think, know, hope or say. Same rule: comma first, verb at the end.</p>
           <p>{{Ich finde, dass der Film gut ist.}} · {{Ich glaube, dass sie heute kommt.}} · {{Ich hoffe, dass du Zeit hast.}}</p>
           <p>A separable verb joins up again at the end: {{Ich weiß, dass der Kurs um neun Uhr anfängt.}}</p>
           <p class="note">Spelling: <b>dass</b> with ss is the linking word; <b>das</b> with one s is the article or “that / this”: {{Ich weiß, dass das Buch gut ist.}}</p>` },
        { h: 'denn or weil?', html:
          `<p>Both mean “because”, but they build different sentences. <b>denn</b> behaves like und and aber: the word order after it stays normal.</p>` +
          tbl(['', 'Example'], [
            ['<b>weil</b> → verb at the end', '{{Ich esse nichts, weil ich keinen Hunger habe.}}'],
            ['<b>denn</b> → verb second', '{{Ich esse nichts, denn ich habe keinen Hunger.}}'],
          ]) +
          `<p>A weil-clause can also come first. Then the main clause starts with its verb, so two verbs meet at the comma: {{Weil ich keinen Hunger habe, esse ich nichts.}}</p>
           <p class="note">A denn-clause can never come first.</p>` },
        { h: 'telc: giving your opinion', html:
          `<ul class="phrases">
            <li>{{Ich finde, dass Sport wichtig ist.}} <span>I think that sport is important.</span></li>
            <li>{{Meiner Meinung nach ist das zu teuer.}} <span>In my opinion that is too expensive.</span></li>
            <li>{{Ich mache das gern, weil es Spaß macht.}} <span>I like doing it because it is fun.</span></li>
            <li>{{Was meinst du?}} <span>What do you think?</span></li>
            <li>{{Das finde ich auch.}} <span>I think so too.</span></li>
            <li>{{Da hast du recht.}} <span>You’re right there.</span></li>
            <li>{{Das stimmt.}} <span>That’s true.</span></li>
            <li>{{Das sehe ich anders.}} <span>I see that differently.</span></li>
            <li>{{Ich bin nicht sicher.}} <span>I’m not sure.</span></li>
          </ul>
          <p class="note">{{Meiner Meinung nach}} fills position one, so the verb comes straight after it. Follow every opinion with a reason: weil or denn.</p>` },
      ],
      words: [
        n('die', 'Freizeit', '', 'free time', 'Was machst du in deiner Freizeit?', 'What do you do in your free time?'),
        n('das', 'Hobby', 'Hobbys', 'hobby', 'Hast du ein Hobby?', 'Do you have a hobby?'),
        n('die', 'Meinung', 'Meinungen', 'opinion', 'Was ist deine Meinung?', 'What is your opinion?'),
        n('die', 'Musik', '', 'music', 'Ich finde, dass die Musik zu laut ist.', 'I think that the music is too loud.'),
        n('der', 'Verein', 'Vereine', 'club; association', 'Er spielt in einem Verein Fußball.', 'He plays football in a club.'),
        n('die', 'Mannschaft', 'Mannschaften', 'team', 'Unsere Mannschaft spielt am Samstag.', 'Our team is playing on Saturday.'),
        n('das', 'Kino', 'Kinos', 'cinema', 'Wir gehen ins Kino, weil es regnet.', 'We are going to the cinema because it is raining.'),
        n('die', 'Sendung', 'Sendungen', 'programme; broadcast', 'Ich glaube, dass die Sendung um acht Uhr anfängt.', 'I believe that the programme starts at eight o’clock.'),
        n('die', 'Zeitschrift', 'Zeitschriften', 'magazine', 'Sie liest gern Zeitschriften.', 'She likes reading magazines.'),
        n('das', 'Internet', '', 'internet', 'Ich lese die Nachrichten im Internet.', 'I read the news on the internet.'),
        x('hören', 'to listen; to hear', 'Ich höre gern Musik.', 'I like listening to music.'),
        x('wandern', 'to hike', 'Am Wochenende wandern wir oft.', 'At the weekend we often go hiking.'),
        x('gewinnen', 'to win', 'Wer hat das Spiel gewonnen?', 'Who won the game?'),
        x('finden', 'to find; to think (opinion)', 'Ich finde, dass Fußball langweilig ist.', 'I think that football is boring.'),
        x('glauben', 'to believe', 'Ich glaube, dass sie heute kommt.', 'I believe that she is coming today.'),
        x('recht haben', 'to be right', 'Ich denke, dass du recht hast.', 'I think that you are right.'),
        x('interessant', 'interesting', 'Ich finde, dass der Film interessant ist.', 'I think that the film is interesting.'),
        x('spannend', 'exciting; gripping', 'Ich finde das Spiel sehr spannend.', 'I find the game very exciting.'),
        x('weil', 'because', 'Er kommt nicht, weil er krank ist.', 'He is not coming because he is ill.'),
        x('dass', 'that (linking word)', 'Schön, dass du da bist!', 'Nice that you are here!'),
      ],
      sentences: [
        s('Ich komme nicht, weil ich arbeiten muss.', 'I am not coming because I have to work.', ['Weil ich arbeiten muss, komme ich nicht.']),
        s('Ich finde, dass der Film langweilig ist.', 'I think that the film is boring.'),
        s('Wir gehen ins Kino, denn es regnet.', 'We are going to the cinema because it is raining.'),
        s('Ich glaube, dass er heute nicht kommt.', 'I believe that he is not coming today.'),
        s('Sie lernt Deutsch, weil sie in Berlin arbeitet.', 'She is learning German because she works in Berlin.', ['Weil sie in Berlin arbeitet, lernt sie Deutsch.']),
        s('Ich hoffe, dass unsere Mannschaft gewinnt.', 'I hope that our team wins.'),
        s('Weil das Wetter schlecht ist, bleiben wir hier.', 'Because the weather is bad, we are staying here.', ['Wir bleiben hier, weil das Wetter schlecht ist.']),
        s('Ich weiß, dass du wenig Zeit hast.', 'I know that you have little time.'),
      ],
      cloze: [
        c('Ich gehe heute nicht joggen, ___ ich müde bin.', 'weil', ['denn', 'deshalb', 'aber'], 'I am not going jogging today because I am tired.', 'The verb bin stands at the end, so you need weil; denn keeps the verb in second position.'),
        c('Wir bleiben zu Hause, ___ es regnet stark.', 'denn', ['weil', 'dass', 'wenn'], 'We are staying at home because it is raining heavily.', 'After denn the word order stays normal; weil would need regnet at the end.'),
        c('Ich finde, ___ Fußball langweilig ist.', 'dass', ['weil', 'denn', 'das'], 'I think that football is boring.', 'An opinion after Ich finde is linked with dass (double s); das is the article.'),
        c('Ich glaube, dass er morgen ___.', 'kommt', ['kommen', 'gekommen', 'komme'], 'I believe that he is coming tomorrow.', 'In a dass-clause the conjugated verb stands at the end and agrees with er.'),
        c('Sie kommt nicht mit, weil sie lernen ___.', 'muss', ['müssen', 'musst', 'gemusst'], 'She is not coming along because she has to study.', 'In a weil-clause the conjugated modal verb comes last, after the infinitive.'),
        c('___ ich gern draußen bin, wandere ich oft.', 'Weil', ['Denn', 'Dass', 'Deshalb'], 'Because I like being outside, I often go hiking.', 'Only weil can open a reason clause with the verb at the end; a denn-clause cannot come first.'),
        c('Meiner Meinung ___ ist die Sendung zu lang.', 'nach', ['von', 'für', 'zu'], 'In my opinion the programme is too long.', 'The fixed phrase is meiner Meinung nach; here nach follows its noun.'),
        c('Ich weiß, dass der Film um acht Uhr ___.', 'anfängt', ['fängt an', 'anfangen', 'angefangen'], 'I know that the film starts at eight o’clock.', 'In a subordinate clause a separable verb is written as one word at the end.'),
      ],
    },

    /* ------------------------------------------------------------------ 8 */
    {
      id: 'a2u8', title: 'Feste & Einladungen', sub: 'Invitations · wenn and als',
      goal: 'Invite people, accept or decline politely, and say “when” correctly with wenn and als.',
      tips: [
        { h: 'wenn: if and whenever', html:
          `<p><b>wenn</b> means “if” and also “whenever”. Like weil and dass, it sends the verb to the end.</p>
           <p>{{Wenn ich Zeit habe, komme ich gern.}} (if) · {{Wenn ich Geburtstag habe, lade ich Freunde ein.}} (whenever)</p>
           <p>The wenn-clause usually comes first. Then the main clause starts with its verb, so two verbs meet at the comma. The other order works too: {{Ich komme gern, wenn ich Zeit habe.}}</p>` },
        { h: 'als: one time in the past', html:
          `<p><b>als</b> means “when” for something that happened <b>once</b> in the past: a single event or one period of your life. The verb goes to the end again.</p>
           <p>{{Als ich klein war, hatte ich eine Katze.}} · {{Als ich nach Deutschland gekommen bin, war ich zwanzig.}} · {{Als wir geheiratet haben, hat es geregnet.}}</p>
           <p class="note">Typical openers: {{Als ich ein Kind war}} · {{Als ich zwanzig war}} · {{Als ich in Berlin gewohnt habe}}</p>` },
        { h: 'wenn, als or wann?', html:
          tbl(['Word', 'Use', 'Example'], [
            ['<b>wenn</b>', 'if · every time (present, future, repeated past)', '{{Wenn Gäste kommen, koche ich viel.}}'],
            ['<b>als</b>', 'one time or one period in the past', '{{Als ich achtzehn war, habe ich eine große Party gemacht.}}'],
            ['<b>wann</b>', 'a question about time', '{{Wann beginnt das Fest?}}'],
          ]) +
          `<p class="note">Quick test for the past: can you add “every time”? Then it is <b>wenn</b>. Did it happen once? Then it is <b>als</b>.</p>` },
        { h: 'telc: writing a short message', html:
          `<p>A short note or e-mail needs a greeting, a few clear sentences and a closing.</p>
           <ul class="phrases">
            <li>{{Liebe Alice,}} / {{Lieber Bob,}} <span>Dear … (to a woman / to a man)</span></li>
            <li>{{Ich möchte dich zu meinem Geburtstag einladen.}} <span>inviting</span></li>
            <li>{{Die Party ist am Samstag um sieben Uhr bei mir.}} <span>when and where</span></li>
            <li>{{Vielen Dank für die Einladung!}} <span>thanking</span></li>
            <li>{{Ich komme gern. Soll ich etwas mitbringen?}} <span>accepting</span></li>
            <li>{{Leider kann ich nicht kommen, weil ich arbeiten muss.}} <span>declining with a reason</span></li>
            <li>{{Es tut mir leid, dass ich so spät antworte.}} <span>apologising</span></li>
            <li>{{Viele Grüße}} / {{Liebe Grüße}} <span>closing (informal)</span></li>
           </ul>
           <p class="note">Formal version: {{Sehr geehrte Damen und Herren,}} at the top, Sie instead of du, and {{Mit freundlichen Grüßen}} at the end. After the comma of the greeting, the first sentence starts with a small letter.</p>` },
      ],
      words: [
        n('das', 'Fest', 'Feste', 'festival; celebration', 'Das Fest war sehr schön.', 'The celebration was very nice.'),
        n('die', 'Party', 'Partys', 'party', 'Kommst du zu meiner Party?', 'Are you coming to my party?'),
        n('die', 'Einladung', 'Einladungen', 'invitation', 'Hast du meine Einladung bekommen?', 'Did you get my invitation?'),
        n('der', 'Geburtstag', 'Geburtstage', 'birthday', 'Wann hast du Geburtstag?', 'When is your birthday?'),
        n('das', 'Geschenk', 'Geschenke', 'present; gift', 'Ich habe ein Geschenk für dich.', 'I have a present for you.'),
        n('die', 'Hochzeit', 'Hochzeiten', 'wedding', 'Die Hochzeit ist im Mai.', 'The wedding is in May.'),
        n('der', 'Gast', 'Gäste', 'guest', 'Wenn Gäste kommen, koche ich viel.', 'When guests come, I cook a lot.'),
        n('der', 'Feiertag', 'Feiertage', 'public holiday', 'Morgen ist ein Feiertag.', 'Tomorrow is a public holiday.'),
        n('das', 'Weihnachten', '', 'Christmas', 'An Weihnachten besuche ich meine Familie.', 'At Christmas I visit my family.'),
        x('einladen', 'to invite', 'Ich lade dich zum Essen ein.', 'I am inviting you to dinner.'),
        x('feiern', 'to celebrate', 'Wir feiern am Samstag bei mir.', 'We are celebrating at my place on Saturday.'),
        x('mitbringen', 'to bring along', 'Soll ich etwas mitbringen?', 'Shall I bring something?'),
        x('schenken', 'to give (as a present)', 'Was schenkst du deiner Mutter?', 'What are you giving your mother?'),
        x('gratulieren', 'to congratulate', 'Ich gratuliere dir zum Geburtstag!', 'Congratulations on your birthday!'),
        x('zusagen', 'to accept (an invitation)', 'Ich habe schon zugesagt.', 'I have already accepted.'),
        x('absagen', 'to cancel; to decline', 'Leider muss ich absagen.', 'Unfortunately I have to cancel.'),
        x('leider', 'unfortunately', 'Ich habe leider keine Zeit.', 'Unfortunately I have no time.'),
        x('wenn', 'if; whenever', 'Wenn du Lust hast, komm doch mit!', 'If you feel like it, do come along!'),
        x('als', 'when (once in the past)', 'Als ich klein war, hatte ich einen Hund.', 'When I was little, I had a dog.'),
        x('Herzlichen Glückwunsch!', 'Congratulations!', 'Herzlichen Glückwunsch zum Geburtstag!', 'Happy birthday!'),
      ],
      sentences: [
        s('Wenn ich Zeit habe, komme ich gern.', 'If I have time, I will gladly come.', ['Ich komme gern, wenn ich Zeit habe.']),
        s('Als ich klein war, hatte ich eine Katze.', 'When I was little, I had a cat.', ['Ich hatte eine Katze, als ich klein war.']),
        s('Ich lade dich zu meinem Geburtstag ein.', 'I am inviting you to my birthday.'),
        s('Wenn du kommst, freue ich mich sehr.', 'If you come, I will be very pleased.', ['Ich freue mich sehr, wenn du kommst.']),
        s('Als wir Hochzeit gefeiert haben, hat es geregnet.', 'When we celebrated our wedding, it rained.', ['Es hat geregnet, als wir Hochzeit gefeiert haben.']),
        s('Leider kann ich am Samstag nicht kommen.', 'Unfortunately I cannot come on Saturday.', ['Ich kann am Samstag leider nicht kommen.', 'Am Samstag kann ich leider nicht kommen.']),
        s('Wenn es regnet, feiern wir drinnen.', 'If it rains, we will celebrate indoors.', ['Wir feiern drinnen, wenn es regnet.']),
        s('Vielen Dank für die Einladung!', 'Thank you very much for the invitation!'),
      ],
      cloze: [
        c('___ ich ein Kind war, habe ich Weihnachten geliebt.', 'Als', ['Wenn', 'Wann', 'Ob'], 'When I was a child, I loved Christmas.', 'One period in the past (your childhood) takes als, not wenn.'),
        c('___ ich Geburtstag habe, lade ich immer Freunde ein.', 'Wenn', ['Als', 'Wann', 'Dass'], 'When I have my birthday, I always invite friends.', 'Something that happens every time (immer) takes wenn.'),
        c('Wenn das Wetter schön ist, ___ im Garten.', 'feiern wir', ['wir feiern', 'wir feiert', 'feiert wir'], 'If the weather is nice, we will celebrate in the garden.', 'After a wenn-clause the main clause starts with its verb: feiern wir.'),
        c('Ich möchte dich zu meiner Party ___.', 'einladen', ['mitbringen', 'absagen', 'gratulieren'], 'I would like to invite you to my party.', 'einladen means to invite; you invite someone zu an event.'),
        c('Vielen Dank ___ die Einladung!', 'für', ['um', 'zu', 'von'], 'Thank you very much for the invitation!', 'You thank someone für something (accusative).'),
        c('Ich gratuliere ___ zum Geburtstag!', 'dir', ['dich', 'du', 'dein'], 'Congratulations on your birthday!', 'gratulieren takes the dative: dir, not dich.'),
        c('Es tut mir ___, dass ich nicht kommen kann.', 'leid', ['schade', 'traurig', 'leider'], 'I am sorry that I cannot come.', 'The fixed phrase is Es tut mir leid.'),
        c('___ beginnt die Party am Samstag?', 'Wann', ['Wenn', 'Als', 'Ob'], 'When does the party start on Saturday?', 'A direct question about time uses wann; wenn and als only link clauses.'),
      ],
    },

    /* ------------------------------------------------------------------ 9 */
    {
      id: 'a2u9', title: 'Reisen & Verkehr', sub: 'Travel and directions · indirect questions',
      goal: 'Buy a ticket, ask the way politely and say where you are going, where you are and where you come from.',
      tips: [
        { h: 'Where to? nach, in, an, zu', html:
          tbl(['Preposition', 'Use', 'Examples'], [
            ['<b>nach</b>', 'cities, countries without an article, home', '{{nach Berlin}} · {{nach Italien}} · {{nach Hause}}'],
            ['<b>in</b> + accusative', 'countries with an article, into buildings', '{{in die Schweiz}} · {{ins Kino}} · {{in die Stadt}}'],
            ['<b>an</b> + accusative', 'to the edge of water', '{{ans Meer}} · {{an den See}} · {{an den Strand}}'],
            ['<b>zu</b> + dative', 'people, shops, a place as your goal', '{{zum Arzt}} · {{zur Bank}} · {{zu meiner Schwester}}'],
          ]) +
          `<p class="note">Short forms: in das = <b>ins</b> · an das = <b>ans</b> · zu ${g('der', 'dem')} = <b>zum</b> · zu ${g('die', 'der')} = <b>zur</b>.</p>` },
        { h: 'Where? and where from?', html:
          `<p>Each destination has a matching form for being there (wo?) and for coming back (woher?).</p>` +
          tbl(['', 'Wohin? (to)', 'Wo? (in / at)', 'Woher? (from)'], [
            ['city, country', '{{nach Wien}}', '{{in Wien}}', '{{aus Wien}}'],
            ['country with article', '{{in die Schweiz}}', '{{in der Schweiz}}', '{{aus der Schweiz}}'],
            ['building', '{{ins Kino}}', '{{im Kino}}', '{{aus dem Kino}}'],
            ['water', '{{ans Meer}}', '{{am Meer}}', '{{vom Meer}}'],
            ['person', '{{zu meiner Tante}}', '{{bei meiner Tante}}', '{{von meiner Tante}}'],
            ['home', '{{nach Hause}}', '{{zu Hause}}', '{{von zu Hause}}'],
          ]) +
          `<p class="note"><b>aus</b> = out of a place you were inside, or your origin: {{Sie kommt aus Spanien.}} <b>von</b> = from a person, an activity or a point: {{Ich komme gerade vom Arzt.}} · {{Er kommt von der Arbeit.}}</p>` },
        { h: 'Indirect questions', html:
          `<p>A question sounds more polite inside another sentence. The question word stays, and the verb goes to the <b>end</b>. A yes/no question has no question word, so it gets <b>ob</b> (whether).</p>` +
          tbl(['Direct', 'Indirect'], [
            ['{{Wo ist der Bahnhof?}}', '{{Können Sie mir sagen, wo der Bahnhof ist?}}'],
            ['{{Wann fährt der Zug ab?}}', '{{Wissen Sie, wann der Zug abfährt?}}'],
            ['{{Fährt dieser Bus zum Flughafen?}}', '{{Wissen Sie, ob dieser Bus zum Flughafen fährt?}}'],
          ]) +
          `<p class="note">Openers: {{Können Sie mir sagen}} · {{Wissen Sie}} · {{Ich möchte wissen}} · {{Ich weiß nicht}} — then a comma and the question word or ob.</p>` },
        { h: 'telc: asking for information', html:
          `<ul class="phrases">
            <li>{{Entschuldigung, können Sie mir helfen?}} <span>Excuse me, can you help me?</span></li>
            <li>{{Wie komme ich zum Bahnhof?}} <span>How do I get to the station?</span></li>
            <li>{{Ich möchte eine Fahrkarte nach Köln, bitte.}} <span>I’d like a ticket to Cologne, please.</span></li>
            <li>{{Einfach oder hin und zurück?}} <span>Single or return?</span></li>
            <li>{{Wann fährt der nächste Zug nach Hamburg?}} <span>When does the next train to Hamburg leave?</span></li>
            <li>{{Von welchem Gleis fährt der Zug ab?}} <span>Which platform does the train leave from?</span></li>
            <li>{{Muss ich umsteigen?}} <span>Do I have to change?</span></li>
            <li>{{Wie lange dauert die Fahrt?}} <span>How long does the journey take?</span></li>
            <li>{{Was kostet die Fahrkarte?}} <span>How much is the ticket?</span></li>
            <li>{{Können Sie das bitte wiederholen?}} <span>Could you repeat that, please?</span></li>
          </ul>` },
      ],
      words: [
        n('die', 'Fahrkarte', 'Fahrkarten', 'ticket (train, bus)', 'Ich brauche eine Fahrkarte nach Köln.', 'I need a ticket to Cologne.'),
        n('der', 'Fahrplan', 'Fahrpläne', 'timetable', 'Wo finde ich den Fahrplan?', 'Where do I find the timetable?'),
        n('das', 'Gleis', 'Gleise', 'platform; track', 'Der Zug fährt heute von Gleis fünf ab.', 'Today the train leaves from platform five.'),
        n('die', 'Haltestelle', 'Haltestellen', 'stop (bus, tram)', 'Können Sie mir sagen, wo die Haltestelle ist?', 'Can you tell me where the stop is?'),
        n('die', 'U-Bahn', 'U-Bahnen', 'underground; subway', 'Ich fahre mit der U-Bahn zum Bahnhof.', 'I take the underground to the station.'),
        n('das', 'Flugzeug', 'Flugzeuge', 'plane', 'Das Flugzeug kommt aus Madrid.', 'The plane is coming from Madrid.'),
        n('der', 'Koffer', 'Koffer', 'suitcase', 'Mein Koffer ist zu schwer.', 'My suitcase is too heavy.'),
        n('das', 'Gepäck', '', 'luggage', 'Haben Sie viel Gepäck?', 'Do you have a lot of luggage?'),
        n('die', 'Verspätung', 'Verspätungen', 'delay', 'Der Zug hat zehn Minuten Verspätung.', 'The train is ten minutes late.'),
        n('das', 'Ausland', '', 'abroad; foreign countries', 'Meine Schwester arbeitet im Ausland.', 'My sister works abroad.'),
        n('der', 'Ausgang', 'Ausgänge', 'exit', 'Wissen Sie, wo der Ausgang ist?', 'Do you know where the exit is?'),
        x('abfahren', 'to depart; to leave', 'Wann fährt der Bus ab?', 'When does the bus leave?'),
        x('ankommen', 'to arrive', 'Wir kommen um acht Uhr in Wien an.', 'We arrive in Vienna at eight o’clock.'),
        x('umsteigen', 'to change (trains)', 'Sie müssen in Köln umsteigen.', 'You have to change in Cologne.'),
        x('aussteigen', 'to get off', 'Ich steige an der nächsten Haltestelle aus.', 'I am getting off at the next stop.'),
        x('fliegen', 'to fly', 'Morgen fliegen wir nach Spanien.', 'Tomorrow we are flying to Spain.'),
        x('buchen', 'to book', 'Ich habe ein Hotel am Meer gebucht.', 'I have booked a hotel by the sea.'),
        x('pünktlich', 'on time; punctual', 'Der Bus kommt fast immer pünktlich.', 'The bus is almost always on time.'),
        x('hin und zurück', 'there and back; return', 'Einmal nach Köln, hin und zurück, bitte.', 'One return ticket to Cologne, please.'),
        x('ob', 'whether; if', 'Weißt du, ob der Zug Verspätung hat?', 'Do you know whether the train is delayed?'),
      ],
      sentences: [
        s('Können Sie mir sagen, wo der Bahnhof ist?', 'Can you tell me where the station is?'),
        s('Wissen Sie, wann der Zug abfährt?', 'Do you know when the train leaves?'),
        s('Ich weiß nicht, ob der Bus heute fährt.', 'I don’t know whether the bus is running today.'),
        s('Wir fahren im Urlaub ans Meer.', 'We are going to the seaside on holiday.', ['Im Urlaub fahren wir ans Meer.']),
        s('Ich fahre morgen zu meiner Schwester.', 'I am going to my sister’s tomorrow.', ['Morgen fahre ich zu meiner Schwester.']),
        s('Er kommt gerade von der Arbeit.', 'He is just coming from work.', ['Gerade kommt er von der Arbeit.']),
        s('Am Wochenende bin ich bei meinen Eltern.', 'At the weekend I am at my parents’ place.', ['Ich bin am Wochenende bei meinen Eltern.']),
        s('Der Zug nach Wien fährt von Gleis drei ab.', 'The train to Vienna leaves from platform three.', ['Von Gleis drei fährt der Zug nach Wien ab.']),
      ],
      cloze: [
        c('Nächste Woche fliegen wir ___ Italien.', 'nach', ['in die', 'zu', 'bei'], 'Next week we are flying to Italy.', 'Cities and countries without an article take nach.'),
        c('Im August fahren wir ___ die Schweiz.', 'in', ['nach', 'zu', 'bei'], 'In August we are going to Switzerland.', 'Countries with an article (die Schweiz) take in + accusative.'),
        c('Ich gehe heute Nachmittag ___ Arzt.', 'zum', ['nach', 'beim', 'zur'], 'I am going to the doctor’s this afternoon.', 'Going to a person takes zu + dative: zu dem = zum.'),
        c('Am Sonntag war ich ___ meiner Tante.', 'bei', ['zu', 'nach', 'aus'], 'On Sunday I was at my aunt’s.', 'Being at a person’s place is bei + dative; zu is for going there.'),
        c('Mein Kollege kommt ___ der Türkei.', 'aus', ['zu', 'nach', 'bei'], 'My colleague comes from Turkey.', 'Origin from a country or city is aus + dative.'),
        c('Wissen Sie, ___ der Zug nach Köln pünktlich ist?', 'ob', ['wenn', 'als', 'was'], 'Do you know whether the train to Cologne is on time?', 'A yes/no question becomes an indirect question with ob.'),
        c('Ich weiß nicht, wo ___.', 'der Ausgang ist', ['ist der Ausgang', 'der Ausgang sein', 'ist es der Ausgang'], 'I don’t know where the exit is.', 'In an indirect question the verb moves to the end.'),
        c('Der Zug hat zwanzig Minuten ___.', 'Verspätung', ['Fahrplan', 'Gepäck', 'Gleis'], 'The train is twenty minutes late.', 'Verspätung haben means to be delayed.'),
      ],
    },

    /* ----------------------------------------------------------------- 10 */
    {
      id: 'a2u10', title: 'Arbeit & Ausbildung', sub: 'Jobs and training · the dative',
      goal: 'Talk about jobs and training, and say who you help, thank, give or send something to.',
      tips: [
        { h: 'Dative pronouns', html:
          `<p>The dative answers <b>wem?</b> (to whom, for whom). Its pronouns:</p>` +
          tbl(['Nominative', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'Sie'], [
            ['<b>Dative</b>', 'mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen', 'Ihnen'],
          ]) +
          `<p>{{Kannst du mir helfen?}} · {{Ich schreibe dir morgen.}} · {{Wie geht es Ihnen?}}</p>
           <p class="note">Do not mix them up with the accusative: {{Ich sehe dich.}} but {{Ich helfe dir.}}</p>` },
        { h: 'Verbs that want the dative', html:
          `<p>A few common verbs take their object in the dative, although English uses a plain object. Learn them as a group.</p>` +
          tbl(['Verb', 'Example'], [
            ['helfen', '{{Ich helfe dem Kollegen.}}'],
            ['danken', '{{Wir danken Ihnen für Ihre Hilfe.}}'],
            ['antworten', '{{Die Chefin antwortet mir nicht.}}'],
            ['gehören', '{{Der Laptop gehört der Firma.}}'],
            ['gefallen', '{{Die Arbeit gefällt mir.}}'],
          ]) +
          `<p class="note"><b>gefallen</b> works backwards: the thing you like is the subject and the person is dative. {{Die Arbeit gefällt mir.}} = “I like the job.” A plural subject needs a plural verb: {{Die neuen Kollegen gefallen mir.}}</p>
           <p>Dative articles: ${g('der', 'dem')} Chef · ${g('die', 'der')} Chefin · ${g('das', 'dem')} Kind · plural: den Kindern (+n).</p>` },
        { h: 'Two objects: who gets what', html:
          `<p>With <b>geben, schicken, zeigen, bringen, erklären</b> the person is dative and the thing is accusative.</p>` +
          tbl(['Objects', 'Order', 'Example'], [
            ['two nouns', 'person → thing', '{{Ich gebe der Kollegin den Schlüssel.}}'],
            ['pronoun + noun', 'pronoun first', '{{Ich gebe ihr den Schlüssel.}} · {{Ich gebe ihn der Kollegin.}}'],
            ['two pronouns', 'accusative → dative', '{{Ich gebe ihn ihr.}}'],
          ]) +
          `<p class="note">Rule of thumb: short pronouns move forward, right behind the verb.</p>` },
        { h: 'telc: talking about your job', html:
          `<ul class="phrases">
            <li>{{Was sind Sie von Beruf?}} <span>What is your profession?</span></li>
            <li>{{Ich bin Krankenpfleger von Beruf.}} <span>I am a nurse by profession.</span></li>
            <li>{{Ich arbeite als Verkäuferin bei einer großen Firma.}} <span>I work as a shop assistant for a big company.</span></li>
            <li>{{Ich mache eine Ausbildung zum Mechaniker.}} <span>I am training to be a mechanic.</span></li>
            <li>{{Früher habe ich als Fahrer gearbeitet.}} <span>I used to work as a driver.</span></li>
            <li>{{Ich arbeite von Montag bis Freitag.}} <span>I work from Monday to Friday.</span></li>
            <li>{{Die Arbeit gefällt mir, weil die Kollegen nett sind.}} <span>I like the work because my colleagues are nice.</span></li>
            <li>{{Ich suche eine Stelle als Kellnerin.}} <span>I am looking for a job as a waitress.</span></li>
            <li>{{Wie gefällt dir deine Arbeit?}} <span>How do you like your job?</span></li>
          </ul>
          <p class="note">Jobs take no article: {{Ich bin Lehrerin.}} — not “eine Lehrerin”.</p>` },
      ],
      words: [
        n('der', 'Beruf', 'Berufe', 'profession; occupation', 'Mein Beruf gefällt mir sehr.', 'I like my profession very much.'),
        n('die', 'Ausbildung', 'Ausbildungen', 'vocational training', 'Mein Bruder macht eine Ausbildung.', 'My brother is doing vocational training.'),
        n('die', 'Firma', 'Firmen', 'company', 'Ich arbeite bei einer kleinen Firma.', 'I work for a small company.'),
        n('der', 'Chef', 'Chefs', 'boss', 'Der Chef erklärt mir die Arbeit.', 'The boss explains the work to me.'),
        n('der', 'Kollege', 'Kollegen', 'colleague', 'Ich helfe dem neuen Kollegen.', 'I am helping the new colleague.'),
        n('die', 'Stelle', 'Stellen', 'job; position', 'Ich suche eine neue Stelle.', 'I am looking for a new job.'),
        n('die', 'Bewerbung', 'Bewerbungen', 'job application', 'Ich schicke Ihnen meine Bewerbung.', 'I am sending you my application.'),
        n('das', 'Gehalt', 'Gehälter', 'salary', 'Das Gehalt ist leider nicht hoch.', 'Unfortunately the salary is not high.'),
        n('das', 'Praktikum', 'Praktika', 'internship', 'Sie macht ein Praktikum bei einer Bank.', 'She is doing an internship at a bank.'),
        x('fehlen', 'to be missing', 'Mir fehlt noch ein Dokument.', 'I am still missing one document.'),
        x('gehören', 'to belong to', 'Wem gehört die Tasche?', 'Who does the bag belong to?'),
        x('danken', 'to thank', 'Ich danke dir für das Geschenk.', 'I thank you for the present.'),
        x('antworten', 'to answer; to reply', 'Die Firma hat mir noch nicht geantwortet.', 'The company has not replied to me yet.'),
        x('geben', 'to give', 'Kannst du mir bitte den Schlüssel geben?', 'Can you give me the key, please?'),
        x('schicken', 'to send', 'Ich schicke dir morgen die Adresse.', 'I will send you the address tomorrow.'),
        x('zeigen', 'to show', 'Zeigst du mir bitte deinen Arbeitsplatz?', 'Will you show me your workplace, please?'),
        x('erklären', 'to explain', 'Können Sie mir das bitte erklären?', 'Can you explain that to me, please?'),
        x('verdienen', 'to earn', 'In diesem Beruf verdient man gut.', 'You earn well in this profession.'),
        x('arbeitslos', 'unemployed', 'Er war ein Jahr arbeitslos.', 'He was unemployed for a year.'),
        x('von Beruf', 'by profession', 'Was sind Sie von Beruf?', 'What do you do for a living?'),
      ],
      sentences: [
        s('Kannst du mir morgen helfen?', 'Can you help me tomorrow?'),
        s('Die neue Arbeit gefällt mir sehr gut.', 'I like the new job very much.', ['Mir gefällt die neue Arbeit sehr gut.']),
        s('Das Auto gehört der Firma.', 'The car belongs to the company.'),
        s('Ich schicke dem Chef eine E-Mail.', 'I am sending the boss an e-mail.'),
        s('Die Chefin zeigt uns das Büro.', 'The boss shows us the office.'),
        s('Ich gebe ihr den Schlüssel.', 'I am giving her the key.'),
        s('Wir danken Ihnen für Ihre Hilfe.', 'We thank you for your help.'),
        s('Kannst du es mir bitte erklären?', 'Can you explain it to me, please?', ['Kannst du es mir erklären, bitte?']),
      ],
      cloze: [
        c('Kannst du ___ bitte helfen? Ich verstehe das Formular nicht.', 'mir', ['mich', 'ich', 'mein'], 'Can you help me, please? I don’t understand the form.', 'helfen takes the dative: mir, not mich.'),
        c('Die neue Stelle gefällt ___ sehr gut. Er ist glücklich.', 'ihm', ['ihn', 'er', 'sein'], 'He likes the new job very much. He is happy.', 'gefallen takes the dative; er becomes ihm.'),
        c('Der Laptop gehört ___ Firma.', 'der', ['die', 'den', 'dem'], 'The laptop belongs to the company.', 'gehören takes the dative, and feminine die becomes der.'),
        c('Ich schicke ___ Chef heute die Bewerbung.', 'dem', ['den', 'der', 'das'], 'I am sending the boss the application today.', 'The person who receives something is dative: der Chef → dem Chef.'),
        c('Das ist meine Kollegin. Ich zeige ___ das Büro.', 'ihr', ['sie', 'ihm', 'ihnen'], 'That is my colleague. I am showing her the office.', 'The person you show something to is dative; sie (she) becomes ihr.'),
        c('Wo ist der Schlüssel? — Ich habe ___ dem Chef gegeben.', 'ihn', ['ihm', 'er', 'es'], 'Where is the key? — I gave it to the boss.', 'The key is the direct object (masculine accusative): ihn. The pronoun stands before the noun.'),
        c('Vielen Dank! Ich danke ___ für Ihre Hilfe.', 'Ihnen', ['Sie', 'Ihr', 'Ihre'], 'Thank you very much! I thank you for your help.', 'danken takes the dative; formal Sie becomes Ihnen.'),
        c('Sie arbeitet ___ Verkäuferin in einem Supermarkt.', 'als', ['wie', 'für', 'von'], 'She works as a shop assistant in a supermarket.', 'A job is given with als and no article: als Verkäuferin.'),
      ],
    },

    /* ----------------------------------------------------------------- 11 */
    {
      id: 'a2u11', title: 'Restaurant & Service', sub: 'Eating out · polite forms',
      goal: 'Order, ask for things and complain politely with hätte, könnte, würde and wäre.',
      tips: [
        { h: 'Four verbs that make you polite', html:
          `<p>German softens requests with the <b>Konjunktiv II</b> (“would”, “could”). At this level you need just four verbs. Look for the umlaut: hatte → <b>hätte</b>, war → <b>wäre</b>, konnte → <b>könnte</b>, wurde → <b>würde</b>.</p>` +
          tbl(['', 'haben', 'sein', 'können', 'werden'], [
            ['ich', 'hätte', 'wäre', 'könnte', 'würde'],
            ['du', 'hättest', 'wärst', 'könntest', 'würdest'],
            ['wir / Sie', 'hätten', 'wären', 'könnten', 'würden'],
          ]) +
          `<p class="note">The er / sie / es form is the same as the ich form: {{Er hätte gern einen Tee.}}</p>` },
        { h: 'Ordering: hätte gern, würde gern', html:
          `<p><b>hätte gern</b> + a thing (accusative): {{Ich hätte gern einen Salat.}} · {{Wir hätten gern die Speisekarte.}}</p>
           <p><b>würde gern</b> + an action, with the infinitive at the end: {{Ich würde gern bestellen.}} · {{Wir würden gern draußen sitzen.}}</p>
           <p class="note">{{Ich will einen Kaffee.}} sounds like a demand. {{Ich möchte einen Kaffee.}} is fine, and {{Ich hätte gern einen Kaffee.}} is the classic polite order.</p>` },
        { h: 'Asking and complaining politely', html:
          `<p>Turn an order into a question with <b>Könnten Sie …?</b> or <b>Könnte ich …?</b> The infinitive goes to the end.</p>` +
          tbl(['Too direct', 'Polite'], [
            ['{{Bringen Sie mir die Rechnung!}}', '{{Könnten Sie mir bitte die Rechnung bringen?}}'],
            ['{{Ich will noch ein Wasser.}}', '{{Könnte ich bitte noch ein Wasser haben?}}'],
            ['{{Die Suppe ist kalt!}}', '{{Entschuldigung, die Suppe ist leider kalt.}}'],
          ]) +
          `<p><b>wäre</b> is for friendly comments and suggestions: {{Das wäre sehr nett.}} · {{Das wäre toll.}}</p>
           <p class="note">A polite complaint has three parts: {{Entschuldigung}}, the problem with {{leider}}, then a request with {{Könnten Sie}}.</p>` },
        { h: 'telc: ordering and complaining', html:
          `<ul class="phrases">
            <li>{{Ich möchte einen Tisch für zwei Personen reservieren.}} <span>I’d like to reserve a table for two.</span></li>
            <li>{{Was können Sie empfehlen?}} <span>What can you recommend?</span></li>
            <li>{{Ich hätte gern das Hähnchen mit Reis.}} <span>I’d like the chicken with rice.</span></li>
            <li>{{Für mich bitte ein Wasser.}} <span>A water for me, please.</span></li>
            <li>{{Könnten wir bitte zahlen?}} <span>Could we pay, please?</span></li>
            <li>{{Zusammen oder getrennt?}} <span>Together or separately?</span></li>
            <li>{{Stimmt so.}} <span>Keep the change.</span></li>
            <li>{{Entschuldigung, ich habe keinen Fisch bestellt.}} <span>Excuse me, I didn’t order fish.</span></li>
            <li>{{Ich glaube, die Rechnung stimmt nicht.}} <span>I think the bill is not right.</span></li>
            <li>{{Mein Fahrrad ist kaputt. Könnten Sie es reparieren?}} <span>My bike is broken. Could you repair it?</span></li>
            <li>{{Wann ist es fertig?}} <span>When will it be ready?</span></li>
          </ul>` },
      ],
      words: [
        n('der', 'Kellner', 'Kellner', 'waiter', 'Der Kellner bringt uns die Speisekarte.', 'The waiter brings us the menu.'),
        n('das', 'Trinkgeld', 'Trinkgelder', 'tip (money)', 'Wir geben dem Kellner Trinkgeld.', 'We give the waiter a tip.'),
        n('die', 'Vorspeise', 'Vorspeisen', 'starter', 'Als Vorspeise hätte ich gern eine Suppe.', 'As a starter I would like a soup.'),
        n('das', 'Hauptgericht', 'Hauptgerichte', 'main course', 'Als Hauptgericht nehme ich den Fisch.', 'As a main course I’ll take the fish.'),
        n('der', 'Nachtisch', 'Nachtische', 'dessert', 'Was gibt es heute als Nachtisch?', 'What is there for dessert today?'),
        n('das', 'Getränk', 'Getränke', 'drink; beverage', 'Welche Getränke haben Sie?', 'Which drinks do you have?'),
        n('der', 'Salat', 'Salate', 'salad', 'Der Salat ist heute sehr frisch.', 'The salad is very fresh today.'),
        n('das', 'Glas', 'Gläser', 'glass', 'Könnte ich bitte ein Glas Wasser haben?', 'Could I have a glass of water, please?'),
        n('die', 'Gabel', 'Gabeln', 'fork', 'Könnten Sie mir bitte eine Gabel bringen?', 'Could you bring me a fork, please?'),
        x('reservieren', 'to reserve', 'Wir haben einen Tisch für vier Personen reserviert.', 'We have reserved a table for four.'),
        x('empfehlen', 'to recommend', 'Ich kann den Fisch empfehlen.', 'I can recommend the fish.'),
        x('bringen', 'to bring', 'Könnten Sie mir bitte einen Löffel bringen?', 'Could you bring me a spoon, please?'),
        x('schmecken', 'to taste (good)', 'Die Suppe schmeckt mir sehr gut.', 'The soup tastes very good to me.'),
        x('probieren', 'to try (food)', 'Möchtest du den Kuchen probieren?', 'Would you like to try the cake?'),
        x('reparieren', 'to repair', 'Könnten Sie mein Fahrrad reparieren?', 'Could you repair my bike?'),
        x('satt', 'full (not hungry)', 'Nein danke, ich bin satt.', 'No thanks, I am full.'),
        x('scharf', 'spicy; hot', 'Ist die Suppe sehr scharf?', 'Is the soup very spicy?'),
        x('höflich', 'polite', 'Die Kellnerin war sehr höflich.', 'The waitress was very polite.'),
        x('hätte gern', 'would like (to have)', 'Wir hätten gern die Speisekarte.', 'We would like the menu.'),
        x('Stimmt so.', 'Keep the change.', 'Hier sind zwanzig Euro. Stimmt so.', 'Here are twenty euros. Keep the change.'),
      ],
      sentences: [
        s('Ich hätte gern ein Glas Wasser.', 'I would like a glass of water.'),
        s('Könnten Sie uns die Rechnung bringen?', 'Could you bring us the bill?'),
        s('Ich würde gern einen Tisch reservieren.', 'I would like to reserve a table.'),
        s('Das wäre sehr nett von Ihnen.', 'That would be very kind of you.'),
        s('Könnte ich noch etwas Brot haben?', 'Could I have some more bread?'),
        s('Wir würden gern draußen sitzen.', 'We would like to sit outside.'),
        s('Hätten Sie vielleicht einen Tisch für zwei?', 'Would you perhaps have a table for two?'),
        s('Was würden Sie uns empfehlen?', 'What would you recommend to us?'),
      ],
      cloze: [
        c('Ich ___ gern einen Kaffee und ein Stück Kuchen.', 'hätte', ['würde', 'wäre', 'könnte'], 'I would like a coffee and a piece of cake.', 'To order a thing you say Ich hätte gern; würde gern needs a verb at the end.'),
        c('___ Sie mir bitte das Salz geben?', 'Könnten', ['Hätten', 'Wären', 'Könntet'], 'Could you pass me the salt, please?', 'A polite request to Sie is Könnten Sie + infinitive at the end.'),
        c('Ich ___ gern einen Tisch für heute Abend reservieren.', 'würde', ['hätte', 'wäre', 'würden'], 'I would like to reserve a table for this evening.', 'würde gern + infinitive says what you would like to do; with ich the form is würde.'),
        c('Das ___ sehr nett von Ihnen, vielen Dank!', 'wäre', ['hätte', 'würde', 'könnte'], 'That would be very kind of you, thank you very much!', 'wäre is the polite form of sein: Das wäre nett.'),
        c('Könntest du mir bitte die Speisekarte ___?', 'geben', ['gibst', 'gegeben', 'gib'], 'Could you give me the menu, please?', 'After könnte the main verb is an infinitive at the end.'),
        c('Nein danke, ich möchte keinen Nachtisch. Ich bin ___.', 'satt', ['lecker', 'höflich', 'hungrig'], 'No thanks, I don’t want dessert. I am full.', 'satt means you have eaten enough.'),
        c('Der Kellner war sehr nett. Wir geben ihm zwei Euro ___.', 'Trinkgeld', ['Getränk', 'Nachtisch', 'Gabel'], 'The waiter was very nice. We are giving him a two-euro tip.', 'Trinkgeld is the extra money you give for good service.'),
        c('___ du Lust auf ein Eis?', 'Hättest', ['Wärst', 'Könntest', 'Würdest'], 'Would you fancy an ice cream?', 'The phrase is Lust haben, so the polite form is Hättest du Lust …?'),
      ],
    },

    /* ----------------------------------------------------------------- 12 */
    {
      id: 'a2u12', title: 'Termine & Pläne', sub: 'Appointments and plans · the future',
      goal: 'Make and move appointments, talk about your plans and agree on a time to meet.',
      tips: [
        { h: 'The easy future: present tense + time word', html:
          `<p>Most of the time German uses the plain <b>present tense</b> for the future. A time expression makes it clear.</p>
           <p>{{Ich komme morgen.}} · {{Nächste Woche fahre ich nach Köln.}} · {{Am Freitag habe ich einen Termin.}}</p>
           <p class="note">If the time expression comes first, the verb still stays second: {{Übermorgen besuche ich meine Eltern.}}</p>` },
        { h: 'werden + infinitive', html:
          `<p>The real future tense is another verb sandwich: a form of <b>werden</b> in position two, the infinitive at the end.</p>` +
          tbl(['', '2 = werden', 'middle', 'end = infinitive'], [
            ['ich', '<b>werde</b>', 'dich morgen', '<b>anrufen</b>.'],
            ['du', '<b>wirst</b>', 'das sicher', '<b>schaffen</b>.'],
            ['es', '<b>wird</b>', 'morgen', '<b>regnen</b>.'],
            ['wir', '<b>werden</b>', 'im Mai', '<b>heiraten</b>.'],
            ['ihr', '<b>werdet</b>', 'viel Spaß', '<b>haben</b>.'],
            ['sie / Sie', '<b>werden</b>', 'pünktlich', '<b>ankommen</b>.'],
          ]) +
          `<p>Use it for plans, promises and predictions: {{Ich werde dich bald besuchen.}}</p>
           <p class="note">werden without an infinitive means “to become”: {{Meine Tochter wird Lehrerin.}}</p>` },
        { h: 'Time expressions for the future', html:
          tbl(['Pattern', 'Examples'], [
            ['single words', '{{morgen}} · {{übermorgen}} · {{bald}} · {{später}}'],
            ['nächst- (accusative, no preposition)', '{{nächsten Montag}} · {{nächste Woche}} · {{nächstes Jahr}}'],
            ['in + dative = from now', '{{in zwei Tagen}} · {{in einer Woche}} · {{in einem Monat}}'],
            ['am + day or part of the day', '{{am Freitag}} · {{am Wochenende}} · {{am Abend}}'],
            ['um + clock time', '{{um drei Uhr}} · {{um halb acht}}'],
            ['bis · von … bis', '{{bis morgen}} · {{von Montag bis Freitag}}'],
          ]) +
          `<p class="note">The ending of nächst- follows the gender: ${g('der', 'nächsten')} Monat · ${g('die', 'nächste')} Woche · ${g('das', 'nächstes')} Jahr. After <b>in</b>, plurals add -n: {{in drei Tagen}} · {{in zwei Monaten}}.</p>` },
        { h: 'telc: arranging a date', html:
          tbl(['Step', 'Phrases'], [
            ['Suggest', '{{Wollen wir am Samstag ins Kino gehen?}} · {{Hast du am Freitag Zeit?}} · {{Wie wäre es mit Sonntag?}}'],
            ['Agree', '{{Ja, das passt mir gut.}} · {{Gute Idee!}} · {{Einverstanden.}}'],
            ['Refuse', '{{Am Samstag kann ich leider nicht.}} · {{Da habe ich schon einen Termin.}}'],
            ['Counter-propose', '{{Geht es auch am Sonntag?}} · {{Können wir uns lieber später treffen?}}'],
            ['Fix it', '{{Wann und wo treffen wir uns?}} · {{Gut, dann bis Samstag um drei!}}'],
          ]) +
          `<p class="note">When you refuse, give a short reason and offer another time straight away. That keeps the conversation moving.</p>` },
      ],
      words: [
        n('der', 'Termin', 'Termine', 'appointment', 'Ich habe am Montag einen Termin.', 'I have an appointment on Monday.'),
        n('der', 'Plan', 'Pläne', 'plan', 'Hast du schon Pläne für das Wochenende?', 'Do you already have plans for the weekend?'),
        n('das', 'Datum', 'Daten', 'date (calendar)', 'Welches Datum haben wir heute?', 'What is the date today?'),
        n('die', 'Verabredung', 'Verabredungen', 'arrangement to meet', 'Ich habe heute Abend eine Verabredung.', 'I am meeting someone this evening.'),
        n('der', 'Vorschlag', 'Vorschläge', 'suggestion', 'Ich habe einen Vorschlag.', 'I have a suggestion.'),
        n('die', 'Idee', 'Ideen', 'idea', 'Das ist eine gute Idee!', 'That is a good idea!'),
        n('die', 'Zukunft', '', 'future', 'In Zukunft werde ich mehr Sport machen.', 'In future I will do more sport.'),
        x('sich treffen', 'to meet (up)', 'Wir treffen uns um sechs am Bahnhof.', 'We are meeting at six at the station.'),
        x('vereinbaren', 'to arrange; to agree', 'Ich möchte einen Termin vereinbaren.', 'I would like to make an appointment.'),
        x('verschieben', 'to postpone; to move', 'Ich muss den Termin leider verschieben.', 'Unfortunately I have to move the appointment.'),
        x('vorschlagen', 'to suggest', 'Was schlägst du vor?', 'What do you suggest?'),
        x('werden', 'will; to become', 'Es wird morgen regnen.', 'It will rain tomorrow.'),
        x('vorhaben', 'to have planned', 'Was hast du am Wochenende vor?', 'What have you got planned for the weekend?'),
        x('klappen', 'to work out', 'Am Freitag klappt es leider nicht.', 'Unfortunately Friday doesn’t work out.'),
        x('übermorgen', 'the day after tomorrow', 'Übermorgen fahre ich zu meinen Eltern.', 'The day after tomorrow I am going to my parents’.'),
        x('bald', 'soon', 'Wir sehen uns bald!', 'See you soon!'),
        x('einverstanden', 'agreed; in agreement', 'Gut, ich bin einverstanden.', 'Fine, I agree.'),
        x('nächste Woche', 'next week', 'Nächste Woche habe ich Urlaub.', 'Next week I am on holiday.'),
        x('in zwei Tagen', 'in two days', 'In zwei Tagen beginnt der Kurs.', 'The course starts in two days.'),
        x('Lust haben', 'to feel like', 'Hast du Lust auf einen Kaffee?', 'Do you feel like a coffee?'),
      ],
      sentences: [
        s('Ich werde dich morgen anrufen.', 'I will call you tomorrow.', ['Morgen werde ich dich anrufen.']),
        s('Nächste Woche habe ich keine Zeit.', 'Next week I have no time.', ['Ich habe nächste Woche keine Zeit.']),
        s('Wir treffen uns übermorgen um sechs Uhr.', 'We are meeting the day after tomorrow at six o’clock.', ['Übermorgen treffen wir uns um sechs Uhr.']),
        s('In zwei Tagen fahre ich nach Wien.', 'In two days I am going to Vienna.', ['Ich fahre in zwei Tagen nach Wien.']),
        s('Können wir den Termin verschieben?', 'Can we move the appointment?'),
        s('Wirst du am Samstag zur Party kommen?', 'Will you come to the party on Saturday?', ['Wirst du zur Party am Samstag kommen?']),
        s('Hast du am Freitag schon etwas vor?', 'Do you already have plans on Friday?'),
        s('Nächstes Jahr werde ich eine Ausbildung machen.', 'Next year I will do vocational training.', ['Ich werde nächstes Jahr eine Ausbildung machen.']),
      ],
      cloze: [
        c('Morgen ___ es den ganzen Tag regnen.', 'wird', ['werde', 'wirst', 'werden'], 'Tomorrow it will rain all day.', 'Future = werden + infinitive; with es the form is wird.'),
        c('Ich werde dich heute Abend ___.', 'anrufen', ['angerufen', 'rufe an', 'anrufst'], 'I will call you this evening.', 'After werden the main verb is an infinitive at the end.'),
        c('___ Woche habe ich einen Termin beim Arzt.', 'Nächste', ['Nächsten', 'Nächstes', 'Nächster'], 'Next week I have a doctor’s appointment.', 'Time expressions without a preposition are accusative: die Woche → nächste Woche.'),
        c('Der Kurs beginnt in zwei ___.', 'Tagen', ['Tage', 'Tag', 'Tages'], 'The course starts in two days.', 'in + dative for a point in the future; the dative plural adds -n: Tagen.'),
        c('Wir treffen ___ am Samstag um drei Uhr.', 'uns', ['wir', 'sich', 'unser'], 'We are meeting on Saturday at three o’clock.', 'sich treffen is reflexive; with wir the pronoun is uns.'),
        c('Heute ist Montag. ___ ist Mittwoch.', 'Übermorgen', ['Morgen', 'Gestern', 'Vorgestern'], 'Today is Monday. The day after tomorrow is Wednesday.', 'übermorgen is two days from today; morgen would be Tuesday.'),
        c('Am Freitag kann ich leider nicht. Können wir den Termin ___?', 'verschieben', ['klappen', 'vorhaben', 'treffen'], 'Unfortunately I can’t on Friday. Can we move the appointment?', 'einen Termin verschieben means to move it to another time.'),
        c('Ich habe ___ Montag um zehn Uhr einen Termin.', 'am', ['im', 'um', 'in'], 'I have an appointment on Monday at ten o’clock.', 'Days take am; um is for clock times and im for months.'),
      ],
    },
  ]);

  root.DE_DATA.addSheets('a2', [
    { title: 'Subordinate clauses: verb at the end', html:
      tbl(['Linking word', 'Meaning', 'Example'], [
        ['<b>weil</b>', 'because', '{{Ich lerne Deutsch, weil ich in Berlin arbeite.}}'],
        ['<b>dass</b>', 'that', '{{Ich glaube, dass er heute kommt.}}'],
        ['<b>wenn</b>', 'if · whenever', '{{Wenn ich Zeit habe, rufe ich dich an.}}'],
        ['<b>als</b>', 'when (once, in the past)', '{{Als ich klein war, hatte ich einen Hund.}}'],
        ['<b>ob</b>', 'whether', '{{Ich weiß nicht, ob sie zu Hause ist.}}'],
        ['<b>wo, wann, wie</b> …', 'indirect question', '{{Können Sie mir sagen, wo der Bahnhof ist?}}'],
      ]) +
      tbl(['What happens', 'Example'], [
        ['the conjugated verb goes last', '{{Ich bleibe zu Hause, weil ich müde bin.}}'],
        ['a modal verb follows the infinitive', '{{Ich komme nicht, weil ich arbeiten muss.}}'],
        ['Perfekt: haben / sein go last', '{{Ich bin müde, weil ich schlecht geschlafen habe.}}'],
        ['a separable verb joins up', '{{Ich weiß, dass der Film um acht Uhr anfängt.}}'],
        ['clause first → main clause starts with its verb', '{{Weil es regnet, bleibe ich zu Hause.}}'],
      ]) +
      `<p class="note">A comma always separates the two clauses. <b>und, aber, oder, denn</b> do not change the word order: {{Ich bleibe zu Hause, denn es regnet.}}</p>` },

    { title: 'Dative: pronouns, verbs, two objects', html:
      tbl(['', 'I', 'you', 'he', 'she', 'it', 'we', 'you (pl.)', 'they', 'you (formal)'], [
        ['<b>Nom.</b>', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'Sie'],
        ['<b>Dat.</b>', 'mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen', 'Ihnen'],
      ]) +
      `<p>Dative articles: ${g('der', 'dem')} Chef · ${g('die', 'der')} Chefin · ${g('das', 'dem')} Kind · plural: den Kindern (+n)</p>` +
      tbl(['Dative verb', 'Meaning', 'Example'], [
        ['helfen', 'to help', '{{Kannst du mir helfen?}}'],
        ['danken', 'to thank', '{{Ich danke Ihnen.}}'],
        ['gefallen', 'to please (“I like”)', '{{Die Arbeit gefällt mir.}}'],
        ['gehören', 'to belong to', '{{Das Buch gehört ihm.}}'],
        ['passen', 'to suit', '{{Der Termin passt mir gut.}}'],
        ['schmecken', 'to taste good', '{{Schmeckt es dir?}}'],
        ['antworten', 'to answer', '{{Sie antwortet dem Chef.}}'],
        ['gratulieren', 'to congratulate', '{{Wir gratulieren dir!}}'],
      ]) +
      tbl(['Two objects', 'Order', 'Example'], [
        ['two nouns', 'dative → accusative', '{{Ich gebe dem Kollegen den Schlüssel.}}'],
        ['pronoun + noun', 'pronoun first', '{{Ich gebe ihm den Schlüssel.}} · {{Ich gebe ihn dem Kollegen.}}'],
        ['two pronouns', 'accusative → dative', '{{Ich gebe ihn ihm.}}'],
      ]) +
      `<p class="note">Verbs with two objects: <b>geben, schicken, zeigen, bringen, schenken, erklären, empfehlen</b>. The person is dative, the thing is accusative.</p>` },

    { title: 'Polite forms: Konjunktiv II', html:
      tbl(['', 'haben', 'sein', 'können', 'werden'], [
        ['ich', 'hätte', 'wäre', 'könnte', 'würde'],
        ['du', 'hättest', 'wärst', 'könntest', 'würdest'],
        ['er / sie / es', 'hätte', 'wäre', 'könnte', 'würde'],
        ['wir', 'hätten', 'wären', 'könnten', 'würden'],
        ['ihr', 'hättet', 'wärt', 'könntet', 'würdet'],
        ['sie / Sie', 'hätten', 'wären', 'könnten', 'würden'],
      ]) +
      tbl(['Pattern', 'Use', 'Example'], [
        ['hätte gern + noun', 'ordering, asking for a thing', '{{Ich hätte gern einen Tee.}}'],
        ['würde gern + infinitive', 'what you would like to do', '{{Ich würde gern bestellen.}}'],
        ['Könnten Sie + infinitive', 'polite request', '{{Könnten Sie mir bitte helfen?}}'],
        ['Könnte ich + infinitive', 'asking for permission', '{{Könnte ich bitte zahlen?}}'],
        ['wäre', 'friendly comment or suggestion', '{{Das wäre sehr nett.}} · {{Wie wäre es mit Samstag?}}'],
      ]) +
      `<p class="note">The infinitive goes to the end, as with modal verbs. Add <b>bitte</b> and you are polite enough for any formal situation.</p>` },

    { title: 'Future and time expressions', html:
      tbl(['', 'werden', 'Example'], [
        ['ich', 'werde', '{{Ich werde dich anrufen.}}'],
        ['du', 'wirst', '{{Wirst du kommen?}}'],
        ['er / sie / es', 'wird', '{{Es wird morgen regnen.}}'],
        ['wir', 'werden', '{{Wir werden sehen.}}'],
        ['ihr', 'werdet', '{{Ihr werdet viel Spaß haben.}}'],
        ['sie / Sie', 'werden', '{{Sie werden pünktlich ankommen.}}'],
      ]) +
      `<p>Everyday German mostly uses the present tense with a time expression instead: {{Ich rufe dich morgen an.}}</p>` +
      tbl(['Pattern', 'Examples'], [
        ['single words', '{{heute}} · {{morgen}} · {{übermorgen}} · {{bald}} · {{später}}'],
        ['nächst- (accusative)', '{{nächsten Monat}} · {{nächste Woche}} · {{nächstes Jahr}}'],
        ['in + dative', '{{in zwei Tagen}} · {{in einer Woche}} · {{in einem Jahr}}'],
        ['am + day', '{{am Montag}} · {{am Wochenende}}'],
        ['um + clock time', '{{um acht Uhr}}'],
        ['im + month', '{{im Mai}}'],
        ['bis · von … bis', '{{bis Freitag}} · {{von neun bis fünf Uhr}}'],
      ]) +
      `<p class="note">Time first means the verb stays second and the subject follows: {{Nächste Woche habe ich Urlaub.}}</p>` },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
