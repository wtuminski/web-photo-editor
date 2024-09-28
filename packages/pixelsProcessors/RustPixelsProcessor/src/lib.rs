mod constants;
mod image_processors;
mod types;
mod utils;

use types::PixelChannels;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(a: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub struct ImageProcessors {}

#[wasm_bindgen]
impl ImageProcessors {
    pub fn grayscale(pixels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        image_processors::grayscale(pixels, filter_value)
    }
    pub fn inversion(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn hue(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn saturation(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn luminosity(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
}

#[wasm_bindgen]
pub struct SIMDImageProcessors {}

#[wasm_bindgen]
impl SIMDImageProcessors {
    pub fn grayscale(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn inversion(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn hue(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn saturation(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
    pub fn luminosity(pixels: PixelChannels, _filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        pixels
    }
}
