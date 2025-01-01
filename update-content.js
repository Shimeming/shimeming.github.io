import fs from 'fs';
import path from 'path';

const directoryPath = 'public/projects';
const outputFilePath = 'src/data/projects.ts';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  let fileContent = 'const projects = [\n';
  const fileNamesWithoutExtension = files.map(file => path.parse(file).name);
  fileContent += `  '${fileNamesWithoutExtension.join("',\n  '")}',\n`;
  // files.forEach(file => {
  //   fileContent += `  '${file}',\n`;
  // });
  fileContent += '];\n';
  fileContent += 'export default projects;\n';
  fs.writeFile(outputFilePath, fileContent, (err) => {
    if (err) {
      return console.error('Unable to write file: ' + err);
    }
    console.log('File list generated in ' + outputFilePath);
  });
});
