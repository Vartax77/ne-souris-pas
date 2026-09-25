# MediaPipe servi localement

Fichiers copiés tels quels, version figée ([D8](../../../docs/D8-journal-decisions.md) n° 111, n° 220). Aucun chargement depuis un CDN.

## Bibliothèque

- Paquet npm `@mediapipe/tasks-vision` **1.0.1** : dernière version stable le 2026-09-25, publiée le 2026-07-31.
- Intégrité npm du paquet : `sha512-rvRE2FmAZ6ZxKSw7wq+e+jQDpN3t1B/tD2mJz9SmAzb1msoDkd4dMoE4wAh8Z30Um0PQwLiHr9QtomhmXk3aUQ==`
- Licence : Apache-2.0.
- Fichiers repris : `vision_bundle.mjs`, `wasm/vision_wasm_internal.{js,wasm}`, `wasm/vision_wasm_nosimd_internal.{js,wasm}` (appareils sans SIMD). Les variantes `_module` ne servent pas : `forVisionTasks` est appelé sans cette option.

## Modèle

- `app/models/face_landmarker.task`, float16, version 1.
- Source : `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`, modifié le 2023-05-03. MD5 conforme à celui publié par Google (`b0e7274907a1644404fef66b28dd6d85`).

## Empreintes SHA-256

```
d885630c297c0b20b1fe86096cb06291c4c8080876f27852e724f24ac603713f  tasks-vision-1.0.1/vision_bundle.mjs
e170ee67dd4e16c1a6fcd8840a206687e5a59b22c20e4a902bc445b095454d73  tasks-vision-1.0.1/wasm/vision_wasm_internal.js
8da277a733926eacd0474b8704b36742d6ec3231c57a860c5b889dff8f1df886  tasks-vision-1.0.1/wasm/vision_wasm_internal.wasm
e81d715a3d42cc3373602eb2f7aff795d164934db680e32496b65dab537f9658  tasks-vision-1.0.1/wasm/vision_wasm_nosimd_internal.js
a28483cd42e74e855bf5ebdb6b40d9b66a5b49e35e95020bc97669e6822a3192  tasks-vision-1.0.1/wasm/vision_wasm_nosimd_internal.wasm
64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff  ../../models/face_landmarker.task
```

Vérifier depuis `app/vendor/mediapipe/` : `sha256sum -c` sur ce bloc.

## Statistiques envoyées à Google

La bibliothèque envoie toutes les 60 s des statistiques d'usage à `https://odml.pa.googleapis.com/v1/log`, sans option pour le désactiver. La politique de sécurité de `index.html` bloque cet envoi ([D8](../../../docs/D8-journal-decisions.md) n° 225).

## Changer de version

1. `npm pack @mediapipe/tasks-vision@<version>`, puis décompresser.
2. Copier les fichiers ci-dessus dans un nouveau dossier `tasks-vision-<version>/`.
3. Mettre à jour le chemin dans `app/js/main.js`, ce fichier et une ligne de D8.
4. Revérifier l'envoi de statistiques et tout nouveau domaine appelé.
