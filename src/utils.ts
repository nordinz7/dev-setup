import { $ } from "bun";

export const isExistContent = async (path: string) => {
  if (!path) return false;

  const content = await $`cat ${path}`.quiet();

  return !!content;
}

export const getFileExtension = (fileName: string) => {
  const s = fileName.split('').findLastIndex((c) => c === '.');
  return fileName.slice(s + 1);
}