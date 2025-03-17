import { IaText } from "nightback-ia-integration";

function main() {
  IaText("gemini-2.0-flash", "say hello world", "AIzaSyChgvHZjn1mLjBrJXv9OiZ4IHTkfOzGoxs", 1000)

  console.log(IaText())
}
main();