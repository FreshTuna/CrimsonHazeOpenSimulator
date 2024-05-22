const norMonFiles = [
  "12",
  "13",
  "14",
  "15",
  "16",
  "19",
  "21",
  "22",
  "23",
  "25",
  "26",
  "27",
  "30",
  "31",
  "33",
  "34",
  "35",
  "39",
  "40",
  "42",
  "45",
  "47",
  "48",
  "52",
  "54",
  "57",
  "59",
  "61",
];
const speMonUncommonFiles = [
  "17",
  "29",
  "32",
  "36",
  "41",
  "43",
  "46",
  "49",
  "55",
  "60",
  "62",
];
const speMonRareFiles = [
  "18",
  "28",
  "37",
  "38",
  "50",
  "53",
  "58",
];
const speMonRareRareFiles = [
  "20",
  "24",
  "44",
  "51",
  "56",
  "63",
];
const supportFiles = [
  "65",
  "67",
  "68",
  "69",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
];

const aceFiles = [
  "64",
  "66",
  "70",
];

function getRandomFilesFromList(files: string[], count: number): string[] {
  const shuffled = files.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function pickWithProbability(probabilities: { [key: string]: number }): string {
  const total = Object.values(probabilities).reduce(
    (sum, value) => sum + value,
    0
  );
  const normalizedProbabilities = Object.fromEntries(
    Object.entries(probabilities).map(([key, value]) => [key, value / total])
  );

  let cumulativeProbability = 0;
  const random = Math.random();

  for (const [key, probability] of Object.entries(normalizedProbabilities)) {
    cumulativeProbability += probability;
    if (random < cumulativeProbability) {
      return key;
    }
  }

  return Object.keys(probabilities)[0]; // Fallback, should never reach here
}

const createBoosterPack = (aceIncludeYn: boolean = false) => {
  // Step 1: Pick 3 files from norMonFiles
  const norMonPicks = getRandomFilesFromList(norMonFiles, 3);

  // Step 2: Pick 1 file from either supportFiles or norMonFiles based on probability
  const supportOrNorMonFiles = pickWithProbability({
    support: 0.7,
    norMon: 0.3,
  });
  const supportOrNorMonPick = getRandomFilesFromList(
    supportOrNorMonFiles === "support" ? supportFiles : norMonFiles,
    1
  )[0];

  // Step 3: Pick 1 file from speMonUncommonFiles, speMonRareFiles, or speMonRareRareFiles based on probability
  const speMonFiles = pickWithProbability({
    uncommon: 0.6,
    rare: 0.2,
    rareRare: 0.1,
  });
  const speMonPick = getRandomFilesFromList(
    speMonFiles === "uncommon"
      ? speMonUncommonFiles
      : speMonFiles === "rare"
      ? speMonRareFiles
      : speMonRareRareFiles,
    1
  )[0];

  // Compile the booster pack
  if (aceIncludeYn) {
    return [
      ...norMonPicks,
      supportOrNorMonPick,
      getRandomFilesFromList(aceFiles, 1)[0],
    ];
  } else {
    return [...norMonPicks, supportOrNorMonPick, speMonPick];
  }
};

export const openBoosterPack = (packCount: number, aceIncludeYn: boolean) => {
  const packList = [];
  for (let i = 0; i < packCount; i++) {
    packList.push(...createBoosterPack());
  }

  if (aceIncludeYn) {
    packList.pop();
    packList.push(...createBoosterPack(true));
  }

  return packList;
};
