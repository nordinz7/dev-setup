import { $ } from "bun";

export const isExistContent = async (path: string) => {
  if (!path) return false;

  const content = await $`cat ${path}`.quiet();

  return !!content;
}