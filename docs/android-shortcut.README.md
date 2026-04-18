# android-shortcut.json

Import this file into HTTP Shortcuts (see docs/android-publishing.md step 3).

If the app rejects the format:
1. Update HTTP Shortcuts to the latest version
2. If it still fails, the app's schema may have changed. Build a minimal shortcut manually in the app, export it, and use that as a structural template — the logic in `codeOnPrepare` stays the same.
