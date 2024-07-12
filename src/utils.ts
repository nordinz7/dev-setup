import { $ } from "bun";

export const isExistContent = async (path: string) => {
  if (!path) return false;

  const content = await $`cat ${path}`.quiet().nothrow().text();

  return !!content;
}

export const getFileExtension = (fileName: string) => {
  const s = fileName.split('').findLastIndex((c) => c === '.');
  return fileName.slice(s + 1);
}

export const isInstalled = async (bin: string) => {
  const installedPath = (await $`which ${bin}`.quiet().nothrow().text())
  return !installedPath.includes('not found')
}