import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * addCommas
 * @via Thanks ChatGPT
 */

export function addCommas(number: number | string) {
  if ( !['string', 'number'].includes(typeof number) ) return number;

  const num = `${number}`;
  const [whole, decimal] = num.split('.');
  let digitsSplit = whole.split('');
  let counter = 0;

  // Iterate through the digits from right to left
  for (var i = digitsSplit.length - 1; i >= 0; i--) {
    // Increment the counter
    counter++;

    // If the counter is a multiple of 3 and we're not at the leftmost digit, add a comma
    if (counter % 3 === 0 && i !== 0) {
      digitsSplit.splice(i, 0, ",");
    }
  }

  let digits = digitsSplit.join('');

  if ( decimal ) {
    digits = `${digits}.${decimal}`;
  }

  return digits;
}

/**
 * formatBytes
 */

export function formatBytes(bytes: number) {
  if ( typeof bytes !== 'number' ) return bytes;

  const limit = 1000;
  let numberFormat = 'b';

  if ( bytes >= limit * 1000000 ) {
    numberFormat = 'gb'
  } else if ( bytes >= limit * 1000 ) {
    numberFormat = 'mb';
  } else if ( bytes >= limit ) {
    numberFormat = 'kb';
  }
  
  let normalizedBytes = bytes;

  if ( numberFormat === 'gb' ) {
    normalizedBytes = bytes / 1000000000;
  } else if ( numberFormat === 'mb' ) {
    normalizedBytes = bytes / 1000000;
  } else if ( numberFormat === 'kb' ) {
    normalizedBytes = bytes / 1000;
  }

  let amount = '';

  if ( normalizedBytes % 1 !== 0 ) {
    amount = normalizedBytes.toFixed(1);
  } else {
    amount = `${normalizedBytes}`;
  }

  amount = `${addCommas(amount)}`;

  return `${amount} ${numberFormat}`;
}

/**
 * createHashFromString
 * @via https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 */

export async function createHashFromString(data: any, algorithm = 'SHA-256') {
  if (!data) throw new Error('Failed to create hash. Data undefined.');
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest(algorithm, encoder.encode(data))
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

/**
 * checkStatus
 */

export async function checkStatus(url: string) {
  const resource = await fetch(url);

  if (!resource.ok) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(undefined)
      }, 500)
    });
    return await checkStatus(url);
  }

  return true;
}