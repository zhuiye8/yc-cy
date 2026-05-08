export function adaptRegionIntel(payload = {}) {
  return {
    hero: payload.hero || null,
    particles: Array.isArray(payload.particles) ? payload.particles : [],
    details: payload.details || {},
  }
}
