console.log(`1: VS Code\n2: Cursor`);

const option = prompt("Select Option:");

if (option !== "1" && option !== "2") {
  console.log("❌ Invalid option! Please choose 1 or 2.");
  Deno.exit(1);
}

const BASE_COMMON_PATH = `C:\\Users\\mahan_fakhimi\\AppData\\Local\\Programs`;

let BASE_PATH: string;

if (option === "1") {
  BASE_PATH = `${BASE_COMMON_PATH}\\Microsoft VS Code\\resources\\app\\out\\vs\\workbench`;
} else {
  BASE_PATH = `${BASE_COMMON_PATH}\\cursor\\resources\\app\\out\\vs\\workbench`;
}

const CSS_PATH = `${BASE_PATH}\\workbench.desktop.main.css`;
const JS_PATH = `${BASE_PATH}\\workbench.desktop.main.js`;

const CSS_OLD = `.windows{font-family:Segoe WPC,Segoe UI,sans-serif}`;
const CSS_NEW = `.windows{font-family:Cascadia Code}`;

const JS_OLD = `:host-context(.windows) { font-family: "Segoe WPC", "Segoe UI", sans-serif; }`;
const JS_NEW = `:host-context(.windows) { font-family: "Cascadia Code"; }`;

function patchFile(path: string, oldContent: string, newContent: string, label: string) {
  let fileContent = Deno.readTextFileSync(path);

  if (fileContent.includes(oldContent)) {
    fileContent = fileContent.replace(oldContent, newContent);
    Deno.writeTextFileSync(path, fileContent);
    console.log(`${label} file patched successfully.`);
  } else {
    console.warn(`${label} pattern not found.`);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

patchFile(CSS_PATH, CSS_OLD, CSS_NEW, "CSS");
patchFile(JS_PATH, JS_OLD, JS_NEW, "JS");

await sleep(1000);
