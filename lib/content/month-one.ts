import type { LessonDefinition } from './lessons';
import type { VocabularyItem } from './vocabulary';

type Phrase = [tagalog: string, english: string];

type LessonSeed = {
  number: number;
  topic: string;
  title: string;
  description: string;
  grammarTitle: string;
  phrases: [Phrase, Phrase, Phrase, Phrase, Phrase, Phrase];
  tip: string;
  story: [title: string, tagalog: string, english: string];
  speakingPrompt: string;
};

const seeds: LessonSeed[] = [
  {
    number: 4, topic: 'Family', title: 'Talking about your family', description: 'Introduce close family members and say who someone is.', grammarTitle: 'Si and ang for people',
    phrases: [['pamilya', 'family'], ['nanay', 'mother'], ['tatay', 'father'], ['kapatid', 'sibling'], ['anak', 'child'], ['asawa', 'spouse']],
    tip: 'Use si before one person’s name: Si Ana ang kapatid ko.',
    story: ['Ang Pamilya ni Ben', 'Maliit ang pamilya ni Ben. Kasama niya ang nanay, tatay, at kapatid niya. Nakatira sa Cebu ang asawa ng kapatid niya.', 'Ben’s family is small. He lives with his mother, father, and sibling. His sibling’s spouse lives in Cebu.'],
    speakingPrompt: 'Sino ang kasama mo sa pamilya?',
  },
  {
    number: 5, topic: 'Numbers', title: 'Counting and sharing quantities', description: 'Count everyday objects and ask how many there are.', grammarTitle: 'Ilan and counting',
    phrases: [['isa', 'one'], ['dalawa', 'two'], ['tatlo', 'three'], ['apat', 'four'], ['lima', 'five'], ['ilan?', 'how many?']],
    tip: 'Use ilan to ask “how many?”: Ilan ang libro?',
    story: ['Sa Mesa', 'May limang mangga sa mesa. Kumuha si Liza ng dalawa. Tatlong mangga pa ang natira.', 'There are five mangoes on the table. Liza took two. Three mangoes remain.'],
    speakingPrompt: 'Ilan ang nakikita mo sa paligid mo?',
  },
  {
    number: 6, topic: 'Time', title: 'Telling the time', description: 'Ask for the time and describe a simple schedule.', grammarTitle: 'Alas and time expressions',
    phrases: [['anong oras?', 'what time?'], ['alas-otso', 'eight o’clock'], ['umaga', 'morning'], ['tanghali', 'noon'], ['hapon', 'afternoon'], ['gabi', 'evening']],
    tip: 'Use ng before a time when saying when something happens: ng alas-otso.',
    story: ['Iskedyul ni Mara', 'Gumigising si Mara ng alas-sais ng umaga. Kumakain siya sa tanghali at umuuwi ng alas-singko ng hapon.', 'Mara wakes at six in the morning. She eats at noon and goes home at five in the afternoon.'],
    speakingPrompt: 'Anong oras ka gumigising at umuuwi?',
  },
  {
    number: 7, topic: 'Calendar', title: 'Days and dates', description: 'Talk about today, tomorrow, and plans during the week.', grammarTitle: 'Ngayon, bukas, and kahapon',
    phrases: [['ngayon', 'today / now'], ['bukas', 'tomorrow'], ['kahapon', 'yesterday'], ['Lunes', 'Monday'], ['Sabado', 'Saturday'], ['linggo', 'week']],
    tip: 'Context tells you whether linggo means “week” or Sunday; Linggo with a capital L is Sunday.',
    story: ['Plano sa Sabado', 'Lunes ngayon. Nagtatrabaho si Carlo buong linggo. Sa Sabado, pupunta siya sa bahay ng kaibigan niya.', 'Today is Monday. Carlo works all week. On Saturday, he will go to his friend’s house.'],
    speakingPrompt: 'Ano ang gagawin mo bukas?',
  },
  {
    number: 8, topic: 'Home', title: 'Describing your home', description: 'Name rooms and say where things are.', grammarTitle: 'May and nasa',
    phrases: [['bahay', 'house / home'], ['kuwarto', 'room / bedroom'], ['kusina', 'kitchen'], ['banyo', 'bathroom'], ['mesa', 'table'], ['nasa', 'located at / in']],
    tip: 'May says something exists; nasa says where it is.',
    story: ['Bagong Bahay', 'May dalawang kuwarto ang bahay ni Nica. Nasa kusina ang mesa. Malapit sa kuwarto ang banyo.', 'Nica’s house has two rooms. The table is in the kitchen. The bathroom is near the bedroom.'],
    speakingPrompt: 'Ano ang nasa bahay mo?',
  },
  {
    number: 9, topic: 'Weather', title: 'Talking about the weather', description: 'Describe common weather and choose what to bring.', grammarTitle: 'Weather with mainit and malamig',
    phrases: [['mainit', 'hot'], ['malamig', 'cold'], ['maaraw', 'sunny'], ['maulan', 'rainy'], ['ulan', 'rain'], ['payong', 'umbrella']],
    tip: 'Ma- often forms descriptions: araw → maaraw, ulan → maulan.',
    story: ['Maulang Umaga', 'Maulan at malamig ngayong umaga. May dalang payong si Pia. Bukas ay maaraw at mainit daw.', 'It is rainy and cold this morning. Pia has an umbrella. They say tomorrow will be sunny and hot.'],
    speakingPrompt: 'Kumusta ang panahon ngayon?',
  },
  {
    number: 10, topic: 'Clothing', title: 'Choosing what to wear', description: 'Name basic clothes and describe what you are wearing.', grammarTitle: 'Suot and nagsusuot',
    phrases: [['damit', 'clothes'], ['kamiseta', 'shirt'], ['pantalon', 'trousers'], ['sapatos', 'shoes'], ['sumbrero', 'hat'], ['suot', 'worn / wearing']],
    tip: 'Use suot ko ang… for “I am wearing…” in everyday conversation.',
    story: ['Bago Umalis', 'Suot ni Tom ang puting kamiseta at itim na pantalon. Isinuot niya ang sapatos at sumbrero bago umalis.', 'Tom is wearing a white shirt and black trousers. He put on his shoes and hat before leaving.'],
    speakingPrompt: 'Ano ang suot mo ngayon?',
  },
  {
    number: 11, topic: 'Shopping', title: 'Asking about prices', description: 'Ask how much something costs and make a simple purchase.', grammarTitle: 'Magkano and demonstratives',
    phrases: [['magkano?', 'how much?'], ['mura', 'cheap'], ['mahal', 'expensive'], ['ito', 'this'], ['iyon', 'that'], ['bibili ako', 'I will buy']],
    tip: 'Ask Magkano ito? for an item near you and Magkano iyon? for one farther away.',
    story: ['Sa Tindahan', '“Magkano ito?” tanong ni Bea. Mura ang kamiseta pero mahal ang sapatos. “Bibili ako ng kamiseta,” sabi niya.', '“How much is this?” Bea asked. The shirt is cheap but the shoes are expensive. “I’ll buy the shirt,” she said.'],
    speakingPrompt: 'Pumili ng bagay at itanong ang presyo nito.',
  },
  {
    number: 12, topic: 'Market', title: 'Buying fruit and vegetables', description: 'Shop for fresh food and ask for an amount.', grammarTitle: 'Pahingi and quantities',
    phrases: [['palengke', 'market'], ['prutas', 'fruit'], ['gulay', 'vegetables'], ['mangga', 'mango'], ['kilo', 'kilogram'], ['pahingi po', 'may I have']],
    tip: 'Use Pahingi po ng… plus the item and amount for a polite market request.',
    story: ['Sa Palengke', 'Pumunta si Ana sa palengke. Bumili siya ng gulay at prutas. “Pahingi po ng isang kilo ng mangga,” sabi niya.', 'Ana went to the market. She bought vegetables and fruit. “May I have one kilogram of mangoes, please?” she said.'],
    speakingPrompt: 'Umorder ng isang prutas o gulay sa palengke.',
  },
  {
    number: 13, topic: 'Directions', title: 'Finding your way', description: 'Ask where a place is and follow short directions.', grammarTitle: 'Nasaan and direction words',
    phrases: [['nasaan?', 'where is?'], ['kanan', 'right'], ['kaliwa', 'left'], ['diretso', 'straight ahead'], ['malapit', 'near'], ['malayo', 'far']],
    tip: 'A natural sequence is Diretso, tapos kanan—straight ahead, then right.',
    story: ['Nasaan ang Bangko?', 'Nagtanong si Leo, “Nasaan ang bangko?” Sumagot ang babae, “Diretso lang, tapos kaliwa. Malapit lang.”', 'Leo asked, “Where is the bank?” The woman replied, “Just go straight, then left. It’s nearby.”'],
    speakingPrompt: 'Ituro ang daan mula sa bahay mo papunta sa isang malapit na lugar.',
  },
  {
    number: 14, topic: 'Transport', title: 'Getting around town', description: 'Name common transport and say where you are going.', grammarTitle: 'Pupunta and sasakay',
    phrases: [['jeepney', 'jeepney'], ['bus', 'bus'], ['tren', 'train'], ['sasakay ako', 'I will ride'], ['bababa ako', 'I will get off'], ['para po', 'please stop']],
    tip: 'On a jeepney, Para po politely tells the driver you would like to get off.',
    story: ['Papunta sa Bayan', 'Sasakay si Mia ng jeepney papunta sa bayan. Kapag malapit na siya, sasabihin niya, “Para po.”', 'Mia will ride a jeepney to town. When she is near her stop, she will say, “Please stop.”'],
    speakingPrompt: 'Sabihin kung ano ang sasakyan mo at saan ka bababa.',
  },
  {
    number: 15, topic: 'Work', title: 'Talking about work and study', description: 'Describe your role, workplace, and daily tasks.', grammarTitle: 'Nag- for completed actions',
    phrases: [['opisina', 'office'], ['paaralan', 'school'], ['guro', 'teacher'], ['estudyante', 'student'], ['nagtatrabaho', 'working'], ['nag-aaral', 'studying']],
    tip: 'Nag- forms many actor-focus verbs: trabaho → nagtatrabaho; aral → nag-aaral.',
    story: ['Magkaibang Araw', 'Guro si Lani at nagtatrabaho siya sa paaralan. Estudyante ang kapatid niya at nag-aaral sa bahay ngayong gabi.', 'Lani is a teacher and works at a school. Her sibling is a student and is studying at home tonight.'],
    speakingPrompt: 'Saan ka nagtatrabaho o nag-aaral?',
  },
  {
    number: 16, topic: 'Hobbies', title: 'Sharing your hobbies', description: 'Talk about activities you enjoy in your free time.', grammarTitle: 'Mahilig ako sa',
    phrases: [['magbasa', 'to read'], ['magluto', 'to cook'], ['kumanta', 'to sing'], ['sumayaw', 'to dance'], ['manood', 'to watch'], ['mahilig ako sa', 'I am fond of']],
    tip: 'Use mahilig ako sa + noun or activity to describe a regular interest.',
    story: ['Araw ng Pahinga', 'Mahilig magbasa si Jo. Mahilig naman sa pagluluto ang kaibigan niya. Sa gabi, nanonood sila ng pelikula.', 'Jo likes reading. His friend likes cooking. In the evening, they watch a film.'],
    speakingPrompt: 'Ano ang hilig mong gawin?',
  },
  {
    number: 17, topic: 'Likes', title: 'Expressing likes and dislikes', description: 'Say what you like, prefer, or do not like.', grammarTitle: 'Gusto and ayaw',
    phrases: [['gusto ko', 'I like / I want'], ['ayaw ko', 'I do not like / want'], ['paborito', 'favourite'], ['mas gusto ko', 'I prefer'], ['musika', 'music'], ['pelikula', 'film']],
    tip: 'Gusto can mean either “like” or “want”; the surrounding words make the meaning clear.',
    story: ['Paboritong Pelikula', 'Gusto ni Ella ang musika pero mas gusto niya ang pelikula. Ayaw niya ng nakakatakot na pelikula. Komedya ang paborito niya.', 'Ella likes music, but she prefers films. She dislikes scary films. Comedy is her favourite.'],
    speakingPrompt: 'Ano ang gusto at ayaw mo?',
  },
  {
    number: 18, topic: 'Body', title: 'Naming parts of the body', description: 'Identify basic body parts and describe simple discomfort.', grammarTitle: 'Masakit ang…',
    phrases: [['ulo', 'head'], ['kamay', 'hand'], ['paa', 'foot'], ['mata', 'eye'], ['tiyan', 'stomach'], ['masakit', 'painful / hurts']],
    tip: 'Say Masakit ang + body part: Masakit ang ulo ko means “My head hurts.”',
    story: ['Pagkatapos Maglakad', 'Naglakad si Nico buong hapon. Masakit ang paa niya at pagod ang katawan niya, pero hindi masakit ang ulo niya.', 'Nico walked all afternoon. His feet hurt and his body is tired, but his head does not hurt.'],
    speakingPrompt: 'Sabihin kung anong bahagi ng katawan ang masakit.',
  },
  {
    number: 19, topic: 'Health', title: 'Explaining how you feel', description: 'Describe common symptoms and ask for help.', grammarTitle: 'May and feeling unwell',
    phrases: [['may sakit', 'ill / sick'], ['lagnat', 'fever'], ['ubo', 'cough'], ['sipon', 'cold / runny nose'], ['nahihilo', 'dizzy'], ['doktor', 'doctor']],
    tip: 'Use May + symptom: May lagnat ako. Use Masakit ang… for pain.',
    story: ['Hindi Mabuti ang Pakiramdam', 'May sakit si Rosa. May ubo at sipon siya, at medyo nahihilo. Pupunta siya sa doktor ngayong hapon.', 'Rosa is ill. She has a cough and a cold, and she is a little dizzy. She will go to the doctor this afternoon.'],
    speakingPrompt: 'Ipaliwanag sa doktor kung ano ang nararamdaman mo.',
  },
  {
    number: 20, topic: 'Pharmacy', title: 'Getting medicine', description: 'Ask a pharmacist for medicine and understand basic instructions.', grammarTitle: 'Kailangan and para sa',
    phrases: [['gamot', 'medicine'], ['botika', 'pharmacy'], ['reseta', 'prescription'], ['kailangan ko', 'I need'], ['para sa', 'for'], ['dalawang beses', 'twice']],
    tip: 'Para sa connects a remedy to a problem: gamot para sa ubo.',
    story: ['Sa Botika', 'Pumunta si Dan sa botika. Kailangan niya ng gamot para sa ubo. May reseta siya mula sa doktor.', 'Dan went to the pharmacy. He needs medicine for a cough. He has a prescription from the doctor.'],
    speakingPrompt: 'Humingi ng gamot para sa isang simpleng sintomas.',
  },
  {
    number: 21, topic: 'Invitations', title: 'Making plans with friends', description: 'Invite someone, accept, or politely decline.', grammarTitle: 'Gusto mo bang…?',
    phrases: [['tara!', 'let’s go!'], ['gusto mo bang…?', 'would you like to…?'], ['sige', 'okay / sure'], ['puwede', 'can / possible'], ['pasensya na', 'sorry'], ['sa susunod', 'next time']],
    tip: 'Add ba to turn many statements into questions: Puwede ka ba?',
    story: ['Imbitasyon', '“Gusto mo bang magkape?” tanong ni Aya. “Pasensya na, hindi ako puwede ngayon. Sa susunod na lang,” sagot ni Luis.', '“Would you like to have coffee?” Aya asked. “Sorry, I can’t today. Maybe next time,” Luis replied.'],
    speakingPrompt: 'Anyayahan ang isang kaibigan na magkape o kumain.',
  },
  {
    number: 22, topic: 'Future plans', title: 'Talking about what you will do', description: 'Share plans for tomorrow and the weekend.', grammarTitle: 'Mag- future verbs',
    phrases: [['pupunta', 'will go'], ['kakain', 'will eat'], ['magluluto', 'will cook'], ['mag-aaral', 'will study'], ['magpapahinga', 'will rest'], ['balak ko', 'I plan to']],
    tip: 'Many future actor-focus verbs repeat the first syllable: kain → kakain.',
    story: ['Plano Bukas', 'Bukas, mag-aaral si Kim sa umaga. Magluluto siya sa tanghali. Sa gabi, magpapahinga siya sa bahay.', 'Tomorrow, Kim will study in the morning. She will cook at noon. In the evening, she will rest at home.'],
    speakingPrompt: 'Ano ang balak mong gawin bukas?',
  },
  {
    number: 23, topic: 'Past events', title: 'Talking about yesterday', description: 'Describe a short sequence of completed actions.', grammarTitle: 'Completed -um- and nag- verbs',
    phrases: [['pumunta', 'went'], ['bumili', 'bought'], ['nakita', 'saw'], ['kinausap', 'spoke to'], ['pagkatapos', 'afterwards'], ['noong', 'last / when']],
    tip: 'Use kahapon or noong + time to place a completed action in the past.',
    story: ['Kahapon sa Bayan', 'Kahapon, pumunta si Max sa bayan at bumili ng pagkain. Nakita niya ang kaibigan niya at kinausap ito. Pagkatapos, umuwi siya.', 'Yesterday, Max went to town and bought food. He saw his friend and spoke to them. Afterwards, he went home.'],
    speakingPrompt: 'Ano ang ginawa mo kahapon?',
  },
  {
    number: 24, topic: 'Descriptions', title: 'Describing people and places', description: 'Use common adjectives in natural Tagalog sentences.', grammarTitle: 'Ang linker na/-ng',
    phrases: [['maganda', 'beautiful'], ['mabait', 'kind'], ['mabilis', 'fast'], ['mabagal', 'slow'], ['malaki', 'big'], ['maliit', 'small']],
    tip: 'Link an adjective to a noun with na, or -ng after a vowel: mabait na tao, magandang lugar.',
    story: ['Bagong Kapitbahay', 'Mabait na tao ang bagong kapitbahay ni Lea. Maliit ang bahay niya pero maganda ang hardin. Mabilis din ang aso niya.', 'Lea’s new neighbour is kind. Their house is small but the garden is beautiful. Their dog is fast too.'],
    speakingPrompt: 'Ilarawan ang isang tao o lugar na kilala mo.',
  },
  {
    number: 25, topic: 'Comparisons', title: 'Comparing two things', description: 'Say that something is more, less, or the same.', grammarTitle: 'Mas… kaysa…',
    phrases: [['mas', 'more'], ['kaysa', 'than'], ['pareho', 'the same'], ['mas malaki', 'bigger'], ['mas mabilis', 'faster'], ['mas mura', 'cheaper']],
    tip: 'The core pattern is Mas + adjective + ang A kaysa sa B.',
    story: ['Dalawang Tindahan', 'Mas malaki ang unang tindahan, pero mas mura ang pangalawa. Pareho silang malapit sa bahay ni Ian.', 'The first shop is bigger, but the second is cheaper. They are both near Ian’s house.'],
    speakingPrompt: 'Ihambing ang dalawang bagay na ginagamit mo araw-araw.',
  },
  {
    number: 26, topic: 'Requests', title: 'Asking for help politely', description: 'Make useful requests and respond graciously.', grammarTitle: 'Paki- and maaari',
    phrases: [['tulong', 'help'], ['pakiulit', 'please repeat'], ['pakisulat', 'please write it'], ['maaari ba?', 'would it be possible?'], ['sandali lang', 'just a moment'], ['walang anuman', 'you’re welcome']],
    tip: 'Paki- makes a direct but polite request; adding po makes it more respectful.',
    story: ['Humihingi ng Tulong', 'Hindi naintindihan ni Sam ang sinabi. “Pakiulit po,” sabi niya. Isinulat ng babae ang salita. “Salamat!” “Walang anuman.”', 'Sam did not understand what was said. “Please repeat that,” he said. The woman wrote the word. “Thank you!” “You’re welcome.”'],
    speakingPrompt: 'Magalang na humingi ng tulong o pagpapaulit.',
  },
  {
    number: 27, topic: 'Messages', title: 'Calling and sending messages', description: 'Use simple phrases for phone calls and messages.', grammarTitle: 'Kausap and message phrases',
    phrases: [['telepono', 'telephone'], ['mensahe', 'message'], ['tatawag ako', 'I will call'], ['teka lang', 'wait a moment'], ['sino ito?', 'who is this?'], ['mahina ang signal', 'the signal is weak']],
    tip: 'On a call, “Sino po ito?” is a polite way to ask who is speaking.',
    story: ['Mahinang Signal', 'Tumawag si Pat kay Lina. Mahina ang signal, kaya nagpadala na lang siya ng mensahe: “Tatawag ako mamaya.”', 'Pat called Lina. The signal was weak, so Pat sent a message instead: “I’ll call later.”'],
    speakingPrompt: 'Mag-iwan ng maikling mensahe para sa isang kaibigan.',
  },
  {
    number: 28, topic: 'Hotel', title: 'Checking in at a hotel', description: 'Confirm a booking and ask about your room.', grammarTitle: 'May reservation ako',
    phrases: [['reserbasyon', 'reservation'], ['kuwarto', 'room'], ['susi', 'key'], ['isang gabi', 'one night'], ['may bakante?', 'is there a vacancy?'], ['anong palapag?', 'which floor?']],
    tip: 'Use May + noun + ako to say you have something: May reserbasyon ako.',
    story: ['Pagdating sa Hotel', 'May reserbasyon si Joy para sa isang gabi. Binigyan siya ng susi. Nasa ikatlong palapag ang kuwarto niya.', 'Joy has a reservation for one night. She was given a key. Her room is on the third floor.'],
    speakingPrompt: 'Mag-check in at sabihin kung ilang gabi ka mananatili.',
  },
  {
    number: 29, topic: 'Celebrations', title: 'Celebrating with others', description: 'Use greetings and words for birthdays and gatherings.', grammarTitle: 'Possessive mo and ninyo',
    phrases: [['maligayang kaarawan', 'happy birthday'], ['handaan', 'celebration feast'], ['regalo', 'gift'], ['bisita', 'guest'], ['salamat sa pagpunta', 'thank you for coming'], ['magsaya tayo', 'let’s celebrate']],
    tip: 'Use mo for one person and ninyo for several people or respectful singular “you.”',
    story: ['Kaarawan ni Alma', 'Maraming bisita sa handaan ni Alma. May dalang regalo ang mga kaibigan niya. “Maligayang kaarawan! Magsaya tayo!” sabi nila.', 'There are many guests at Alma’s celebration. Her friends brought gifts. “Happy birthday! Let’s celebrate!” they said.'],
    speakingPrompt: 'Batiin ang isang kaibigan at pasalamatan siya sa pagpunta.',
  },
  {
    number: 30, topic: 'Month review', title: 'Putting it all together', description: 'Review the month through a practical day of conversation.', grammarTitle: 'Connecting ideas with at, pero, and kaya',
    phrases: [['at', 'and'], ['pero', 'but'], ['kaya', 'so / therefore'], ['dahil', 'because'], ['muna', 'for now / first'], ['ulit', 'again']],
    tip: 'Connect short, familiar sentences before attempting long ones.',
    story: ['Isang Buong Araw', 'Maagang gumising si Ana dahil may trabaho siya. Kumain muna siya at sumakay ng bus. Pagkatapos ng trabaho, bumili siya ng pagkain, pero umuwi siya nang maaga dahil pagod siya.', 'Ana woke early because she had work. She ate first and rode a bus. After work, she bought food, but went home early because she was tired.'],
    speakingPrompt: 'Ikuwento ang isang buong araw gamit ang at, pero, o kaya.',
  },
];

