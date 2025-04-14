const BASE_PATH = `C:\\Users\\mahan_fakhimi\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\out\\vs\\workbench`;

const CSS_PATH = `${BASE_PATH}\\workbench.desktop.main.css`;
const JS_PATH = `${BASE_PATH}\\workbench.desktop.main.js`;

const CSS_OLD = `.monaco-workbench.windows{font-family:Segoe WPC,Segoe UI,sans-serif}`;
const CSS_NEW = `.monaco-workbench.windows{font-family:Cascadia Code}`;

const JS_OLD = `:host-context(.windows) { font-family: "Segoe WPC", "Segoe UI", sans-serif; }`;
const JS_NEW = `:host-context(.windows) { font-family: "Cascadia Code"; }`;

function patchFile(
  path: string,
  oldContent: string,
  newContent: string,
  label: string
) {
  let fileContent = Deno.readTextFileSync(path);

  if (fileContent.includes(oldContent)) {
    fileContent = fileContent.replace(oldContent, newContent);
    Deno.writeTextFileSync(path, fileContent);
    console.log(`${label} file patched successfully.`);
  } else {
    console.warn(`${label} pattern not found.`);
  }
}

patchFile(CSS_PATH, CSS_OLD, CSS_NEW, "CSS");
patchFile(JS_PATH, JS_OLD, JS_NEW, "JS");
