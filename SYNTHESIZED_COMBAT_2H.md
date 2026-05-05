# Synthesized 2H Anim Placeholders

Generated 1062 PNG files for 15 weapon(s).
Updated 15 sheet_definitions JSON.
Skipped 176 files (existing or no source).

⚠️ **Placeholders** — weapon stays at walk-frame-0 pose while body animates.
Static anims (idle/sit/emote) look fine. Movement anims (run/climb/jump) look stiff.
Spellcast: weapon visible but doesn't move with cast motion.
Acceptable for prototyping; replace with artist sprites for production.

To revert: `git restore sheet_definitions/ && jq -r '.synthesized[].synthesized' synthesized_combat_2h_manifest.json | xargs rm`

## By anim

### climb (154 files, 15 weapons)

### emote (154 files, 15 weapons)

### idle (138 files, 14 weapons)

### jump (154 files, 15 weapons)

### run (154 files, 15 weapons)

### sit (154 files, 15 weapons)

### spellcast (154 files, 15 weapons)

## Files

| Weapon | Anim | Synthesized | From Walk |
|---|---|---|---|
| Longsword | idle | `spritesheets/weapon/sword/longsword/idle/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | sit | `spritesheets/weapon/sword/longsword/sit/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | emote | `spritesheets/weapon/sword/longsword/emote/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | jump | `spritesheets/weapon/sword/longsword/jump/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | climb | `spritesheets/weapon/sword/longsword/climb/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | run | `spritesheets/weapon/sword/longsword/run/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | spellcast | `spritesheets/weapon/sword/longsword/spellcast/longsword.png` | `spritesheets/weapon/sword/longsword/walk/longsword.png` |
| Longsword | idle | `spritesheets/weapon/sword/longsword/universal_behind/idle/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Longsword | sit | `spritesheets/weapon/sword/longsword/universal_behind/sit/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Longsword | emote | `spritesheets/weapon/sword/longsword/universal_behind/emote/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Longsword | jump | `spritesheets/weapon/sword/longsword/universal_behind/jump/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Longsword | climb | `spritesheets/weapon/sword/longsword/universal_behind/climb/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Longsword | run | `spritesheets/weapon/sword/longsword/universal_behind/run/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Longsword | spellcast | `spritesheets/weapon/sword/longsword/universal_behind/spellcast/longsword.png` | `spritesheets/weapon/sword/longsword/universal_behind/walk/longsword.png` |
| Glowsword | idle | `spritesheets/weapon/sword/glowsword/idle/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | idle | `spritesheets/weapon/sword/glowsword/idle/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | sit | `spritesheets/weapon/sword/glowsword/sit/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | sit | `spritesheets/weapon/sword/glowsword/sit/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | emote | `spritesheets/weapon/sword/glowsword/emote/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | emote | `spritesheets/weapon/sword/glowsword/emote/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | jump | `spritesheets/weapon/sword/glowsword/jump/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | jump | `spritesheets/weapon/sword/glowsword/jump/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | climb | `spritesheets/weapon/sword/glowsword/climb/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | climb | `spritesheets/weapon/sword/glowsword/climb/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | run | `spritesheets/weapon/sword/glowsword/run/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | run | `spritesheets/weapon/sword/glowsword/run/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | spellcast | `spritesheets/weapon/sword/glowsword/spellcast/blue.png` | `spritesheets/weapon/sword/glowsword/walk/blue.png` |
| Glowsword | spellcast | `spritesheets/weapon/sword/glowsword/spellcast/red.png` | `spritesheets/weapon/sword/glowsword/walk/red.png` |
| Glowsword | idle | `spritesheets/weapon/sword/glowsword/universal_behind/idle/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | idle | `spritesheets/weapon/sword/glowsword/universal_behind/idle/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Glowsword | sit | `spritesheets/weapon/sword/glowsword/universal_behind/sit/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | sit | `spritesheets/weapon/sword/glowsword/universal_behind/sit/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Glowsword | emote | `spritesheets/weapon/sword/glowsword/universal_behind/emote/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | emote | `spritesheets/weapon/sword/glowsword/universal_behind/emote/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Glowsword | jump | `spritesheets/weapon/sword/glowsword/universal_behind/jump/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | jump | `spritesheets/weapon/sword/glowsword/universal_behind/jump/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Glowsword | climb | `spritesheets/weapon/sword/glowsword/universal_behind/climb/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | climb | `spritesheets/weapon/sword/glowsword/universal_behind/climb/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Glowsword | run | `spritesheets/weapon/sword/glowsword/universal_behind/run/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | run | `spritesheets/weapon/sword/glowsword/universal_behind/run/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Glowsword | spellcast | `spritesheets/weapon/sword/glowsword/universal_behind/spellcast/blue.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/blue.png` |
| Glowsword | spellcast | `spritesheets/weapon/sword/glowsword/universal_behind/spellcast/red.png` | `spritesheets/weapon/sword/glowsword/universal_behind/walk/red.png` |
| Rapier | idle | `spritesheets/weapon/sword/rapier/idle/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | sit | `spritesheets/weapon/sword/rapier/sit/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | emote | `spritesheets/weapon/sword/rapier/emote/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | jump | `spritesheets/weapon/sword/rapier/jump/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | climb | `spritesheets/weapon/sword/rapier/climb/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | run | `spritesheets/weapon/sword/rapier/run/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | spellcast | `spritesheets/weapon/sword/rapier/spellcast/rapier.png` | `spritesheets/weapon/sword/rapier/walk/rapier.png` |
| Rapier | idle | `spritesheets/weapon/sword/rapier/universal_behind/idle/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Rapier | sit | `spritesheets/weapon/sword/rapier/universal_behind/sit/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Rapier | emote | `spritesheets/weapon/sword/rapier/universal_behind/emote/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Rapier | jump | `spritesheets/weapon/sword/rapier/universal_behind/jump/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Rapier | climb | `spritesheets/weapon/sword/rapier/universal_behind/climb/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Rapier | run | `spritesheets/weapon/sword/rapier/universal_behind/run/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Rapier | spellcast | `spritesheets/weapon/sword/rapier/universal_behind/spellcast/rapier.png` | `spritesheets/weapon/sword/rapier/universal_behind/walk/rapier.png` |
| Saber | idle | `spritesheets/weapon/sword/saber/idle/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | sit | `spritesheets/weapon/sword/saber/sit/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | emote | `spritesheets/weapon/sword/saber/emote/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | jump | `spritesheets/weapon/sword/saber/jump/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | climb | `spritesheets/weapon/sword/saber/climb/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | run | `spritesheets/weapon/sword/saber/run/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | spellcast | `spritesheets/weapon/sword/saber/spellcast/saber.png` | `spritesheets/weapon/sword/saber/walk/saber.png` |
| Saber | idle | `spritesheets/weapon/sword/saber/universal_behind/idle/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Saber | sit | `spritesheets/weapon/sword/saber/universal_behind/sit/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Saber | emote | `spritesheets/weapon/sword/saber/universal_behind/emote/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Saber | jump | `spritesheets/weapon/sword/saber/universal_behind/jump/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Saber | climb | `spritesheets/weapon/sword/saber/universal_behind/climb/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Saber | run | `spritesheets/weapon/sword/saber/universal_behind/run/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Saber | spellcast | `spritesheets/weapon/sword/saber/universal_behind/spellcast/saber.png` | `spritesheets/weapon/sword/saber/universal_behind/walk/saber.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/brass.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/brass.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/bronze.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/bronze.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/ceramic.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/ceramic.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/copper.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/copper.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/gold.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/gold.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/iron.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/iron.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/silver.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/silver.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/fg/sit/steel.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/steel.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/brass.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/brass.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/bronze.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/bronze.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/ceramic.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/ceramic.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/copper.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/copper.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/gold.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/gold.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/iron.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/iron.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/silver.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/silver.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/fg/emote/steel.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/steel.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/brass.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/brass.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/bronze.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/bronze.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/ceramic.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/ceramic.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/copper.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/copper.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/gold.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/gold.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/iron.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/iron.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/silver.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/silver.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/fg/jump/steel.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/steel.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/brass.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/brass.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/bronze.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/bronze.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/ceramic.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/ceramic.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/copper.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/copper.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/gold.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/gold.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/iron.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/iron.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/silver.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/silver.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/fg/climb/steel.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/steel.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/brass.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/brass.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/bronze.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/bronze.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/ceramic.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/ceramic.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/copper.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/copper.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/gold.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/gold.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/iron.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/iron.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/silver.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/silver.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/fg/run/steel.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/steel.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/brass.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/brass.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/bronze.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/bronze.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/ceramic.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/ceramic.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/copper.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/copper.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/gold.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/gold.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/iron.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/iron.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/silver.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/silver.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/fg/spellcast/steel.png` | `spritesheets/weapon/sword/arming/universal/fg/walk/steel.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/brass.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/brass.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/bronze.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/bronze.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/ceramic.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/ceramic.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/copper.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/copper.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/gold.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/gold.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/iron.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/iron.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/silver.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/silver.png` |
| Arming Sword | sit | `spritesheets/weapon/sword/arming/universal/bg/sit/steel.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/steel.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/brass.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/brass.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/bronze.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/bronze.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/ceramic.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/ceramic.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/copper.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/copper.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/gold.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/gold.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/iron.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/iron.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/silver.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/silver.png` |
| Arming Sword | emote | `spritesheets/weapon/sword/arming/universal/bg/emote/steel.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/steel.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/brass.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/brass.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/bronze.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/bronze.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/ceramic.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/ceramic.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/copper.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/copper.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/gold.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/gold.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/iron.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/iron.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/silver.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/silver.png` |
| Arming Sword | jump | `spritesheets/weapon/sword/arming/universal/bg/jump/steel.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/steel.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/brass.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/brass.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/bronze.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/bronze.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/ceramic.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/ceramic.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/copper.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/copper.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/gold.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/gold.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/iron.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/iron.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/silver.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/silver.png` |
| Arming Sword | climb | `spritesheets/weapon/sword/arming/universal/bg/climb/steel.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/steel.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/brass.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/brass.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/bronze.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/bronze.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/ceramic.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/ceramic.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/copper.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/copper.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/gold.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/gold.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/iron.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/iron.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/silver.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/silver.png` |
| Arming Sword | run | `spritesheets/weapon/sword/arming/universal/bg/run/steel.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/steel.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/brass.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/brass.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/bronze.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/bronze.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/ceramic.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/ceramic.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/copper.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/copper.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/gold.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/gold.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/iron.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/iron.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/silver.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/silver.png` |
| Arming Sword | spellcast | `spritesheets/weapon/sword/arming/universal/bg/spellcast/steel.png` | `spritesheets/weapon/sword/arming/universal/bg/walk/steel.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/foreground/idle/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/foreground/sit/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/foreground/emote/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/foreground/jump/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/foreground/climb/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/foreground/run/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/brass.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/brass.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/bronze.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/bronze.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/ceramic.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/copper.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/copper.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/dark.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/dark.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/diamond.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/diamond.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/gold.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/gold.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/iron.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/iron.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/light.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/light.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/medium.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/medium.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/red.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/red.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/silver.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/silver.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/foreground/spellcast/steel.png` | `spritesheets/weapon/magic/diamond/universal/foreground/walk/steel.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | idle | `spritesheets/weapon/magic/diamond/universal/background/idle/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | sit | `spritesheets/weapon/magic/diamond/universal/background/sit/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | emote | `spritesheets/weapon/magic/diamond/universal/background/emote/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | jump | `spritesheets/weapon/magic/diamond/universal/background/jump/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | climb | `spritesheets/weapon/magic/diamond/universal/background/climb/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | run | `spritesheets/weapon/magic/diamond/universal/background/run/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/brass.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/brass.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/bronze.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/bronze.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/ceramic.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/ceramic.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/copper.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/copper.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/dark.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/dark.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/diamond.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/diamond.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/gold.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/gold.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/iron.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/iron.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/light.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/light.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/medium.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/medium.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/red.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/red.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/silver.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/silver.png` |
| Diamond staff | spellcast | `spritesheets/weapon/magic/diamond/universal/background/spellcast/steel.png` | `spritesheets/weapon/magic/diamond/universal/background/walk/steel.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/foreground/idle/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/foreground/sit/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/foreground/emote/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/foreground/jump/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/foreground/climb/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/foreground/run/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/blue.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/blue.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/crystal.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/crystal.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/green.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/green.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/orange.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/orange.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/purple.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/purple.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/red.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/red.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/foreground/spellcast/yellow.png` | `spritesheets/weapon/magic/crystal/universal/foreground/walk/yellow.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | idle | `spritesheets/weapon/magic/crystal/universal/background/idle/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | sit | `spritesheets/weapon/magic/crystal/universal/background/sit/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | emote | `spritesheets/weapon/magic/crystal/universal/background/emote/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | jump | `spritesheets/weapon/magic/crystal/universal/background/jump/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | climb | `spritesheets/weapon/magic/crystal/universal/background/climb/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | run | `spritesheets/weapon/magic/crystal/universal/background/run/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/blue.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/blue.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/crystal.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/crystal.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/green.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/green.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/orange.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/orange.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/purple.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/purple.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/red.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/red.png` |
| Crystal | spellcast | `spritesheets/weapon/magic/crystal/universal/background/spellcast/yellow.png` | `spritesheets/weapon/magic/crystal/universal/background/walk/yellow.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/foreground/idle/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/foreground/sit/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/foreground/emote/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/foreground/jump/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/foreground/climb/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/foreground/run/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/brass.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/brass.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/bronze.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/bronze.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/ceramic.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/ceramic.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/copper.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/copper.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/dark.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/dark.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/gold.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/gold.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/iron.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/iron.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/light.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/light.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/medium.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/medium.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/red.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/red.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/s.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/s.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/silver.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/silver.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/foreground/spellcast/steel.png` | `spritesheets/weapon/magic/s/universal/foreground/walk/steel.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | idle | `spritesheets/weapon/magic/s/universal/background/idle/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | sit | `spritesheets/weapon/magic/s/universal/background/sit/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | emote | `spritesheets/weapon/magic/s/universal/background/emote/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | jump | `spritesheets/weapon/magic/s/universal/background/jump/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | climb | `spritesheets/weapon/magic/s/universal/background/climb/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | run | `spritesheets/weapon/magic/s/universal/background/run/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/brass.png` | `spritesheets/weapon/magic/s/universal/background/walk/brass.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/bronze.png` | `spritesheets/weapon/magic/s/universal/background/walk/bronze.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/ceramic.png` | `spritesheets/weapon/magic/s/universal/background/walk/ceramic.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/copper.png` | `spritesheets/weapon/magic/s/universal/background/walk/copper.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/dark.png` | `spritesheets/weapon/magic/s/universal/background/walk/dark.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/gold.png` | `spritesheets/weapon/magic/s/universal/background/walk/gold.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/iron.png` | `spritesheets/weapon/magic/s/universal/background/walk/iron.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/light.png` | `spritesheets/weapon/magic/s/universal/background/walk/light.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/medium.png` | `spritesheets/weapon/magic/s/universal/background/walk/medium.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/red.png` | `spritesheets/weapon/magic/s/universal/background/walk/red.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/s.png` | `spritesheets/weapon/magic/s/universal/background/walk/s.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/silver.png` | `spritesheets/weapon/magic/s/universal/background/walk/silver.png` |
| S staff | spellcast | `spritesheets/weapon/magic/s/universal/background/spellcast/steel.png` | `spritesheets/weapon/magic/s/universal/background/walk/steel.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/foreground/idle/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/foreground/sit/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/foreground/emote/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/foreground/jump/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/foreground/climb/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/foreground/run/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/brass.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/brass.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/bronze.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/ceramic.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/copper.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/copper.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/dark.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/dark.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gnarled.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/gold.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/gold.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/iron.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/iron.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/light.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/light.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/medium.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/medium.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/red.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/red.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/silver.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/silver.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/foreground/spellcast/steel.png` | `spritesheets/weapon/magic/gnarled/universal/foreground/walk/steel.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | idle | `spritesheets/weapon/magic/gnarled/universal/background/idle/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | sit | `spritesheets/weapon/magic/gnarled/universal/background/sit/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | emote | `spritesheets/weapon/magic/gnarled/universal/background/emote/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | jump | `spritesheets/weapon/magic/gnarled/universal/background/jump/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | climb | `spritesheets/weapon/magic/gnarled/universal/background/climb/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | run | `spritesheets/weapon/magic/gnarled/universal/background/run/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/brass.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/brass.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/bronze.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/bronze.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/ceramic.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/ceramic.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/copper.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/copper.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/dark.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/dark.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/gnarled.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gnarled.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/gold.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/gold.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/iron.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/iron.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/light.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/light.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/medium.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/medium.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/red.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/red.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/silver.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/silver.png` |
| Gnarled staff | spellcast | `spritesheets/weapon/magic/gnarled/universal/background/spellcast/steel.png` | `spritesheets/weapon/magic/gnarled/universal/background/walk/steel.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/foreground/idle/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/foreground/sit/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/foreground/emote/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/foreground/jump/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/foreground/climb/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/foreground/run/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/brass.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/brass.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/bronze.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/bronze.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/ceramic.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/ceramic.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/copper.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/copper.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/dark.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/dark.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/gold.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/gold.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/iron.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/iron.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/light.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/light.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/loop.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/loop.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/medium.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/medium.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/red.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/red.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/silver.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/silver.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/foreground/spellcast/steel.png` | `spritesheets/weapon/magic/loop/universal/foreground/walk/steel.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | idle | `spritesheets/weapon/magic/loop/universal/background/idle/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | sit | `spritesheets/weapon/magic/loop/universal/background/sit/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | emote | `spritesheets/weapon/magic/loop/universal/background/emote/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | jump | `spritesheets/weapon/magic/loop/universal/background/jump/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | climb | `spritesheets/weapon/magic/loop/universal/background/climb/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | run | `spritesheets/weapon/magic/loop/universal/background/run/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/brass.png` | `spritesheets/weapon/magic/loop/universal/background/walk/brass.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/bronze.png` | `spritesheets/weapon/magic/loop/universal/background/walk/bronze.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/ceramic.png` | `spritesheets/weapon/magic/loop/universal/background/walk/ceramic.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/copper.png` | `spritesheets/weapon/magic/loop/universal/background/walk/copper.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/dark.png` | `spritesheets/weapon/magic/loop/universal/background/walk/dark.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/gold.png` | `spritesheets/weapon/magic/loop/universal/background/walk/gold.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/iron.png` | `spritesheets/weapon/magic/loop/universal/background/walk/iron.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/light.png` | `spritesheets/weapon/magic/loop/universal/background/walk/light.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/loop.png` | `spritesheets/weapon/magic/loop/universal/background/walk/loop.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/medium.png` | `spritesheets/weapon/magic/loop/universal/background/walk/medium.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/red.png` | `spritesheets/weapon/magic/loop/universal/background/walk/red.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/silver.png` | `spritesheets/weapon/magic/loop/universal/background/walk/silver.png` |
| Loop staff | spellcast | `spritesheets/weapon/magic/loop/universal/background/spellcast/steel.png` | `spritesheets/weapon/magic/loop/universal/background/walk/steel.png` |
| Waraxe | idle | `spritesheets/weapon/blunt/waraxe/behind/idle/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | sit | `spritesheets/weapon/blunt/waraxe/behind/sit/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | emote | `spritesheets/weapon/blunt/waraxe/behind/emote/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | jump | `spritesheets/weapon/blunt/waraxe/behind/jump/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | climb | `spritesheets/weapon/blunt/waraxe/behind/climb/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | run | `spritesheets/weapon/blunt/waraxe/behind/run/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | spellcast | `spritesheets/weapon/blunt/waraxe/behind/spellcast/waraxe.png` | `spritesheets/weapon/blunt/waraxe/behind/walk/waraxe.png` |
| Waraxe | idle | `spritesheets/weapon/blunt/waraxe/idle/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Waraxe | sit | `spritesheets/weapon/blunt/waraxe/sit/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Waraxe | emote | `spritesheets/weapon/blunt/waraxe/emote/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Waraxe | jump | `spritesheets/weapon/blunt/waraxe/jump/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Waraxe | climb | `spritesheets/weapon/blunt/waraxe/climb/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Waraxe | run | `spritesheets/weapon/blunt/waraxe/run/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Waraxe | spellcast | `spritesheets/weapon/blunt/waraxe/spellcast/waraxe.png` | `spritesheets/weapon/blunt/waraxe/walk/waraxe.png` |
| Mace | idle | `spritesheets/weapon/blunt/mace/idle/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | sit | `spritesheets/weapon/blunt/mace/sit/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | emote | `spritesheets/weapon/blunt/mace/emote/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | jump | `spritesheets/weapon/blunt/mace/jump/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | climb | `spritesheets/weapon/blunt/mace/climb/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | run | `spritesheets/weapon/blunt/mace/run/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | spellcast | `spritesheets/weapon/blunt/mace/spellcast/mace.png` | `spritesheets/weapon/blunt/mace/walk/mace.png` |
| Mace | idle | `spritesheets/weapon/blunt/mace/universal_behind/idle/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Mace | sit | `spritesheets/weapon/blunt/mace/universal_behind/sit/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Mace | emote | `spritesheets/weapon/blunt/mace/universal_behind/emote/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Mace | jump | `spritesheets/weapon/blunt/mace/universal_behind/jump/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Mace | climb | `spritesheets/weapon/blunt/mace/universal_behind/climb/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Mace | run | `spritesheets/weapon/blunt/mace/universal_behind/run/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Mace | spellcast | `spritesheets/weapon/blunt/mace/universal_behind/spellcast/mace.png` | `spritesheets/weapon/blunt/mace/universal_behind/walk/mace.png` |
| Flail | idle | `spritesheets/weapon/blunt/flail/behind/idle/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | sit | `spritesheets/weapon/blunt/flail/behind/sit/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | emote | `spritesheets/weapon/blunt/flail/behind/emote/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | jump | `spritesheets/weapon/blunt/flail/behind/jump/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | climb | `spritesheets/weapon/blunt/flail/behind/climb/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | run | `spritesheets/weapon/blunt/flail/behind/run/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | spellcast | `spritesheets/weapon/blunt/flail/behind/spellcast/flail.png` | `spritesheets/weapon/blunt/flail/behind/walk/flail.png` |
| Flail | idle | `spritesheets/weapon/blunt/flail/idle/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Flail | sit | `spritesheets/weapon/blunt/flail/sit/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Flail | emote | `spritesheets/weapon/blunt/flail/emote/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Flail | jump | `spritesheets/weapon/blunt/flail/jump/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Flail | climb | `spritesheets/weapon/blunt/flail/climb/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Flail | run | `spritesheets/weapon/blunt/flail/run/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Flail | spellcast | `spritesheets/weapon/blunt/flail/spellcast/flail.png` | `spritesheets/weapon/blunt/flail/walk/flail.png` |
| Scythe | idle | `spritesheets/weapon/polearm/scythe/idle/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | sit | `spritesheets/weapon/polearm/scythe/sit/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | emote | `spritesheets/weapon/polearm/scythe/emote/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | jump | `spritesheets/weapon/polearm/scythe/jump/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | climb | `spritesheets/weapon/polearm/scythe/climb/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | run | `spritesheets/weapon/polearm/scythe/run/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | spellcast | `spritesheets/weapon/polearm/scythe/spellcast/scythe.png` | `spritesheets/weapon/polearm/scythe/walk/scythe.png` |
| Scythe | idle | `spritesheets/weapon/polearm/scythe/universal_behind/idle/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Scythe | sit | `spritesheets/weapon/polearm/scythe/universal_behind/sit/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Scythe | emote | `spritesheets/weapon/polearm/scythe/universal_behind/emote/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Scythe | jump | `spritesheets/weapon/polearm/scythe/universal_behind/jump/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Scythe | climb | `spritesheets/weapon/polearm/scythe/universal_behind/climb/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Scythe | run | `spritesheets/weapon/polearm/scythe/universal_behind/run/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Scythe | spellcast | `spritesheets/weapon/polearm/scythe/universal_behind/spellcast/scythe.png` | `spritesheets/weapon/polearm/scythe/universal_behind/walk/scythe.png` |
| Halberd | idle | `spritesheets/weapon/polearm/halberd/behind/idle/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | sit | `spritesheets/weapon/polearm/halberd/behind/sit/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | emote | `spritesheets/weapon/polearm/halberd/behind/emote/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | jump | `spritesheets/weapon/polearm/halberd/behind/jump/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | climb | `spritesheets/weapon/polearm/halberd/behind/climb/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | run | `spritesheets/weapon/polearm/halberd/behind/run/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | spellcast | `spritesheets/weapon/polearm/halberd/behind/spellcast/halberd.png` | `spritesheets/weapon/polearm/halberd/behind/walk/halberd.png` |
| Halberd | idle | `spritesheets/weapon/polearm/halberd/idle/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |
| Halberd | sit | `spritesheets/weapon/polearm/halberd/sit/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |
| Halberd | emote | `spritesheets/weapon/polearm/halberd/emote/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |
| Halberd | jump | `spritesheets/weapon/polearm/halberd/jump/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |
| Halberd | climb | `spritesheets/weapon/polearm/halberd/climb/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |
| Halberd | run | `spritesheets/weapon/polearm/halberd/run/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |
| Halberd | spellcast | `spritesheets/weapon/polearm/halberd/spellcast/halberd.png` | `spritesheets/weapon/polearm/halberd/walk/halberd.png` |

