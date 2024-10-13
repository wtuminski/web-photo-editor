# Rust Pixels Processor

## Usage

### 🛠️ Build with `wasm-pack`

```
yarn build
yarn dev (for development, works in watch mode)
yarn dev:debug (for development, works in watch mode with debug mode)
```

### 🔬 Test in Headless Browsers with `wasm-pack` and `criterion`

```
yarn test (runs all tests)
yarn test:wasm (runs WASM integration tests in a headless browser)
yarn test:bench (runs benchmarks)
yarn test:watch (runs all tests in watch mode)
```

## Requirements

### Tools

- Rustup (Rust toolchain)
- Cargo (Rust package manager)
- wasm-pack (for building and testing)
- wasmtime (for running WASM unit tests and benchmarks)
- Yarn (for managing workspace)
- Firefox (for running integration tests)

### Targets to add

- wasm32-unknown-unknown
- wasm32-wasip1
