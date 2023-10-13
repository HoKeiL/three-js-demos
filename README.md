Example App using Three.js and Typescript bundled with parcel 🚀🔥.

Modified from Alberto Adrián Pucheta's repo: https://github.com/adrianrey05/parcel-typescript-threejs

And Academy's node.js typescript starter project.

## Install

```
yarn
```

## Run

in dev mode:

```
yarn run start
```

then open [http://localhost:1234](http://localhost:1234) in your browser.

## Build

```
yarn run build
```

## 3d models

- Put 3d models in `assets/` directory.
- refer to them with an `./assets` prefix

Example:

```typescript
const myModel = await loadModel("./assets/rainbow.glb");
scene.add(myModel);
```