## Skipped

- Longsword – already exists: spritesheets/weapon/sword/longsword/combat_idle/longsword.png
- Longsword – already exists: spritesheets/weapon/sword/longsword/universal_behind/combat_idle/longsword.png
- Glowsword – already exists: spritesheets/weapon/sword/glowsword/combat_idle/blue.png
- Glowsword – already exists: spritesheets/weapon/sword/glowsword/combat_idle/red.png
- Glowsword – already exists: spritesheets/weapon/sword/glowsword/universal_behind/combat_idle/blue.png
- Glowsword – already exists: spritesheets/weapon/sword/glowsword/universal_behind/combat_idle/red.png
- Rapier – already exists: spritesheets/weapon/sword/rapier/combat_idle/rapier.png
- Rapier – already exists: spritesheets/weapon/sword/rapier/universal_behind/combat_idle/rapier.png
- Saber – already exists: spritesheets/weapon/sword/saber/combat_idle/saber.png
- Saber – already exists: spritesheets/weapon/sword/saber/universal_behind/combat_idle/saber.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/brass.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/bronze.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/ceramic.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/copper.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/gold.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/iron.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/silver.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/combat_idle/steel.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/brass.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/bronze.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/ceramic.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/copper.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/gold.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/iron.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/silver.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/fg/idle/steel.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/brass.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/bronze.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/ceramic.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/copper.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/gold.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/iron.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/silver.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/combat_idle/steel.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/brass.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/bronze.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/ceramic.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/copper.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/gold.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/iron.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/silver.png
- Arming Sword – already exists: spritesheets/weapon/sword/arming/universal/bg/idle/steel.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/brass.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/bronze.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/ceramic.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/copper.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/dark.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/diamond.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/gold.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/iron.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/light.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/medium.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/red.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/silver.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/foreground/combat_idle/steel.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/brass.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/bronze.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/ceramic.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/copper.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/dark.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/diamond.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/gold.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/iron.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/light.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/medium.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/red.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/silver.png
- Diamond staff – already exists: spritesheets/weapon/magic/diamond/universal/background/combat_idle/steel.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/blue.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/crystal.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/green.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/orange.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/purple.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/red.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/foreground/combat_idle/yellow.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/blue.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/crystal.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/green.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/orange.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/purple.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/red.png
- Crystal – already exists: spritesheets/weapon/magic/crystal/universal/background/combat_idle/yellow.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/brass.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/bronze.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/ceramic.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/copper.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/dark.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/gold.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/iron.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/light.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/medium.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/red.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/s.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/silver.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/foreground/combat_idle/steel.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/brass.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/bronze.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/ceramic.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/copper.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/dark.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/gold.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/iron.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/light.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/medium.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/red.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/s.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/silver.png
- S staff – already exists: spritesheets/weapon/magic/s/universal/background/combat_idle/steel.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/brass.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/bronze.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/ceramic.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/copper.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/dark.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/gnarled.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/gold.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/iron.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/light.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/medium.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/red.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/silver.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/foreground/combat_idle/steel.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/brass.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/bronze.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/ceramic.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/copper.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/dark.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/gnarled.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/gold.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/iron.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/light.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/medium.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/red.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/silver.png
- Gnarled staff – already exists: spritesheets/weapon/magic/gnarled/universal/background/combat_idle/steel.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/brass.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/bronze.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/ceramic.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/copper.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/dark.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/gold.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/iron.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/light.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/loop.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/medium.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/red.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/silver.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/foreground/combat_idle/steel.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/brass.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/bronze.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/ceramic.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/copper.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/dark.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/gold.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/iron.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/light.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/loop.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/medium.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/red.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/silver.png
- Loop staff – already exists: spritesheets/weapon/magic/loop/universal/background/combat_idle/steel.png
- Waraxe – already exists: spritesheets/weapon/blunt/waraxe/behind/combat_idle/waraxe.png
- Waraxe – already exists: spritesheets/weapon/blunt/waraxe/combat_idle/waraxe.png
- Mace – already exists: spritesheets/weapon/blunt/mace/combat_idle/mace.png
- Mace – already exists: spritesheets/weapon/blunt/mace/universal_behind/combat_idle/mace.png
- Flail – already exists: spritesheets/weapon/blunt/flail/behind/combat_idle/flail.png
- Flail – already exists: spritesheets/weapon/blunt/flail/combat_idle/flail.png
- Scythe – already exists: spritesheets/weapon/polearm/scythe/combat_idle/scythe.png
- Scythe – already exists: spritesheets/weapon/polearm/scythe/universal_behind/combat_idle/scythe.png
- Halberd – already exists: spritesheets/weapon/polearm/halberd/behind/combat_idle/halberd.png
- Halberd – already exists: spritesheets/weapon/polearm/halberd/combat_idle/halberd.png
- Recurve – no walk/ dir: weapon/ranged/bow/recurve/universal/background/
- Recurve – no walk/ dir: weapon/ranged/bow/recurve/universal/foreground/
- Great – no walk/ dir: weapon/ranged/bow/great/universal/background/
- Great – no walk/ dir: weapon/ranged/bow/great/universal/foreground/
- Normal – no walk/ dir: weapon/ranged/bow/normal/universal/background/
- Normal – no walk/ dir: weapon/ranged/bow/normal/universal/foreground/