function slug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function vocabularyFor(seed: LessonSeed): VocabularyItem[] {
  return seed.phrases.map(([tagalog, english], index) => ({
    id: `lesson-${seed.number}-${slug(tagalog) || index + 1}`,
    lessonId: `lesson-${seed.number}`,
    tagalog,
    english,
    example: index < 3 ? seed.story[1].split(/[.!?]/)[index]?.trim() || tagalog : tagalog,
    exampleEnglish: index < 3 ? seed.story[2].split(/[.!?]/)[index]?.trim() || english : english,
  }));
}

function lessonFrom(seed: LessonSeed): LessonDefinition {
  const lessonVocabulary = vocabularyFor(seed);
  const questions = lessonVocabulary.slice(0, 3).map(word => ({
    prompt: word.english,
    answers: [word.tagalog.toLowerCase()],
    explanation: `“${word.tagalog}” means “${word.english}.”`,
  })) as LessonDefinition['questions'];

  return {
    id: `lesson-${seed.number}`,
    number: seed.number,
    topic: seed.topic,
    category: seed.topic,
    title: seed.title,
    description: seed.description,
    vocabularyHeading: `Six useful expressions for ${seed.topic.toLowerCase()}`,
    vocabulary: lessonVocabulary,
    grammar: {
      title: seed.grammarTitle,
      concepts: [
        {
          label: 'NOTICE',
          title: 'Recognise the pattern',
          description: 'Listen to and read these useful forms before producing them yourself.',
          examples: lessonVocabulary.slice(0, 3).map(word => ({ tagalog: word.tagalog, english: word.english })),
        },
        {
          label: 'USE',
          title: 'Build the situation',
          description: 'Use these expressions to complete the everyday situation in this lesson.',
          examples: lessonVocabulary.slice(3).map(word => ({ tagalog: word.tagalog, english: word.english })),
        },
      ],
      tip: seed.tip,
    },
    questions,
    story: { title: seed.story[0], tagalog: seed.story[1], english: seed.story[2] },
    speaking: {
      prompt: seed.speakingPrompt,
      instruction: 'Answer aloud in Tagalog. Use at least two expressions from this lesson.',
      example: lessonVocabulary[0].tagalog,
      exampleEnglish: lessonVocabulary[0].english,
    },
  };
}

export const monthOneLessons = seeds.map(lessonFrom);
export const monthOneVocabulary = seeds.flatMap(vocabularyFor);
