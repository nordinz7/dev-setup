import { $ } from "bun";
import { aptPackages, commands, softwares } from "./softwares";
import { getFileExtension, isExistContent, isInstalled } from "./utils";
import { readdir } from "node:fs/promises";

await $`echo "Hello World!"`; // Hello World!

await $ `echo "Setting up apt packages"`;
for (const aptPackage of aptPackages) {
  try {
  if (await isInstalled(aptPackage)) {
    await $`echo "${aptPackage}" is already installed`;
    continue;
  }
    await $ `echo  $PKG_MANAGER`
    await $`sudo $PKG_MANAGER $PKG_INSTALL_CMD ${aptPackage}`.nothrow();
  } catch (error) {
    console.log(error);
  }
}

await $`echo "Setting up commands"`;
for (const command of commands) {
  const a = await isExistContent(command.contentPath);

  if (a || await isInstalled(command.bin)) {
    await $`echo "${command.bin}" is already set up`;
    continue;
  }

  await $`echo Setting up "${command.bin}"`;
  await command.command;
  await $`echo "${command.bin}"`;
}

const tempDir = '.temp';
await $`mkdir -p ${tempDir}`;

await $`echo "Downloading softwares"`;
for (const software of softwares) {
  if (await isInstalled(software.bin)) {
    await $`echo "${software.name}" is already installed`;
    continue;
  }

  await $`wget ${software.link} -O ${tempDir}/${software.fileName}.${software.fileExt}`;
}

await $`echo "Installing softwares"`;

const packages = await readdir(tempDir);

for (const file of packages) {
  const filePath = `${tempDir}/${file}`;
  const fileExtension = getFileExtension(file);

  const s = softwares.find(s => `${s.fileName}.${s.fileExt}` === file)

  if(s?.installCommand){
    await s.installCommand;
    continue;
  }

  switch (fileExtension) {
    case 'deb':
      await $`sudo dpkg -i ${filePath}`;
      break;
    case 'zip':
      await $`unzip ${filePath} -d ${tempDir}`;
      break;
    case 'tar.gz':
      await $`tar -xzf ${filePath} -C ${tempDir}`;
      break;
    default:
      break;
  }
}

await $`echo "Cleaning up"`;

await $`rm -rf ${tempDir}`;

await $`echo "Done!"`;