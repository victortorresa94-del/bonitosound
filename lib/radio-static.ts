/**
 * El "ruidito" de sintonizar de la Radio Bonito.
 *
 * Se sintetiza en el navegador con Web Audio (ráfaga de ruido blanco + barrido
 * de filtro) en vez de cargar un mp3: cero peso, cero derechos y suena distinto
 * cada vez, que es justo lo que hace una radio de verdad al buscar emisora.
 *
 * El AudioContext se crea perezosamente y se reutiliza: los navegadores no
 * dejan crearlo hasta que hay interacción del usuario, y abrir uno por cada
 * cambio de tema acabaría agotando los que permite el navegador.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const AC = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  try {
    ctx = new AC();
  } catch {
    return null;
  }
  return ctx;
}

/**
 * Reproduce una ráfaga de sintonía. Devuelve su duración en ms para poder
 * encadenar el cambio de tema justo cuando termina.
 */
export function playTuningNoise(durationMs = 700): number {
  const ac = getCtx();
  if (!ac) return 0;

  // Si el navegador lo dejó suspendido (autoplay policy), lo despertamos.
  if (ac.state === "suspended") ac.resume().catch(() => {});

  const dur = durationMs / 1000;
  const now = ac.currentTime;

  // Ruido blanco: un buffer de muestras aleatorias.
  const frames = Math.max(1, Math.floor(ac.sampleRate * dur));
  const buffer = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

  const source = ac.createBufferSource();
  source.buffer = buffer;

  // Barrido de paso banda: es lo que da la sensación de "pasar por emisoras".
  const filtro = ac.createBiquadFilter();
  filtro.type = "bandpass";
  filtro.Q.value = 6;
  filtro.frequency.setValueAtTime(600, now);
  filtro.frequency.exponentialRampToValueAtTime(3200, now + dur * 0.7);
  filtro.frequency.exponentialRampToValueAtTime(900, now + dur);

  // Entra y sale con fundido para que no chasquee.
  const vol = ac.createGain();
  vol.gain.setValueAtTime(0.0001, now);
  vol.gain.exponentialRampToValueAtTime(0.14, now + 0.06);
  vol.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  source.connect(filtro).connect(vol).connect(ac.destination);
  source.start(now);
  source.stop(now + dur);

  return durationMs;
}
