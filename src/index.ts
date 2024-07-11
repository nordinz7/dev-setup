import { $ } from "bun";
import { aptPackages, commands, softwares } from "./softwares";
import { isExistContent } from "./utils";

await $`echo "Hello World!"`; // Hello World!

const tempDir = '../.temp';

await $`mkdir -p ${tempDir}`;

// for (const software of softwares) {
//   await $`wget ${software.link} -O ${tempDir}/${software.name}.deb`;
// }

await $ `echo "Setting up apt packages"`;
for (const aptPackage of aptPackages) {
  try {
  const installedPath = (await $`which ${aptPackage}`.quiet().nothrow().text())
  const isInstalled = !installedPath.includes('not found')

  if (isInstalled) {
    await $`echo "${aptPackage}" is already installed`;
    continue;
  }
    await $ `echo  $PKG_MANAGER`
    await $`sudo $PKG_MANAGER $PKG_INSTALL_CMD ${aptPackage}`.nothrow();
  } catch (error) {
    console.log(error);
  }
  // await $`sudo apt install -y ${aptPackage}`;
}

for (const command of commands) {
  const a = await isExistContent(command.contentPath);

  if (a) {
    await $`echo "${command.name}" is already set up`;
    continue;
  }

  await $`echo Setting up "${command.name}"`;
  await command.command;
  await $`echo "${command.name}"`;
}