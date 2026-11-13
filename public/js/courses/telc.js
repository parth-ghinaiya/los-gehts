/* telc exam overviews, shown first in the A2 and B1 grammar sheets.
   Figures come from telc's own exam pages and published practice tests; formats differ
   between exam variants, so each sheet tells the learner to confirm on telc.net. */
(function (root) {
  'use strict';
  const { tbl } = root.DE_BUILD;

  const caveat = `<p class="note">Taken from telc’s exam description and practice test for the standard exam. Other variants
    (for example the school or work versions, or the combined A2·B1 test) are built differently, and details can change.
    Check <b>telc.net</b> for your exact exam, the pass mark and current practice tests before you register.</p>`;

  root.DE_DATA.addSheets('a2', [
    { exam: true, title: 'telc Deutsch A2: the exam at a glance', html:
      tbl(['Part', 'What you do', 'Time'], [
        ['<b>Hören</b><br><small>listening</small>', 'Three parts.', 'about 20 min'],
        ['<b>Lesen</b><br><small>reading</small>', 'Three parts.', '50 min'],
        ['<b>Schreiben</b><br><small>writing</small>', 'Two parts.', ''],
        ['<b>Sprechen</b><br><small>speaking</small>', 'Three parts, usually with one other candidate. No preparation time.', 'about 15 min'],
      ]) +
      `<p><b>How this course maps to it</b></p>
       <ul class="phrases">
         <li><b>Gap-fill questions</b> in every unit train the grammar and word choice the reading and writing parts depend on.</li>
         <li><b>Sentence building</b> trains word order for the written message.</li>
         <li>Each unit ends its key ideas with a <b>telc tip</b>: ready-made phrases for speaking and writing on that topic.</li>
         <li>Units 8 and 12 practise writing a short message and agreeing on a date with a partner.</li>
         <li>The exam cannot be taken in parts: all sections are sat together.</li>
       </ul>` + caveat },
  ]);

  root.DE_DATA.addSheets('b1', [
    { exam: true, title: 'telc Deutsch B1: the exam at a glance', html:
      tbl(['Part', 'What you do', 'Time', 'Points'], [
        ['<b>Leseverstehen</b><br><small>reading</small>', 'Three parts with matching and multiple-choice tasks.', 'reading and Sprachbausteine: 90 min', '75'],
        ['<b>Sprachbausteine</b><br><small>language elements</small>', 'Two gap-fill texts with ten gaps each: one on grammar, one on vocabulary.', '', '30'],
        ['<b>Hörverstehen</b><br><small>listening</small>', 'Three parts.', 'about 30 min', '75'],
        ['<b>Schriftlicher Ausdruck</b><br><small>writing</small>', 'One letter or e-mail.', '30 min', '45'],
        ['<b>Mündliche Prüfung</b><br><small>speaking</small>', 'In pairs, after 20 minutes of preparation: <i>Einander kennenlernen</i>, <i>Über ein Thema sprechen</i>, <i>Gemeinsam etwas planen</i>.', 'about 15 min', '75'],
      ]) +
      `<p>300 points in total: 225 for the written exam and 75 for the oral exam.</p>
       <p><b>How this course maps to it</b></p>
       <ul class="phrases">
         <li><b>Gap-fill questions</b> are Sprachbausteine practice: every unit has eight, mixing grammar and vocabulary.</li>
         <li><b>Sentence building</b> trains verb position in main and subordinate clauses, which the letter is marked on.</li>
         <li>Each unit ends its key ideas with a <b>telc tip</b>: phrases you can reuse in the letter and in the oral exam.</li>
         <li>Unit 10 prepares <i>Über ein Thema sprechen</i>, unit 11 the letter, unit 12 <i>Gemeinsam etwas planen</i>.</li>
       </ul>` + caveat },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
