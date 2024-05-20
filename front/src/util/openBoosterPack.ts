const norMonFiles = [
  "crimson_haze/jap/nor_mon/downloaded_image_12.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_13.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_14.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_15.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_16.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_19.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_21.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_22.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_23.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_25.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_26.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_27.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_30.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_31.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_33.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_34.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_35.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_39.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_40.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_42.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_45.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_47.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_48.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_52.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_54.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_57.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_59.jpg",
  "crimson_haze/jap/nor_mon/downloaded_image_61.jpg",
];
const speMonUncommonFiles = [
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_17.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_29.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_32.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_36.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_41.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_43.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_46.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_49.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_55.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_60.jpg",
  "crimson_haze/jap/spe_mon/uncommon/downloaded_image_62.jpg",
];
const speMonRareFiles = [
  "crimson_haze/jap/spe_mon/rare/downloaded_image_18.jpg",
  "crimson_haze/jap/spe_mon/rare/downloaded_image_28.jpg",
  "crimson_haze/jap/spe_mon/rare/downloaded_image_37.jpg",
  "crimson_haze/jap/spe_mon/rare/downloaded_image_38.jpg",
  "crimson_haze/jap/spe_mon/rare/downloaded_image_50.jpg",
  "crimson_haze/jap/spe_mon/rare/downloaded_image_53.jpg",
  "crimson_haze/jap/spe_mon/rare/downloaded_image_58.jpg",
];
const speMonRareRareFiles = [
  "crimson_haze/jap/spe_mon/rare_rare/downloaded_image_20.jpg",
  "crimson_haze/jap/spe_mon/rare_rare/downloaded_image_24.jpg",
  "crimson_haze/jap/spe_mon/rare_rare/downloaded_image_44.jpg",
  "crimson_haze/jap/spe_mon/rare_rare/downloaded_image_51.jpg",
  "crimson_haze/jap/spe_mon/rare_rare/downloaded_image_56.jpg",
  "crimson_haze/jap/spe_mon/rare_rare/downloaded_image_63.jpg",
];
const supportFiles = [
  "crimson_haze/jap/support/downloaded_image_65.jpg",
  "crimson_haze/jap/support/downloaded_image_67.jpg",
  "crimson_haze/jap/support/downloaded_image_68.jpg",
  "crimson_haze/jap/support/downloaded_image_69.jpg",
  "crimson_haze/jap/support/downloaded_image_71.jpg",
  "crimson_haze/jap/support/downloaded_image_72.jpg",
  "crimson_haze/jap/support/downloaded_image_73.jpg",
  "crimson_haze/jap/support/downloaded_image_74.jpg",
  "crimson_haze/jap/support/downloaded_image_75.jpg",
  "crimson_haze/jap/support/downloaded_image_76.jpg",
  "crimson_haze/jap/support/downloaded_image_77.jpg",
];

const aceFiles = [
  "crimson_haze/jap/ace/downloaded_image_64.jpg",
  "crimson_haze/jap/ace/downloaded_image_66.jpg",
  "crimson_haze/jap/ace/downloaded_image_70.jpg",
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
    packList.push(createBoosterPack());
  }

  if (aceIncludeYn) {
    packList.pop();
    packList.push(createBoosterPack(true));
  }

  return packList;
};
