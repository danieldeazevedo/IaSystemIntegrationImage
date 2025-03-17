import { TextIA } from "nightback-ia-integration";

async function main() {
  await TextIA("gemini-2.0-flash", "say hello world", "AIzaSyChgvHZjn1mLjBrJXv9OiZ4IHTkfOzGoxs", 1000);
}
main();