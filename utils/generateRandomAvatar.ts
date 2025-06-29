const emojiAvatars = [
  "🧠", "🐱", "🐶", "🐸", "🐵", "🐧", "🦊",
  "🐯", "🐼", "🦁", "🐮", "🐷", "🐤", "🦄",
  "🐙", "🐬", "🐳", "🦕", "🐝", "🕊️", "🐢"
];

export function getRandomEmojiAvatar() {
  const index = Math.floor(Math.random() * emojiAvatars.length);
  return emojiAvatars[index];
}
