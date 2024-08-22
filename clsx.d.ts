declare module 'clsx' {
  type ClassValue = string | number | null | undefined | Record<string, boolean> | ClassValue[];

  export default function clsx(...inputs: ClassValue[]): string;
}
