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


const GREEN = '\/033[0;32m';
const YELLOW = '\/033[1;33m';
const NC = '\/033[0m';
const RED = '\/033[0;31m';

export const echo = async (name: string, status: 'installed' | 'error' | 'notFound') => {
  return $`echo -e "${name} ${status === 'installed' ? GREEN : status === 'error' ? RED : YELLOW}${status}${NC}"`;
}