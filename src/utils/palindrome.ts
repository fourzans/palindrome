export function isPalindrome(input: string, strict = false): boolean {
    if (!input) return false;
    const clean = strict
        ? input
        : (input.match(/[a-z0-9]/gi) || []).join('');
    const normalized = clean.toLowerCase();
    return normalized === [...normalized].reverse().join('');    
}