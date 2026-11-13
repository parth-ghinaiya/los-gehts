/* Course B1, units 7–12. Built towards telc Deutsch B1. */
(function (root) {
  'use strict';
  const { n, x, s, c, g, tbl } = root.DE_BUILD;

  root.DE_DATA.addUnits('b1', [
    /* ------------------------------------------------------------------ 7 */
    {
      id: 'b1u7', title: 'Gesundheit & Stress', sub: 'Healthy living · obwohl, trotzdem, deshalb',
      goal: 'Talk about stress and healthy habits, and say what you do because of something — or in spite of it.',
      tips: [
        { h: 'obwohl: although, verb last', html:
          `<p><b>obwohl</b> works like <b>weil</b>: it opens a subordinate clause and sends the verb to the end. It names the obstacle that does not stop you.</p>
           <p>{{Ich gehe joggen, obwohl ich müde bin.}}</p>
           <p>If the obwohl-clause comes first, it fills position 1, so the main verb follows the comma directly: {{Obwohl ich müde bin, gehe ich joggen.}}</p>` },
        { h: 'trotzdem: nevertheless, position 1', html:
          `<p><b>trotzdem</b> says the same thing from the other side. It is an adverb in a normal main clause: it takes position 1, the verb comes next, then the subject.</p>
           <p>{{Ich bin müde. Trotzdem gehe ich joggen.}}</p>
           <p class="note">obwohl goes with the obstacle (müde), trotzdem with the surprising result (joggen). trotzdem may also sit after the verb: {{Ich gehe trotzdem joggen.}}</p>` },
        { h: 'deshalb, deswegen, darum: so', html:
          `<p>All three mean “that is why” and behave like trotzdem: position 1, verb next. They introduce the <b>result</b>; weil introduces the <b>reason</b>.</p>` +
          tbl(['Connector', 'Introduces', 'Verb', 'Example'], [
            ['weil', 'reason', 'at the end', '{{Ich schlafe schlecht, weil ich Stress habe.}}'],
            ['deshalb · deswegen · darum', 'result', 'right after', '{{Ich habe Stress, deshalb schlafe ich schlecht.}}'],
            ['obwohl', 'obstacle', 'at the end', '{{Ich schlafe gut, obwohl ich Stress habe.}}'],
            ['trotzdem', 'surprising result', 'right after', '{{Ich habe Stress, trotzdem schlafe ich gut.}}'],
          ]) },
        { h: 'telc: talking about health and habits', html:
          `<p><b>Your habits</b></p>
           <ul class="phrases">
             <li>{{Ich achte auf meine Ernährung.}} <span>I watch what I eat.</span></li>
             <li>{{Ich versuche, regelmäßig Sport zu machen.}} <span>I try to exercise regularly.</span></li>
             <li>{{Um mich zu entspannen, gehe ich spazieren.}} <span>To relax, I go for a walk.</span></li>
           </ul>
           <p><b>Asking and reacting</b></p>
           <ul class="phrases">
             <li>{{Was machst du, wenn du Stress hast?}} <span>What do you do when you are stressed?</span></li>
             <li>{{Das kenne ich gut.}} <span>I know that well.</span></li>
             <li>{{Bei mir ist das ganz anders.}} <span>It is quite different for me.</span></li>
           </ul>
           <p><b>Giving advice</b></p>
           <ul class="phrases">
             <li>{{An deiner Stelle würde ich weniger arbeiten.}} <span>If I were you, I would work less.</span></li>
             <li>{{Du solltest mehr schlafen.}} <span>You should sleep more.</span></li>
           </ul>` },
      ],
      words: [
        n('der', 'Stress', '', 'stress', 'Ich habe im Moment viel Stress bei der Arbeit.', 'I have a lot of stress at work at the moment.'),
        n('die', 'Ernährung', '', 'nutrition; diet', 'Eine gesunde Ernährung ist mir wichtig.', 'A healthy diet is important to me.'),
        n('die', 'Bewegung', 'Bewegungen', 'exercise; movement', 'Er sitzt den ganzen Tag, deshalb braucht er mehr Bewegung.', 'He sits all day, so he needs more exercise.'),
        n('die', 'Gewohnheit', 'Gewohnheiten', 'habit', 'Spät zu essen ist eine schlechte Gewohnheit.', 'Eating late is a bad habit.'),
        n('das', 'Gewicht', 'Gewichte', 'weight', 'Sie ist mit ihrem Gewicht zufrieden.', 'She is happy with her weight.'),
        n('die', 'Belastung', 'Belastungen', 'strain; burden', 'Die viele Arbeit ist eine große Belastung für sie.', 'All that work is a great strain on her.'),
        x('sich entspannen', 'to relax', 'Beim Lesen kann ich mich gut entspannen.', 'I can relax well while reading.'),
        x('sich ernähren', 'to eat (a certain way)', 'Obwohl er wenig Zeit hat, ernährt er sich gesund.', 'Although he has little time, he eats healthily.'),
        x('abnehmen', 'to lose weight', 'Ich möchte fünf Kilo abnehmen.', 'I would like to lose five kilos.'),
        x('zunehmen', 'to gain weight', 'Im Urlaub habe ich zwei Kilo zugenommen.', 'I put on two kilos on holiday.'),
        x('verzichten auf', 'to do without', 'Sie verzichtet seit einem Monat auf Zucker.', 'She has been doing without sugar for a month.'),
        x('sich erholen', 'to recover; to rest', 'Im Urlaub habe ich mich gut erholt.', 'I had a good rest on holiday.'),
        x('achten auf', 'to pay attention to', 'Ich achte auf meine Ernährung.', 'I pay attention to my diet.'),
        x('vermeiden', 'to avoid', 'Der Arzt sagt, ich soll Stress vermeiden.', 'The doctor says I should avoid stress.'),
        x('schaden', 'to harm', 'Zu wenig Schlaf schadet der Gesundheit.', 'Too little sleep harms your health.'),
        x('leiden unter', 'to suffer from', 'Viele Menschen leiden unter Stress.', 'Many people suffer from stress.'),
        x('regelmäßig', 'regular; regularly', 'Ich mache regelmäßig Sport, trotzdem bin ich oft müde.', 'I exercise regularly; nevertheless I am often tired.'),
        x('erschöpft', 'exhausted', 'Nach der Arbeit bin ich oft erschöpft.', 'After work I am often exhausted.'),
        x('anstrengend', 'exhausting; tiring', 'Die Woche war sehr anstrengend.', 'The week was very tiring.'),
        x('unter Druck stehen', 'to be under pressure', 'Vor Prüfungen stehe ich immer unter Druck.', 'Before exams I am always under pressure.'),
      ],
      sentences: [
        s('Obwohl ich müde bin, gehe ich joggen.', 'Although I am tired, I go jogging.', ['Ich gehe joggen, obwohl ich müde bin.']),
        s('Er ist krank. Trotzdem geht er zur Arbeit.', 'He is ill. Nevertheless he goes to work.', ['Er ist krank. Er geht trotzdem zur Arbeit.']),
        s('Ich habe viel Stress, deshalb schlafe ich schlecht.', 'I have a lot of stress, so I sleep badly.', ['Ich habe viel Stress, ich schlafe deshalb schlecht.']),
        s('Sie raucht immer noch, obwohl sie oft krank ist.', 'She still smokes although she is often ill.', ['Obwohl sie oft krank ist, raucht sie immer noch.']),
        s('Ich will abnehmen, deswegen verzichte ich auf Zucker.', 'I want to lose weight, so I am doing without sugar.', ['Ich will abnehmen, ich verzichte deswegen auf Zucker.']),
        s('Obwohl er wenig Zeit hat, kocht er jeden Abend.', 'Although he has little time, he cooks every evening.', ['Er kocht jeden Abend, obwohl er wenig Zeit hat.']),
        s('Die Woche war anstrengend, darum bleibe ich heute zu Hause.', 'The week was tiring, so I am staying at home today.', ['Die Woche war anstrengend, ich bleibe darum heute zu Hause.']),
        s('Ich schlafe genug. Trotzdem bin ich immer erschöpft.', 'I sleep enough. Nevertheless I am always exhausted.', ['Ich schlafe genug. Ich bin trotzdem immer erschöpft.']),
      ],
      cloze: [
        c('Sie geht joggen, ___ es stark regnet.', 'obwohl', ['trotzdem', 'deshalb', 'denn'], 'She goes jogging although it is raining heavily.', 'The verb (regnet) is at the end, so the gap needs a subordinating word: obwohl.'),
        c('Ich habe schlecht geschlafen. ___ bin ich heute fit.', 'Trotzdem', ['Obwohl', 'Deshalb', 'Weil'], 'I slept badly. Nevertheless I am fit today.', 'Trotzdem (position 1, verb next) marks a surprising result; obwohl and weil need the verb at the end, and deshalb gives the wrong logic.'),
        c('Der Arzt hat mir Ruhe empfohlen, ___ bleibe ich heute zu Hause.', 'deshalb', ['weil', 'obwohl', 'trotzdem'], 'The doctor recommended rest, so I am staying at home today.', 'A logical result with the verb directly after the connector: deshalb.'),
        c('Ich esse wenig Zucker, trotzdem ___ nicht ab.', 'nehme ich', ['ich nehme', 'ich abnehme', 'abnehme ich'], 'I eat little sugar; nevertheless I am not losing weight.', 'After trotzdem the verb comes before the subject, and the prefix ab stays at the end.'),
        c('Seit Januar verzichtet sie ___ Alkohol.', 'auf', ['an', 'für', 'über'], 'She has been doing without alcohol since January.', 'The verb is verzichten auf + accusative.'),
        c('Viele Menschen leiden ___ Stress bei der Arbeit.', 'unter', ['über', 'für', 'mit'], 'Many people suffer from stress at work.', 'You suffer “under” a burden: leiden unter + dative.'),
        c('Zu viel Zucker ___ der Gesundheit.', 'schadet', ['verletzt', 'stört', 'vermeidet'], 'Too much sugar harms your health.', 'Only schaden takes a dative object (der Gesundheit); the others need the accusative.'),
        c('Im Urlaub habe ich drei Kilo ___.', 'zugenommen', ['angenommen', 'aufgenommen', 'übernommen'], 'I put on three kilos on holiday.', 'To gain weight is zunehmen; the other verbs mean to accept, to take in and to take over.'),
      ],
    },

    /* ------------------------------------------------------------------ 8 */
    {
      id: 'b1u8', title: 'Ämter & Formulare', sub: 'Offices and forms · the genitive',
      goal: 'Deal with offices, forms and deadlines, and use the genitive to say whose something is and because of what.',
      tips: [
        { h: 'The genitive: whose?', html:
          `<p>The fourth case answers <b>wessen?</b> (whose?). It stands where English uses “of” or ’s, and it comes <b>after</b> the thing owned.</p>` +
          tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
            ['the', g('der', 'des') + ' Vater<b>s</b>', g('die', 'der') + ' Mutter', g('das', 'des') + ' Kind<b>es</b>', 'der Kinder'],
            ['a', g('der', 'eines') + ' Vater<b>s</b>', g('die', 'einer') + ' Mutter', g('das', 'eines') + ' Kind<b>es</b>', '–'],
          ]) +
          `<p>{{die Unterschrift des Vermieters}} · {{die Öffnungszeiten der Behörde}} · {{das Ende des Jahres}} · {{die Adresse einer Freundin}}</p>
           <p class="note">kein and the possessives follow ein: {{das Auto meines Bruders}}, {{die Wohnung meiner Schwester}}.</p>` },
        { h: 'The noun gets an -s too', html:
          `<p>Masculine and neuter nouns add <b>-s</b>: {{des Vermieters}}, {{des Formulars}}. Short one-syllable nouns usually take <b>-es</b>: {{des Amtes}}, {{des Jahres}}. After s, ß, x or z it is always -es: {{des Hauses}}, {{des Platzes}}.</p>
           <p>Feminine and plural nouns do not change: {{der Behörde}}, {{der Kinder}}. Names simply add -s: {{Bobs Ausweis}}.</p>
           <p class="note">In everyday speech you will often hear <b>von</b> + dative instead: {{das Auto von meinem Bruder}}. In letters and forms, use the genitive.</p>` },
        { h: 'Prepositions with the genitive', html:
          tbl(['Preposition', 'Meaning', 'Example'], [
            ['wegen', 'because of', '{{wegen des Wetters}}'],
            ['trotz', 'in spite of', '{{trotz der Verspätung}}'],
            ['während', 'during', '{{während der Arbeitszeit}}'],
            ['innerhalb', 'within', '{{innerhalb einer Woche}}'],
            ['außerhalb', 'outside (of)', '{{außerhalb der Öffnungszeiten}}'],
          ]) +
          `<p>They pack a whole clause into a few words: {{Trotz des Regens gehen wir spazieren.}} = {{Obwohl es regnet, gehen wir spazieren.}}</p>
           <p class="note">A preposition phrase in first place counts as position 1, so the verb comes straight after it: {{Wegen des Wetters fällt der Termin aus.}}</p>` },
        { h: 'telc: at the office', html:
          `<p><b>Saying what you need</b></p>
           <ul class="phrases">
             <li>{{Ich möchte einen Antrag stellen.}} <span>I would like to submit an application.</span></li>
             <li>{{Ich brauche eine Bescheinigung für meinen Arbeitgeber.}} <span>I need a certificate for my employer.</span></li>
             <li>{{An wen kann ich mich wenden?}} <span>Who can I turn to?</span></li>
           </ul>
           <p><b>Asking about the details</b></p>
           <ul class="phrases">
             <li>{{Welche Unterlagen brauche ich dafür?}} <span>Which documents do I need for that?</span></li>
             <li>{{Bis wann muss ich das Formular abgeben?}} <span>By when do I have to hand in the form?</span></li>
             <li>{{Wo muss ich unterschreiben?}} <span>Where do I have to sign?</span></li>
             <li>{{Wie lange dauert die Bearbeitung?}} <span>How long does processing take?</span></li>
           </ul>
           <p><b>When you do not understand</b></p>
           <ul class="phrases">
             <li>{{Könnten Sie mir das bitte erklären?}} <span>Could you explain that to me, please?</span></li>
             <li>{{Was bedeutet dieses Wort im Formular?}} <span>What does this word in the form mean?</span></li>
           </ul>` },
      ],
      words: [
        n('die', 'Behörde', 'Behörden', 'authority; public office', 'Die Öffnungszeiten der Behörde stehen im Internet.', 'The authority’s opening hours are on the internet.'),
        n('das', 'Amt', 'Ämter', 'government office', 'Wegen des Umzugs muss ich zum Amt gehen.', 'Because of the move I have to go to the office.'),
        n('der', 'Antrag', 'Anträge', 'application; request', 'Ich habe den Antrag letzte Woche gestellt.', 'I submitted the application last week.'),
        n('die', 'Frist', 'Fristen', 'deadline', 'Die Frist endet am Ende des Monats.', 'The deadline ends at the end of the month.'),
        n('die', 'Bescheinigung', 'Bescheinigungen', 'certificate; written confirmation', 'Ich brauche eine Bescheinigung meines Arbeitgebers.', 'I need a certificate from my employer.'),
        n('die', 'Unterschrift', 'Unterschriften', 'signature', 'Hier fehlt noch die Unterschrift des Vermieters.', 'The landlord’s signature is still missing here.'),
        n('der', 'Vertrag', 'Verträge', 'contract', 'Lies den Vertrag genau, bevor du unterschreibst.', 'Read the contract carefully before you sign.'),
        n('die', 'Gebühr', 'Gebühren', 'fee', 'Für den neuen Ausweis muss man eine Gebühr bezahlen.', 'You have to pay a fee for the new ID card.'),
        n('die', 'Genehmigung', 'Genehmigungen', 'permit; approval', 'Ohne Genehmigung der Stadt darf man hier nicht bauen.', 'Without the city’s permission you may not build here.'),
        n('die', 'Staatsangehörigkeit', 'Staatsangehörigkeiten', 'nationality; citizenship', 'Bitte geben Sie Ihre Staatsangehörigkeit an.', 'Please state your nationality.'),
        x('beantragen', 'to apply for', 'Ich muss einen neuen Pass beantragen.', 'I have to apply for a new passport.'),
        x('einreichen', 'to submit; to hand in', 'Sie müssen die Unterlagen innerhalb einer Woche einreichen.', 'You must submit the documents within a week.'),
        x('verlängern', 'to extend; to renew', 'Können Sie die Frist um eine Woche verlängern?', 'Can you extend the deadline by a week?'),
        x('kündigen', 'to cancel; to give notice', 'Er hat den Vertrag schriftlich gekündigt.', 'He cancelled the contract in writing.'),
        x('bestätigen', 'to confirm', 'Können Sie den Termin bitte schriftlich bestätigen?', 'Can you please confirm the appointment in writing?'),
        x('sich erkundigen nach', 'to enquire about', 'Ich möchte mich nach den Öffnungszeiten erkundigen.', 'I would like to enquire about the opening hours.'),
        x('ablaufen', 'to expire', 'Mein Pass läuft nächsten Monat ab.', 'My passport expires next month.'),
        x('gültig', 'valid', 'Der Ausweis ist noch zwei Jahre gültig.', 'The ID card is valid for another two years.'),
        x('zuständig', 'responsible; in charge', 'Wer ist für diesen Antrag zuständig?', 'Who is responsible for this application?'),
        x('Bescheid geben', 'to let someone know', 'Geben Sie mir bitte Bescheid, wenn der Brief da ist.', 'Please let me know when the letter is here.'),
      ],
      sentences: [
        s('Wegen des Wetters fällt der Termin aus.', 'Because of the weather the appointment is cancelled.', ['Der Termin fällt wegen des Wetters aus.']),
        s('Das ist die Unterschrift des Vermieters.', 'That is the landlord’s signature.'),
        s('Trotz des Regens ist er zu Fuß zum Amt gegangen.', 'In spite of the rain he walked to the office.', ['Er ist trotz des Regens zu Fuß zum Amt gegangen.']),
        s('Sie müssen den Antrag innerhalb einer Woche einreichen.', 'You must submit the application within a week.', ['Den Antrag müssen Sie innerhalb einer Woche einreichen.', 'Innerhalb einer Woche müssen Sie den Antrag einreichen.']),
        s('Während der Mittagspause ist das Büro geschlossen.', 'During the lunch break the office is closed.', ['Das Büro ist während der Mittagspause geschlossen.']),
        s('Ich brauche die Adresse eines guten Anwalts.', 'I need the address of a good lawyer.'),
        s('Außerhalb der Öffnungszeiten erreichen Sie uns per E-Mail.', 'Outside opening hours you can reach us by e-mail.', ['Sie erreichen uns außerhalb der Öffnungszeiten per E-Mail.', 'Per E-Mail erreichen Sie uns außerhalb der Öffnungszeiten.']),
        s('Am Ende des Monats läuft mein Vertrag ab.', 'At the end of the month my contract expires.', ['Mein Vertrag läuft am Ende des Monats ab.']),
      ],
      cloze: [
        c('Wir brauchen noch die Unterschrift ___ Vermieters.', 'des', ['der', 'dem', 'den'], 'We still need the landlord’s signature.', 'Whose signature? Genitive masculine: des Vermieters.'),
        c('___ des schlechten Wetters bleibt das Amt heute geschlossen.', 'Wegen', ['Weil', 'Deshalb', 'Obwohl'], 'Because of the bad weather the office stays closed today.', 'Only a preposition can stand before a noun phrase; wegen takes the genitive.'),
        c('Bitte schicken Sie das Formular innerhalb ___ Woche zurück.', 'einer', ['eine', 'einem', 'eines'], 'Please send the form back within a week.', 'innerhalb takes the genitive; feminine: einer Woche.'),
        c('Trotz ___ Wartezeit war die Mitarbeiterin sehr freundlich.', 'der langen', ['die lange', 'dem langen', 'des langen'], 'In spite of the long wait the employee was very friendly.', 'trotz + genitive; Wartezeit is feminine, so der, and the adjective takes -en.'),
        c('Ich möchte einen Antrag auf Kindergeld ___.', 'stellen', ['legen', 'geben', 'setzen'], 'I would like to apply for child benefit.', 'Fixed collocation: einen Antrag stellen.'),
        c('Mein Ausweis ist nur noch bis März ___.', 'gültig', ['zuständig', 'pünktlich', 'geöffnet'], 'My ID card is only valid until March.', 'Documents are gültig (valid); zuständig describes the person or office in charge.'),
        c('Für diese Frage ist meine Kollegin ___.', 'zuständig', ['gültig', 'abhängig', 'möglich'], 'My colleague is responsible for this question.', 'zuständig sein für = to be the one in charge of something.'),
        c('___ der Ferien ist das Büro nur vormittags geöffnet.', 'Während', ['Seit', 'Bei', 'Wenn'], 'During the holidays the office is only open in the mornings.', 'der Ferien is genitive plural, so the preposition must be während; seit and bei take the dative.'),
      ],
    },

    /* ------------------------------------------------------------------ 9 */
    {
      id: 'b1u9', title: 'Gefühle & Konflikte', sub: 'Feelings · verbs with prepositions',
      goal: 'Say how you feel, argue fairly and make up again — with the right preposition after each verb.',
      tips: [
        { h: 'Verb + preposition: learn them as one', html:
          `<p>Many verbs come with a fixed preposition. It often makes no sense in English, and it decides the case — so learn verb, preposition and case together.</p>` +
          tbl(['Verb', 'Preposition', 'Example'], [
            ['warten', 'auf + acc.', '{{Ich warte auf den Bus.}}'],
            ['sich freuen', 'auf + acc. <small>(still to come)</small>', '{{Ich freue mich auf den Urlaub.}}'],
            ['sich freuen', 'über + acc. <small>(already here)</small>', '{{Ich freue mich über das Geschenk.}}'],
            ['sich ärgern', 'über + acc.', '{{Er ärgert sich über den Lärm.}}'],
            ['denken', 'an + acc.', '{{Ich denke an dich.}}'],
            ['sich interessieren', 'für + acc.', '{{Sie interessiert sich für Kunst.}}'],
            ['träumen', 'von + dat.', '{{Er träumt von einem Haus am Meer.}}'],
          ]) },
        { h: 'darauf, darüber, daran', html:
          `<p>For a <b>thing</b> or an idea, do not say “auf es”. Use <b>da</b> + preposition (<b>dar-</b> before a vowel): {{Ich warte auf den Bus.}} → {{Ich warte darauf.}}</p>
           <p>For a <b>person</b>, keep preposition + pronoun: {{Ich warte auf dich.}} · {{Ich denke an ihn.}}</p>
           <p class="note">The da-word also announces a whole clause: {{Ich freue mich darauf, dich zu sehen.}} · {{Ich ärgere mich darüber, dass er nie anruft.}}</p>` },
        { h: 'Worauf? Auf wen?', html:
          `<p>Questions follow the same split: <b>wo(r)</b> + preposition for things, preposition + <b>wen / wem</b> for people.</p>` +
          tbl(['', 'Thing', 'Person'], [
            ['warten auf', '{{Worauf wartest du?}}', '{{Auf wen wartest du?}}'],
            ['sich ärgern über', '{{Worüber ärgerst du dich?}}', '{{Über wen ärgerst du dich?}}'],
            ['träumen von', '{{Wovon träumst du?}}', '{{Von wem träumst du?}}'],
          ]) +
          `<p class="note">wen after accusative prepositions, wem after dative ones.</p>` },
        { h: 'telc: feelings, apologies, making up', html:
          `<p><b>Saying what bothers you</b></p>
           <ul class="phrases">
             <li>{{Ich ärgere mich darüber, dass du immer zu spät kommst.}} <span>It annoys me that you are always late.</span></li>
             <li>{{Es stört mich, wenn du nicht zuhörst.}} <span>It bothers me when you do not listen.</span></li>
             <li>{{Ich bin enttäuscht, weil du nicht angerufen hast.}} <span>I am disappointed because you did not call.</span></li>
           </ul>
           <p><b>Apologising</b></p>
           <ul class="phrases">
             <li>{{Es tut mir leid, dass ich so laut war.}} <span>I am sorry that I was so loud.</span></li>
             <li>{{Das war nicht so gemeint.}} <span>I did not mean it like that.</span></li>
             <li>{{Entschuldige bitte, das wollte ich nicht.}} <span>I am sorry, I did not want that.</span></li>
           </ul>
           <p><b>Accepting and making up</b></p>
           <ul class="phrases">
             <li>{{Schon gut, das kann jedem passieren.}} <span>It is all right, that can happen to anyone.</span></li>
             <li>{{Ich verstehe, dass du sauer bist.}} <span>I understand that you are annoyed.</span></li>
             <li>{{Lass uns in Ruhe darüber reden.}} <span>Let us talk about it calmly.</span></li>
           </ul>` },
      ],
      words: [
        n('das', 'Gefühl', 'Gefühle', 'feeling', 'Ich habe das Gefühl, dass du mir nicht zuhörst.', 'I have the feeling that you are not listening to me.'),
        n('die', 'Wut', '', 'rage; anger', 'Vor Wut konnte er nichts mehr sagen.', 'He was so angry that he could not say anything more.'),
        n('die', 'Sorge', 'Sorgen', 'worry', 'Ich mache mir Sorgen um dich.', 'I am worried about you.'),
        n('das', 'Missverständnis', 'Missverständnisse', 'misunderstanding', 'Das war nur ein Missverständnis.', 'That was only a misunderstanding.'),
        n('der', 'Vorwurf', 'Vorwürfe', 'reproach; accusation', 'Sie macht ihm ständig Vorwürfe.', 'She is constantly reproaching him.'),
        n('das', 'Vertrauen', '', 'trust', 'Ohne Vertrauen funktioniert keine Freundschaft.', 'No friendship works without trust.'),
        n('der', 'Kompromiss', 'Kompromisse', 'compromise', 'Am Ende haben wir einen Kompromiss gefunden.', 'In the end we found a compromise.'),
        x('sich ärgern über', 'to be annoyed about', 'Ich ärgere mich über meinen Nachbarn.', 'I am annoyed about my neighbour.'),
        x('sich freuen auf', 'to look forward to', 'Ich freue mich auf das Wochenende.', 'I am looking forward to the weekend.'),
        x('sich freuen über', 'to be pleased about', 'Sie hat sich über die Blumen gefreut.', 'She was pleased about the flowers.'),
        x('denken an', 'to think of', 'Ich denke oft an meine Familie.', 'I often think of my family.'),
        x('sich interessieren für', 'to be interested in', 'Wofür interessierst du dich?', 'What are you interested in?'),
        x('träumen von', 'to dream of', 'Er träumt von einem eigenen Haus.', 'He dreams of a house of his own.'),
        x('sich streiten', 'to argue; to quarrel', 'Wir streiten uns fast nie.', 'We almost never argue.'),
        x('sich entschuldigen für', 'to apologise for', 'Ich möchte mich für meinen Fehler entschuldigen.', 'I would like to apologise for my mistake.'),
        x('sich verlassen auf', 'to rely on', 'Auf sie kann ich mich immer verlassen.', 'I can always rely on her.'),
        x('verzeihen', 'to forgive', 'Kannst du mir verzeihen?', 'Can you forgive me?'),
        x('enttäuscht', 'disappointed', 'Ich bin enttäuscht, dass du nicht gekommen bist.', 'I am disappointed that you did not come.'),
        x('eifersüchtig', 'jealous', 'Er ist eifersüchtig auf ihren Kollegen.', 'He is jealous of her colleague.'),
        x('sich versöhnen', 'to make up; to reconcile', 'Nach dem Streit haben sie sich schnell wieder versöhnt.', 'After the argument they quickly made up again.'),
      ],
      sentences: [
        s('Hast du dich schon bei ihm dafür entschuldigt?', 'Have you already apologised to him for that?', ['Hast du dich dafür schon bei ihm entschuldigt?', 'Hast du dich bei ihm schon dafür entschuldigt?']),
        s('Worüber ärgerst du dich so?', 'What are you so annoyed about?'),
        s('Ich warte seit einer Stunde auf dich.', 'I have been waiting for you for an hour.', ['Seit einer Stunde warte ich auf dich.']),
        s('Denkst du noch oft an unseren Streit?', 'Do you still often think about our argument?'),
        s('Sie hat sich sehr über das Geschenk gefreut.', 'She was very pleased about the present.', ['Über das Geschenk hat sie sich sehr gefreut.']),
        s('Er interessiert sich nicht für meine Probleme.', 'He is not interested in my problems.'),
        s('Ich freue mich darauf, dich bald zu sehen.', 'I am looking forward to seeing you soon.'),
        s('Wovon hast du letzte Nacht geträumt?', 'What did you dream about last night?'),
      ],
      cloze: [
        c('Wir warten schon lange ___ eine Antwort.', 'auf', ['für', 'an', 'über'], 'We have been waiting for an answer for a long time.', 'The verb is warten auf + accusative.'),
        c('___ ärgerst du dich? – Über den Lärm.', 'Worüber', ['Worauf', 'Wofür', 'Woran'], 'What are you annoyed about? – About the noise.', 'sich ärgern über, so the question word for a thing is wo + r + über.'),
        c('Morgen fahren wir ans Meer. Ich freue mich schon ___.', 'darauf', ['daran', 'dafür', 'davon'], 'Tomorrow we are going to the sea. I am already looking forward to it.', 'Something still to come: sich freuen auf, and for a thing auf becomes darauf.'),
        c('Das ist mein bester Freund. Ich kann mich immer auf ___ verlassen.', 'ihn', ['ihm', 'er', 'sich'], 'That is my best friend. I can always rely on him.', 'For a person keep preposition + pronoun; sich verlassen auf takes the accusative.'),
        c('Sie träumt ___ einer langen Reise durch Asien.', 'von', ['über', 'an', 'für'], 'She dreams of a long trip through Asia.', 'The verb is träumen von + dative (einer langen Reise).'),
        c('Ich denke oft ___ unseren letzten Urlaub.', 'an', ['auf', 'für', 'von'], 'I often think of our last holiday.', 'The verb is denken an + accusative.'),
        c('Das war keine Absicht, das war nur ein ___.', 'Missverständnis', ['Vorwurf', 'Vertrauen', 'Kompromiss'], 'It was not on purpose, it was only a misunderstanding.', 'Something that was not intended and was understood wrongly is a Missverständnis.'),
        c('Du hast ___, ich hätte früher anrufen sollen.', 'recht', ['richtig', 'wahr', 'Grund'], 'You are right, I should have called earlier.', 'Fixed phrase: recht haben = to be right.'),
      ],
    },

    /* ----------------------------------------------------------------- 10 */
    {
      id: 'b1u10', title: 'Medien & Meinung', sub: 'Media, opinions · two-part connectors',
      goal: 'Discuss media and the internet, weigh advantages against disadvantages and give your opinion clearly.',
      tips: [
        { h: 'Both, either, neither', html:
          tbl(['Connector', 'Meaning', 'Example'], [
            ['sowohl … als auch', 'both … and', '{{Ich lese sowohl Zeitungen als auch Blogs.}}'],
            ['nicht nur … sondern auch', 'not only … but also', '{{Er hat nicht nur ein Handy, sondern auch ein Tablet.}}'],
            ['entweder … oder', 'either … or', '{{Wir sehen entweder einen Film oder eine Serie.}}'],
            ['weder … noch', 'neither … nor', '{{Sie hat weder einen Fernseher noch ein Radio.}}'],
          ]) +
          `<p class="note">weder … noch is already negative, so add no nicht or kein. There is always a comma before sondern.</p>` },
        { h: 'zwar … aber: true, but', html:
          `<p>Use <b>zwar … aber</b> to admit one point before you make the opposite one — ideal for pros and cons.</p>
           <p>{{Das Internet ist zwar praktisch, aber es kostet viel Zeit.}}</p>
           <p>{{Die Zeitung ist zwar teuer, aber immer aktuell.}}</p>
           <p class="note">zwar sits after the verb. aber does not change the word order of its clause: aber <b>es kostet</b>, not “aber kostet es”.</p>` },
        { h: 'je … desto: the more, the more', html:
          tbl(['je + comparative', 'verb at the end', 'desto + comparative', 'verb, then subject'], [
            ['Je mehr', 'ich <b>lese</b>,', 'desto mehr', '<b>weiß</b> ich.'],
            ['Je länger', 'er <b>spielt</b>,', 'desto müder', '<b>wird</b> er.'],
          ]) +
          `<p>{{Je mehr ich lese, desto mehr weiß ich.}} · {{Je öfter man übt, desto besser spricht man.}}</p>
           <p class="note">The je-part is a subordinate clause (verb last). In the desto-part the verb follows the comparative directly.</p>` },
        { h: 'telc: giving your opinion', html:
          `<p><b>Stating an opinion</b></p>
           <ul class="phrases">
             <li>{{Meiner Meinung nach sind soziale Medien nützlich.}} <span>In my opinion social media are useful.</span></li>
             <li>{{Ich bin der Meinung, dass Kinder zu viel fernsehen.}} <span>I am of the opinion that children watch too much TV.</span></li>
             <li>{{Ich bin davon überzeugt, dass das stimmt.}} <span>I am convinced that this is true.</span></li>
           </ul>
           <p><b>Agreeing</b></p>
           <ul class="phrases">
             <li>{{Da haben Sie recht.}} <span>You are right there.</span></li>
             <li>{{Das sehe ich genauso.}} <span>I see it exactly the same way.</span></li>
           </ul>
           <p><b>Disagreeing politely</b></p>
           <ul class="phrases">
             <li>{{Das sehe ich anders.}} <span>I see that differently.</span></li>
             <li>{{Das stimmt zwar, aber man muss auch an die Nachteile denken.}} <span>That is true, but you also have to think of the disadvantages.</span></li>
           </ul>
           <p><b>Weighing pros and cons</b></p>
           <ul class="phrases">
             <li>{{Ein Vorteil ist, dass man schnell Informationen findet.}} <span>One advantage is that you find information quickly.</span></li>
             <li>{{Ein Nachteil ist, dass man viel Zeit verliert.}} <span>One disadvantage is that you lose a lot of time.</span></li>
             <li>{{Einerseits ist das praktisch, andererseits ist es teuer.}} <span>On the one hand it is practical, on the other it is expensive.</span></li>
           </ul>` },
      ],
      words: [
        n('der', 'Vorteil', 'Vorteile', 'advantage', 'Ein Vorteil ist, dass man überall erreichbar ist.', 'One advantage is that you can be reached anywhere.'),
        n('der', 'Nachteil', 'Nachteile', 'disadvantage', 'Das Handy hat nicht nur Vorteile, sondern auch Nachteile.', 'The mobile phone has not only advantages but also disadvantages.'),
        n('die', 'Werbung', '', 'advertising', 'Im Fernsehen gibt es zu viel Werbung.', 'There is too much advertising on television.'),
        n('der', 'Artikel', 'Artikel', 'article', 'Hast du den Artikel über das neue Gesetz gelesen?', 'Have you read the article about the new law?'),
        n('die', 'Schlagzeile', 'Schlagzeilen', 'headline', 'Morgens lese ich entweder die Schlagzeilen oder gar nichts.', 'In the morning I read either the headlines or nothing at all.'),
        n('der', 'Zuschauer', 'Zuschauer', 'viewer', 'Die Sendung hat jede Woche viele Zuschauer.', 'The programme has many viewers every week.'),
        n('die', 'Quelle', 'Quellen', 'source', 'Bei Nachrichten im Internet sollte man die Quelle prüfen.', 'With news on the internet you should check the source.'),
        n('die', 'Unterhaltung', '', 'entertainment', 'Für viele ist das Fernsehen nur Unterhaltung.', 'For many people television is just entertainment.'),
        n('der', 'Einfluss', 'Einflüsse', 'influence', 'Die Medien haben großen Einfluss auf unsere Meinung.', 'The media have a great influence on our opinion.'),
        n('der', 'Datenschutz', '', 'data protection', 'Datenschutz ist mir im Internet sehr wichtig.', 'Data protection is very important to me on the internet.'),
        x('sich informieren über', 'to find out about', 'Ich informiere mich im Internet über Politik.', 'I find out about politics on the internet.'),
        x('veröffentlichen', 'to publish', 'Sie veröffentlicht jede Woche ein neues Video.', 'She publishes a new video every week.'),
        x('behaupten', 'to claim', 'Er behauptet, dass er nie fernsieht.', 'He claims that he never watches television.'),
        x('überzeugen', 'to convince', 'Deine Argumente überzeugen mich nicht.', 'Your arguments do not convince me.'),
        x('zustimmen', 'to agree (with)', 'In diesem Punkt stimme ich dir zu.', 'On this point I agree with you.'),
        x('widersprechen', 'to contradict', 'Da muss ich Ihnen leider widersprechen.', 'I am afraid I have to contradict you there.'),
        x('abhängig', 'dependent; addicted', 'Manche Jugendliche sind vom Handy abhängig.', 'Some young people are addicted to their mobile phone.'),
        x('aktuell', 'current; up to date', 'Die Zeitung ist zwar teuer, aber immer aktuell.', 'The newspaper is expensive, it is true, but always up to date.'),
        x('meiner Meinung nach', 'in my opinion', 'Meiner Meinung nach lesen wir zu wenig.', 'In my opinion we read too little.'),
        x('im Gegenteil', 'on the contrary', 'Das stört mich nicht, im Gegenteil!', 'That does not bother me — on the contrary!'),
      ],
      sentences: [
        s('Ich lese sowohl Zeitungen als auch Zeitschriften.', 'I read both newspapers and magazines.', ['Ich lese sowohl Zeitschriften als auch Zeitungen.']),
        s('Er hat weder einen Fernseher noch ein Radio.', 'He has neither a television nor a radio.', ['Er hat weder ein Radio noch einen Fernseher.']),
        s('Entweder du machst das Handy aus, oder ich gehe.', 'Either you switch the phone off or I am leaving.', ['Entweder machst du das Handy aus, oder ich gehe.']),
        s('Je mehr ich lese, desto mehr weiß ich.', 'The more I read, the more I know.'),
        s('Das Internet ist zwar praktisch, aber auch gefährlich.', 'The internet is practical, it is true, but also dangerous.'),
        s('Sie schreibt nicht nur Artikel, sondern auch Bücher.', 'She writes not only articles but also books.', ['Sie schreibt nicht nur Bücher, sondern auch Artikel.']),
        s('Meiner Meinung nach sehen Kinder zu viel fern.', 'In my opinion children watch too much television.'),
        s('Je länger er spielt, desto müder wird er.', 'The longer he plays, the more tired he gets.'),
      ],
      cloze: [
        c('Sie hat weder ein Handy ___ einen Computer.', 'noch', ['oder', 'auch', 'aber'], 'She has neither a mobile phone nor a computer.', 'weder is always completed by noch.'),
        c('Je mehr Zeit er im Internet verbringt, ___ weniger schläft er.', 'desto', ['dann', 'mehr', 'als'], 'The more time he spends on the internet, the less he sleeps.', 'je + comparative is answered by desto + comparative.'),
        c('Die Sendung ist nicht nur spannend, ___ auch informativ.', 'sondern', ['aber', 'oder', 'als'], 'The programme is not only exciting but also informative.', 'nicht nur is completed by sondern auch.'),
        c('Das Handy ist ___ teuer, aber es ist sehr praktisch.', 'zwar', ['weder', 'entweder', 'sowohl'], 'The phone is expensive, it is true, but it is very practical.', 'The partner of aber is zwar: you admit a point, then object.'),
        c('Meiner Meinung ___ sollten Kinder weniger fernsehen.', 'nach', ['zu', 'von', 'für'], 'In my opinion children should watch less television.', 'Fixed phrase: meiner Meinung nach, with nach after the noun.'),
        c('Da kann ich dir nur ___: Du hast völlig recht.', 'zustimmen', ['widersprechen', 'überzeugen', 'behaupten'], 'I can only agree with you there: you are absolutely right.', 'zustimmen + dative means to agree with someone; widersprechen would mean the opposite.'),
        c('Soziale Medien haben einen großen ___ auf junge Leute.', 'Einfluss', ['Vorteil', 'Nachteil', 'Artikel'], 'Social media have a great influence on young people.', 'Collocation: Einfluss auf + accusative haben.'),
        c('Ich bin davon ___, dass Zeitungen wichtig bleiben.', 'überzeugt', ['gemeint', 'gedacht', 'einverstanden'], 'I am convinced that newspapers will remain important.', 'von etwas überzeugt sein = to be convinced of something; einverstanden goes with damit.'),
      ],
    },

    /* ----------------------------------------------------------------- 11 */
    {
      id: 'b1u11', title: 'Briefe & Beschwerden', sub: 'Letters · adjective endings, n-declension',
      goal: 'Write formal and informal e-mails — a complaint, a request, a reply — with the right adjective endings.',
      tips: [
        { h: 'Adjective endings after der and ein', html:
          tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
            ['<b>Nom.</b>', 'der neu<b>e</b> · ein neu<b>er</b>', 'die / eine neu<b>e</b>', 'das neu<b>e</b> · ein neu<b>es</b>', 'die neu<b>en</b>'],
            ['<b>Acc.</b>', 'den / einen neu<b>en</b>', 'die / eine neu<b>e</b>', 'das neu<b>e</b> · ein neu<b>es</b>', 'die neu<b>en</b>'],
            ['<b>Dat.</b>', 'dem / einem neu<b>en</b>', 'der / einer neu<b>en</b>', 'dem / einem neu<b>en</b>', 'den neu<b>en</b>'],
            ['<b>Gen.</b>', 'des / eines neu<b>en</b>', 'der / einer neu<b>en</b>', 'des / eines neu<b>en</b>', 'der neu<b>en</b>'],
          ]) +
          `<p>{{Ich habe einen neuen Drucker bestellt.}} · {{Das ist ein neues Gerät.}} · {{mit der neuen Kollegin}}</p>
           <p class="note">Rule of thumb: <b>-en</b> almost everywhere. Only the nominative singular and the feminine and neuter accusative take -e — and after ein the adjective has to show the gender itself: ein neu<b>er</b>, ein neu<b>es</b>.</p>` },
        { h: 'No article: the adjective does the work', html:
          `<p>Without an article, the adjective takes the ending the article would have had (de<b>r</b> → -er, da<b>s</b> → -es, de<b>m</b> → -em, de<b>n</b> → -en).</p>
           <p>{{Mit freundlichen Grüßen}} <small>(mit den → -en)</small> · {{Sehr geehrte Damen und Herren}} <small>(die → -e)</small></p>
           <p>{{Lieber Bob}} · {{Liebe Alice}} · {{Vielen Dank}} <small>(den → -en)</small> · {{mit großem Interesse}} <small>(dem → -em)</small></p>
           <p class="note">Learn the letter formulas as fixed chunks and you already know the pattern. One exception: the masculine and neuter genitive takes -en ({{trotz schlechten Wetters}}).</p>` },
        { h: 'n-declension: der Kunde, den Kunden', html:
          `<p>A small group of masculine nouns adds <b>-n</b> or <b>-en</b> in every form except the nominative singular.</p>` +
          tbl(['Nom.', 'Acc.', 'Dat.', 'Gen.'], [
            ['der Kunde', 'den Kunde<b>n</b>', 'dem Kunde<b>n</b>', 'des Kunde<b>n</b>'],
            ['der Kollege', 'den Kollege<b>n</b>', 'dem Kollege<b>n</b>', 'des Kollege<b>n</b>'],
            ['der Herr', 'den Herr<b>n</b>', 'dem Herr<b>n</b>', 'des Herr<b>n</b>'],
          ]) +
          `<p>{{Ich habe mit dem Kunden gesprochen.}} · {{Kennst du den neuen Kollegen?}} · {{Fragen Sie bitte den Herrn am Empfang.}}</p>
           <p class="note">Members: masculine nouns for people ending in -e (der Junge), in -ent, -ist, -ant (der Student, der Polizist, der Praktikant), plus der Nachbar and der Mensch.</p>` },
        { h: 'telc: writing a letter or e-mail', html:
          tbl(['', 'Formal (Sie)', 'Informal (du)'], [
            ['<b>Salutation</b>', '{{Sehr geehrte Damen und Herren,}}', '{{Liebe Alice,}} · {{Lieber Bob,}}'],
            ['<b>Reason</b>', '{{ich schreibe Ihnen, weil ich eine Frage habe.}}', '{{vielen Dank für deine E-Mail.}}'],
            ['<b>Request</b>', '{{Könnten Sie mir bitte mitteilen, wann der Kurs beginnt?}}', '{{Kannst du mir bitte helfen?}}'],
            ['<b>Complaint</b>', '{{Leider muss ich mich über die Lieferung beschweren.}} · {{Ich erwarte, dass Sie mir das Geld erstatten.}}', '{{Ehrlich gesagt war ich etwas enttäuscht.}}'],
            ['<b>Closing</b>', '{{Ich freue mich auf Ihre Antwort.}} · {{Vielen Dank im Voraus.}}', '{{Ich freue mich auf deine Antwort.}} · {{Bis bald!}}'],
            ['<b>Sign-off</b>', '{{Mit freundlichen Grüßen}}', '{{Viele Grüße}} · {{Liebe Grüße}}'],
          ]) +
          `<p class="note">After the comma of the salutation the letter continues in lower case. Sie, Ihnen and Ihr are always written with a capital.</p>` },
      ],
      words: [
        n('die', 'Beschwerde', 'Beschwerden', 'complaint', 'Auf meine Beschwerde habe ich keine Antwort bekommen.', 'I received no answer to my complaint.'),
        n('die', 'Anfrage', 'Anfragen', 'enquiry', 'Vielen Dank für Ihre freundliche Anfrage.', 'Thank you very much for your kind enquiry.'),
        n('der', 'Kunde', 'Kunden', 'customer', 'Der Chef spricht gerade mit einem wichtigen Kunden.', 'The boss is talking to an important customer right now.'),
        n('die', 'Lieferung', 'Lieferungen', 'delivery', 'Die Lieferung ist mit großer Verspätung angekommen.', 'The delivery arrived very late.'),
        n('der', 'Mangel', 'Mängel', 'defect; fault', 'Das Gerät hat einen technischen Mangel.', 'The device has a technical defect.'),
        n('die', 'Garantie', 'Garantien', 'guarantee; warranty', 'Die Waschmaschine hat noch Garantie.', 'The washing machine is still under guarantee.'),
        n('der', 'Betreff', '', 'subject line', 'Schreiben Sie bitte die Kundennummer in den Betreff.', 'Please write the customer number in the subject line.'),
        n('der', 'Anhang', 'Anhänge', 'attachment', 'Im Anhang finden Sie eine Kopie der Rechnung.', 'In the attachment you will find a copy of the invoice.'),
        n('der', 'Ersatz', '', 'replacement', 'Ich bitte Sie um schnellen Ersatz.', 'I ask you for a quick replacement.'),
        x('sich beschweren über', 'to complain about', 'Er beschwert sich über den unfreundlichen Kellner.', 'He complains about the unfriendly waiter.'),
        x('erhalten', 'to receive', 'Ich habe Ihre Rechnung gestern erhalten.', 'I received your invoice yesterday.'),
        x('mitteilen', 'to inform; to tell', 'Bitte teilen Sie mir den neuen Termin mit.', 'Please inform me of the new date.'),
        x('bitten um', 'to ask for', 'Ich bitte um eine schnelle Antwort.', 'I ask for a quick reply.'),
        x('sich wenden an', 'to turn to; to contact', 'Bitte wenden Sie sich an unseren Kundenservice.', 'Please contact our customer service.'),
        x('erstatten', 'to refund', 'Die Firma erstattet mir den vollen Preis.', 'The company is refunding me the full price.'),
        x('beschädigt', 'damaged', 'Das Paket ist leider beschädigt angekommen.', 'Unfortunately the parcel arrived damaged.'),
        x('dringend', 'urgent; urgently', 'Ich brauche dringend eine Antwort.', 'I urgently need an answer.'),
        x('im Voraus', 'in advance', 'Vielen Dank im Voraus für Ihre Hilfe.', 'Thank you in advance for your help.'),
        x('Sehr geehrte Damen und Herren', 'Dear Sir or Madam'),
        x('Mit freundlichen Grüßen', 'Yours sincerely'),
      ],
      sentences: [
        s('Ich habe bei Ihnen einen neuen Drucker bestellt.', 'I ordered a new printer from you.', ['Bei Ihnen habe ich einen neuen Drucker bestellt.', 'Ich habe einen neuen Drucker bei Ihnen bestellt.']),
        s('Leider hat das neue Gerät einen Mangel.', 'Unfortunately the new device has a defect.', ['Das neue Gerät hat leider einen Mangel.']),
        s('Vielen Dank für Ihre schnelle Antwort.', 'Thank you very much for your quick reply.'),
        s('Ich habe gestern mit dem Kunden telefoniert.', 'I spoke to the customer on the phone yesterday.', ['Gestern habe ich mit dem Kunden telefoniert.', 'Mit dem Kunden habe ich gestern telefoniert.']),
        s('Ich möchte mich über den schlechten Service beschweren.', 'I would like to complain about the bad service.'),
        s('Kennst du den neuen Kollegen schon?', 'Do you already know the new colleague?', ['Kennst du schon den neuen Kollegen?']),
        s('Ich freue mich auf Ihre baldige Antwort.', 'I look forward to your prompt reply.'),
        s('Ich bitte Sie um schnelle Hilfe.', 'I ask you for quick help.'),
      ],
      cloze: [
        c('Sehr ___ Damen und Herren,', 'geehrte', ['geehrten', 'geehrter', 'geehrtes'], 'Dear Sir or Madam,', 'No article, nominative plural: the adjective takes -e, like die.'),
        c('Mit ___ Grüßen', 'freundlichen', ['freundliche', 'freundlicher', 'freundlichem'], 'Yours sincerely', 'mit + dative plural without an article: -en, like den.'),
        c('Ich habe bei Ihnen ein ___ Handy gekauft.', 'neues', ['neue', 'neuen', 'neuer'], 'I bought a new mobile phone from you.', 'After ein, a neuter noun in the accusative needs -es on the adjective.'),
        c('Haben Sie schon mit dem ___ gesprochen?', 'Kunden', ['Kunde', 'Kundes', 'Kundin'], 'Have you already spoken to the customer?', 'der Kunde follows the n-declension: every form except the nominative singular ends in -n.'),
        c('Der Brief ist für den ___ im dritten Stock.', 'Herrn', ['Herr', 'Herrs', 'Herrin'], 'The letter is for the gentleman on the third floor.', 'der Herr follows the n-declension: den Herrn in the accusative singular.'),
        c('Leider muss ich mich ___ Ihren Service beschweren.', 'über', ['auf', 'für', 'an'], 'Unfortunately I have to complain about your service.', 'The verb is sich beschweren über + accusative.'),
        c('Ich bitte Sie ___ eine schnelle Antwort.', 'um', ['für', 'nach', 'auf'], 'I ask you for a quick reply.', 'The verb is bitten um + accusative.'),
        c('Vielen Dank im ___ für Ihre Mühe.', 'Voraus', ['Vorher', 'Vorne', 'Anfang'], 'Thank you in advance for your trouble.', 'Fixed phrase: im Voraus = in advance.'),
      ],
    },

    /* ----------------------------------------------------------------- 12 */
    {
      id: 'b1u12', title: 'Gemeinsam planen', sub: 'Planning together · Futur I, lassen',
      goal: 'Plan an event or a trip with someone: suggest, agree, object politely and share out the tasks.',
      tips: [
        { h: 'Making suggestions', html:
          tbl(['Phrase', 'What follows', 'Example'], [
            ['Wie wäre es, wenn …?', 'clause, verb last', '{{Wie wäre es, wenn wir grillen?}}'],
            ['Wie wäre es mit …?', 'noun in the dative', '{{Wie wäre es mit einem Picknick?}}'],
            ['Ich schlage vor, dass …', 'clause, verb last', '{{Ich schlage vor, dass wir am Samstag feiern.}}'],
            ['Wir könnten …', 'infinitive at the end', '{{Wir könnten einen Ausflug machen.}}'],
            ['Lass uns …!', 'infinitive at the end', '{{Lass uns ins Kino gehen!}}'],
          ]) +
          `<p class="note">wäre and könnten are Konjunktiv II: they turn a plan into a polite offer instead of a decision.</p>` },
        { h: 'Futur I: werden + infinitive', html:
          `<p><b>werden</b> stands in position 2, the infinitive goes to the end: ich werde · du wirst · er / sie / es wird · wir werden · ihr werdet · sie / Sie werden.</p>
           <p><b>Plans and promises:</b> {{Ich werde die Getränke besorgen.}} · {{Wir werden nächstes Jahr umziehen.}}</p>
           <p><b>Assumptions</b>, usually with wohl or wahrscheinlich — even about right now: {{Er wird wohl im Stau stehen.}} (He is probably stuck in traffic.)</p>
           <p class="note">With a time word the present tense is usually enough: {{Morgen kaufe ich die Getränke.}}</p>` },
        { h: 'lassen: have something done', html:
          `<p><b>lassen</b> + infinitive at the end means you do not do it yourself — someone does it for you.</p>
           <p>{{Ich repariere mein Auto.}} (myself) → {{Ich lasse mein Auto reparieren.}} (at the garage)</p>
           <p>{{Wir lassen die Einladungen drucken.}} · {{Sie lässt sich die Haare schneiden.}}</p>
           <p class="note">lassen changes its vowel: du lässt, er lässt. It also means “let” and “leave”: {{Lass mich das machen!}} · {{Ich lasse das Auto heute zu Hause.}}</p>` },
        { h: 'telc: planning together', html:
          `<p><b>Proposing</b></p>
           <ul class="phrases">
             <li>{{Wie wäre es, wenn wir im Park feiern?}} <span>How about celebrating in the park?</span></li>
             <li>{{Was hältst du davon?}} <span>What do you think of that?</span></li>
           </ul>
           <p><b>Agreeing</b></p>
           <ul class="phrases">
             <li>{{Gute Idee, das machen wir so.}} <span>Good idea, let us do it that way.</span></li>
             <li>{{Damit bin ich einverstanden.}} <span>I agree with that.</span></li>
           </ul>
           <p><b>Objecting politely</b></p>
           <ul class="phrases">
             <li>{{Das ist keine schlechte Idee, aber es ist ziemlich teuer.}} <span>That is not a bad idea, but it is rather expensive.</span></li>
             <li>{{Wäre es nicht besser, früher anzufangen?}} <span>Would it not be better to start earlier?</span></li>
             <li>{{Ich weiß nicht, ob das klappt.}} <span>I do not know whether that will work.</span></li>
           </ul>
           <p><b>Dividing tasks</b></p>
           <ul class="phrases">
             <li>{{Wer kümmert sich um die Getränke?}} <span>Who is taking care of the drinks?</span></li>
             <li>{{Ich übernehme den Einkauf.}} <span>I will take on the shopping.</span></li>
             <li>{{Könntest du die Musik besorgen?}} <span>Could you get the music?</span></li>
           </ul>
           <p><b>Summarising</b></p>
           <ul class="phrases">
             <li>{{Also, wir machen es so: Du kaufst ein und ich koche.}} <span>So, we will do it like this: you shop and I cook.</span></li>
             <li>{{Gut, dann sind wir uns einig.}} <span>Good, then we agree.</span></li>
           </ul>` },
      ],
      words: [
        n('die', 'Veranstaltung', 'Veranstaltungen', 'event', 'Zu der Veranstaltung werden viele Gäste kommen.', 'Many guests will come to the event.'),
        n('die', 'Entscheidung', 'Entscheidungen', 'decision', 'Wir müssen bald eine Entscheidung treffen.', 'We have to make a decision soon.'),
        n('die', 'Gesellschaft', 'Gesellschaften', 'society', 'In unserer Gesellschaft leben viele Kulturen zusammen.', 'Many cultures live together in our society.'),
        n('die', 'Gelegenheit', 'Gelegenheiten', 'opportunity; occasion', 'Das Fest ist eine gute Gelegenheit, die Nachbarn kennenzulernen.', 'The party is a good opportunity to get to know the neighbours.'),
        n('der', 'Ablauf', 'Abläufe', 'schedule; order of events', 'Wir müssen noch den Ablauf des Abends planen.', 'We still have to plan the schedule for the evening.'),
        n('der', 'Treffpunkt', 'Treffpunkte', 'meeting point', 'Der Treffpunkt ist um neun Uhr vor dem Bahnhof.', 'The meeting point is at nine o’clock in front of the station.'),
        n('die', 'Unterkunft', 'Unterkünfte', 'accommodation', 'Wir suchen noch eine günstige Unterkunft für die Gruppe.', 'We are still looking for cheap accommodation for the group.'),
        n('die', 'Vorbereitung', 'Vorbereitungen', 'preparation', 'Die Vorbereitung des Festes dauert zwei Wochen.', 'The preparation of the party takes two weeks.'),
        x('erledigen', 'to get (something) done', 'Ich werde das bis Freitag erledigen.', 'I will get that done by Friday.'),
        x('organisieren', 'to organise', 'Wer organisiert die Musik für die Feier?', 'Who is organising the music for the party?'),
        x('besorgen', 'to get; to buy', 'Ich werde die Getränke besorgen.', 'I will get the drinks.'),
        x('übernehmen', 'to take on', 'Kannst du die Einladungen übernehmen?', 'Can you take on the invitations?'),
        x('sich einigen auf', 'to agree on', 'Wir haben uns auf Samstag geeinigt.', 'We have agreed on Saturday.'),
        x('lassen', 'to let; to have done', 'Wir lassen die Einladungen drucken.', 'We are having the invitations printed.'),
        x('teilnehmen an', 'to take part in', 'Wie viele Leute nehmen an dem Ausflug teil?', 'How many people are taking part in the trip?'),
        x('stattfinden', 'to take place', 'Das Fest findet im Garten statt.', 'The party is taking place in the garden.'),
        x('wahrscheinlich', 'probably', 'Sie wird wahrscheinlich später kommen.', 'She will probably come later.'),
        x('dafür sein', 'to be in favour', 'Ich bin dafür, dass wir im Garten feiern.', 'I am in favour of celebrating in the garden.'),
        x('gemeinsam', 'jointly; together', 'Lass uns das Geschenk gemeinsam kaufen.', 'Let us buy the present together.'),
        x('auf jeden Fall', 'definitely; in any case', 'Ich komme auf jeden Fall mit.', 'I am definitely coming along.'),
      ],
      sentences: [
        s('Wie wäre es, wenn wir am Samstag grillen?', 'How about having a barbecue on Saturday?'),
        s('Ich schlage vor, dass wir einen Ausflug machen.', 'I suggest that we go on a trip.'),
        s('Wir könnten zusammen ein Geschenk kaufen.', 'We could buy a present together.', ['Wir könnten ein Geschenk zusammen kaufen.', 'Zusammen könnten wir ein Geschenk kaufen.']),
        s('Ich werde mich um die Getränke kümmern.', 'I will take care of the drinks.'),
        s('Er wird wohl noch im Stau stehen.', 'He is probably still stuck in traffic.'),
        s('Ich lasse morgen mein Auto reparieren.', 'I am having my car repaired tomorrow.', ['Morgen lasse ich mein Auto reparieren.', 'Ich lasse mein Auto morgen reparieren.']),
        s('Lass uns morgen noch einmal darüber sprechen.', 'Let us talk about it again tomorrow.', ['Lass uns darüber morgen noch einmal sprechen.']),
        s('Nächstes Jahr werden wir nach Spanien fahren.', 'Next year we will go to Spain.', ['Wir werden nächstes Jahr nach Spanien fahren.']),
      ],
      cloze: [
        c('Wie ___ es, wenn wir zusammen kochen?', 'wäre', ['würde', 'hätte', 'wird'], 'How about cooking together?', 'Fixed suggestion formula: Wie wäre es, wenn …? (Konjunktiv II of sein).'),
        c('Ich schlage vor, ___ wir uns um acht Uhr treffen.', 'dass', ['wenn', 'ob', 'weil'], 'I suggest that we meet at eight o’clock.', 'vorschlagen is followed by a dass-clause with the verb at the end.'),
        c('Mach dir keine Sorgen, er ___ wohl gleich kommen.', 'wird', ['ist', 'hat', 'wurde'], 'Do not worry, he will probably come in a moment.', 'An assumption: werden (present) + wohl + infinitive.'),
        c('Mein Fahrrad ist kaputt. Ich ___ es morgen reparieren.', 'lasse', ['mache', 'bringe', 'gebe'], 'My bike is broken. I am having it repaired tomorrow.', 'To have something done by someone else is lassen + infinitive.'),
        c('Wir ___ am Wochenende einen Ausflug machen.', 'könnten', ['hätten', 'wären', 'gäben'], 'We could go on a trip at the weekend.', 'A polite suggestion uses könnten + infinitive at the end.'),
        c('Das Konzert ___ wegen des Regens in der Halle statt.', 'findet', ['nimmt', 'steht', 'gibt'], 'Because of the rain the concert is taking place in the hall.', 'The separable verb is stattfinden: findet … statt.'),
        c('Wie viele Kollegen nehmen ___ der Feier teil?', 'an', ['in', 'bei', 'zu'], 'How many colleagues are taking part in the party?', 'The verb is teilnehmen an + dative.'),
        c('Gut, dann sind wir uns ___: Wir feiern am Samstag.', 'einig', ['einverstanden', 'gemeinsam', 'zusammen'], 'Good, then we agree: we are celebrating on Saturday.', 'Fixed phrase: sich einig sein; einverstanden is used without uns.'),
      ],
    },
  ]);

  root.DE_DATA.addSheets('b1', [
    { title: 'Connectors and word order', html:
      tbl(['Type', 'Connectors', 'Example'], [
        ['<b>Position 0</b><br><small>verb stays second</small>', 'und · aber · oder · denn · sondern', '{{Ich bleibe zu Hause, denn ich bin krank.}}'],
        ['<b>Position 1</b><br><small>verb next, then subject</small>', 'deshalb · deswegen · darum · trotzdem · dann · außerdem · sonst', '{{Ich bin krank, deshalb bleibe ich zu Hause.}}'],
        ['<b>Verb to the end</b><br><small>subordinate clause</small>', 'weil · obwohl · dass · wenn · als · ob · damit · bevor · nachdem · während · bis', '{{Ich bleibe zu Hause, weil ich krank bin.}}'],
      ]) +
      `<p class="note">A subordinate clause in first place counts as position 1, so the main verb follows the comma: {{Obwohl ich krank bin, gehe ich arbeiten.}}</p>` +
      tbl(['Two-part connector', 'Meaning', 'Example'], [
        ['sowohl … als auch', 'both … and', '{{Sie spricht sowohl Deutsch als auch Englisch.}}'],
        ['nicht nur … sondern auch', 'not only … but also', '{{Er ist nicht nur müde, sondern auch krank.}}'],
        ['entweder … oder', 'either … or', '{{Wir fahren entweder heute oder morgen.}}'],
        ['weder … noch', 'neither … nor', '{{Ich habe weder Zeit noch Geld.}}'],
        ['zwar … aber', 'true … but', '{{Das Auto ist zwar alt, aber es fährt gut.}}'],
        ['je … desto', 'the more … the more', '{{Je mehr ich übe, desto besser spreche ich.}}'],
      ]) },

    { title: 'Genitive', html:
      tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['<b>the</b>', g('der', 'des') + ' Vater<b>s</b>', g('die', 'der') + ' Mutter', g('das', 'des') + ' Kind<b>es</b>', 'der Kinder'],
        ['<b>a</b>', g('der', 'eines') + ' Vater<b>s</b>', g('die', 'einer') + ' Mutter', g('das', 'eines') + ' Kind<b>es</b>', '–'],
        ['<b>my · no</b>', g('der', 'meines') + ' Vater<b>s</b>', g('die', 'meiner') + ' Mutter', g('das', 'meines') + ' Kind<b>es</b>', 'meiner Kinder'],
      ]) +
      `<p class="note">Masculine and neuter nouns add -s, short ones usually -es ({{des Jahres}}, {{des Amtes}}). An adjective after the article always ends in -en: {{trotz des schlechten Wetters}}. In speech, von + dative often replaces the genitive: {{das Auto von meinem Bruder}}.</p>` +
      tbl(['Preposition', 'Meaning', 'Example'], [
        ['wegen', 'because of', '{{wegen des Wetters}}'],
        ['trotz', 'in spite of', '{{trotz der Kälte}}'],
        ['während', 'during', '{{während des Urlaubs}}'],
        ['innerhalb', 'within', '{{innerhalb eines Monats}}'],
        ['außerhalb', 'outside (of)', '{{außerhalb der Stadt}}'],
        ['statt', 'instead of', '{{statt eines Briefes}}'],
      ]) },

    { title: 'Verbs with fixed prepositions', html:
      tbl(['Verb', 'Case', 'Example'], [
        ['warten auf', 'acc.', '{{Ich warte auf den Bus.}}'],
        ['sich freuen auf', 'acc.', '{{Ich freue mich auf den Urlaub.}}'],
        ['achten auf', 'acc.', '{{Achte auf deine Gesundheit!}}'],
        ['sich verlassen auf', 'acc.', '{{Ich verlasse mich auf dich.}}'],
        ['sich freuen über', 'acc.', '{{Ich freue mich über das Geschenk.}}'],
        ['sich ärgern über', 'acc.', '{{Er ärgert sich über den Lärm.}}'],
        ['sich beschweren über', 'acc.', '{{Sie beschwert sich über das Essen.}}'],
        ['sprechen über', 'acc.', '{{Wir sprechen über den Film.}}'],
        ['denken an', 'acc.', '{{Ich denke an dich.}}'],
        ['sich erinnern an', 'acc.', '{{Erinnerst du dich an ihn?}}'],
        ['sich gewöhnen an', 'acc.', '{{Ich gewöhne mich an das Wetter.}}'],
        ['sich interessieren für', 'acc.', '{{Sie interessiert sich für Musik.}}'],
        ['sich entschuldigen für', 'acc.', '{{Ich entschuldige mich für den Fehler.}}'],
        ['bitten um', 'acc.', '{{Darf ich dich um einen Gefallen bitten?}}'],
        ['sich kümmern um', 'acc.', '{{Er kümmert sich um die Kinder.}}'],
        ['träumen von', 'dat.', '{{Sie träumt von einer Reise.}}'],
        ['erzählen von', 'dat.', '{{Er erzählt von seinem Urlaub.}}'],
        ['abhängen von', 'dat.', '{{Das hängt vom Wetter ab.}}'],
        ['teilnehmen an', 'dat.', '{{Ich nehme an dem Kurs teil.}}'],
        ['sprechen mit', 'dat.', '{{Ich spreche mit dem Chef.}}'],
        ['fragen nach', 'dat.', '{{Sie fragt nach dem Weg.}}'],
        ['leiden unter', 'dat.', '{{Er leidet unter dem Stress.}}'],
        ['Angst haben vor', 'dat.', '{{Ich habe Angst vor der Prüfung.}}'],
      ]) +
      `<p><b>da- and wo-compounds</b></p>` +
      tbl(['', 'Statement', 'Short form', 'Question'], [
        ['<b>Thing</b>', '{{Ich warte auf den Bus.}}', '{{Ich warte darauf.}}', '{{Worauf wartest du?}}'],
        ['<b>Person</b>', '{{Ich warte auf meine Kollegin.}}', '{{Ich warte auf sie.}}', '{{Auf wen wartest du?}}'],
      ]) +
      `<p class="note">An extra r is added before a vowel: {{darauf}}, {{darüber}}, {{daran}}, {{worum}} — but {{dafür}}, {{davon}}, {{damit}}, {{wonach}}.</p>` },

    { title: 'Adjective endings and n-declension', html:
      `<p><b>After der, die, das</b> (also dieser, jeder, welcher)</p>` +
      tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['<b>Nom.</b>', 'der neu<b>e</b> Tisch', 'die neu<b>e</b> Lampe', 'das neu<b>e</b> Auto', 'die neu<b>en</b> Autos'],
        ['<b>Acc.</b>', 'den neu<b>en</b> Tisch', 'die neu<b>e</b> Lampe', 'das neu<b>e</b> Auto', 'die neu<b>en</b> Autos'],
        ['<b>Dat.</b>', 'dem neu<b>en</b> Tisch', 'der neu<b>en</b> Lampe', 'dem neu<b>en</b> Auto', 'den neu<b>en</b> Autos'],
        ['<b>Gen.</b>', 'des neu<b>en</b> Tisches', 'der neu<b>en</b> Lampe', 'des neu<b>en</b> Autos', 'der neu<b>en</b> Autos'],
      ]) +
      `<p><b>After ein, kein, mein</b></p>` +
      tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['<b>Nom.</b>', 'ein neu<b>er</b> Tisch', 'eine neu<b>e</b> Lampe', 'ein neu<b>es</b> Auto', 'keine neu<b>en</b> Autos'],
        ['<b>Acc.</b>', 'einen neu<b>en</b> Tisch', 'eine neu<b>e</b> Lampe', 'ein neu<b>es</b> Auto', 'keine neu<b>en</b> Autos'],
        ['<b>Dat.</b>', 'einem neu<b>en</b> Tisch', 'einer neu<b>en</b> Lampe', 'einem neu<b>en</b> Auto', 'keinen neu<b>en</b> Autos'],
        ['<b>Gen.</b>', 'eines neu<b>en</b> Tisches', 'einer neu<b>en</b> Lampe', 'eines neu<b>en</b> Autos', 'keiner neu<b>en</b> Autos'],
      ]) +
      `<p><b>No article</b></p>` +
      tbl(['', g('der', 'masculine'), g('die', 'feminine'), g('das', 'neuter'), 'plural'], [
        ['<b>Nom.</b>', 'gut<b>er</b> Wein', 'frisch<b>e</b> Milch', 'kalt<b>es</b> Wasser', 'neu<b>e</b> Autos'],
        ['<b>Acc.</b>', 'gut<b>en</b> Wein', 'frisch<b>e</b> Milch', 'kalt<b>es</b> Wasser', 'neu<b>e</b> Autos'],
        ['<b>Dat.</b>', 'gut<b>em</b> Wein', 'frisch<b>er</b> Milch', 'kalt<b>em</b> Wasser', 'neu<b>en</b> Autos'],
        ['<b>Gen.</b>', 'gut<b>en</b> Weines', 'frisch<b>er</b> Milch', 'kalt<b>en</b> Wassers', 'neu<b>er</b> Autos'],
      ]) +
      `<p class="note">Letter formulas are the no-article table in action: {{Sehr geehrte Damen und Herren}} · {{Mit freundlichen Grüßen}} · {{Vielen Dank}}.</p>
       <p><b>n-declension</b></p>` +
      tbl(['', 'Nom.', 'Acc.', 'Dat.', 'Gen.', 'Plural'], [
        ['customer', 'der Kunde', 'den Kunde<b>n</b>', 'dem Kunde<b>n</b>', 'des Kunde<b>n</b>', 'die Kunden'],
        ['colleague', 'der Kollege', 'den Kollege<b>n</b>', 'dem Kollege<b>n</b>', 'des Kollege<b>n</b>', 'die Kollegen'],
        ['gentleman', 'der Herr', 'den Herr<b>n</b>', 'dem Herr<b>n</b>', 'des Herr<b>n</b>', 'die Herren'],
        ['student', 'der Student', 'den Student<b>en</b>', 'dem Student<b>en</b>', 'des Student<b>en</b>', 'die Studenten'],
      ]) +
      `<p class="note">Only masculine nouns: people ending in -e (der Junge, der Kollege), in -ent, -ist, -ant (der Student, der Polizist, der Praktikant), plus der Herr, der Nachbar and der Mensch.</p>` },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
