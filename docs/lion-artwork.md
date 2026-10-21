# Lion mascot artwork

Generated using the built-in image generation tool. Originals are preserved. All new images are 1536 × 1024 PNGs in `public/images`.

| Original | Generated asset | Scene constraint |
| --- | --- | --- |
| jclwireframe.png | lion-planning.png | Presenter on left, marker raised toward whiteboard, other paw open |
| jvlVscode.png | lion-web-development.png | Seated on right, both paws at keyboard, original monitors and desk |
| jvlBE.png | lion-backend.png | Presenter on left, palm raised toward cloud diagram, other paw on mouse |
| jvlYT.png | lion-tutorial.png | Tutorial presenter at desk; replace character on camera screen too |
| jvlTed.png | lion-speaking.png | Center-stage full body, both arms open; preserve human audience |
| jvlFinal.png | lion-product-launch.png | Centered ribbon cutting, navy suit and gold tie; preserve supporting humans |
| jvlMantra.png | lion-mantra.png | Waist-up, globe on left and laptop on right above open paws |

## Prompt set

Use case: precise-object-edit. Each original is the edit target; `transparentJVL.png` is the lion identity reference only. Replace only the recurring young male main character with the anthropomorphic white lion: white fur and muzzle, flowing white mane with royal-blue streaks, blue eyes, and a friendly confident expression. Match the reference identity without adding a crown. Convert the character's exposed skin, hands, and legs to white fur with dexterous lion paws. Preserve the original clothing, body location, scale, pose, camera angle, landscape 3:2 framing, surrounding scene, typography, lighting, and detailed comic illustration style. Apply the scene constraint listed above. Output one edited full scene, no comparison.

The six images used on the Process page are referenced in `src/pages/Build.jsx`. The mantra variant is saved for future use; its original was not referenced by an active component.
