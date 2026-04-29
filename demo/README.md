# YC Demo

Static Vite demo for the Wuhan Data Intelligence Institute prototype.

## Run

```powershell
cd C:\work\yc-demo\demo
cmd /c pnpm install
cmd /c pnpm dev
```

Open `http://127.0.0.1:4173/`.

## Build

```powershell
cmd /c pnpm build
```

The original client design files are intentionally excluded from Git. Runtime assets required by the demo are kept in `demo/assets/extracted/`.
