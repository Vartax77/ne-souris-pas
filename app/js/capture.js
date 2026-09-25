// Capture : un seul flux caméra frontale + micro (D4 §2, D8 n° 112).
// iOS coupe la piste précédente à un second accès : ce flux servira aussi à la détection et à l'envoi vidéo.

const MESSAGES = {
  NotAllowedError: "refusée. Autorisez la caméra et le micro dans les réglages du navigateur, puis rechargez la page.",
  NotFoundError: "aucune caméra trouvée sur cet appareil.",
  NotReadableError: "caméra déjà utilisée par une autre application. Fermez-la, puis réessayez.",
  OverconstrainedError: "aucune caméra frontale compatible.",
};

export async function demarrerCamera(video) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("ce navigateur ne donne pas accès à la caméra (page en HTTPS ?).");
  }
  try {
    const flux = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: true,
    });
    video.srcObject = flux;
    await video.play();
    return flux;
  } catch (e) {
    throw new Error(MESSAGES[e.name] ?? `${e.name} : ${e.message}`);
  }
}
