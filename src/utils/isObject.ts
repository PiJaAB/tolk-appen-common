export default function isObject(o: unknown): o is Record<string, unknown> {
  return typeof o === 'object' && o != null && !Array.isArray(o);
}
