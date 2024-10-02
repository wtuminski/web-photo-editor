mod constants;
mod image_processors;
mod simd_image_processors;
mod types;
mod utils;

use wasm_bindgen::prelude::*;

use types::{PixelChannels, HSL};

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
    pub fn grayscale(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        image_processors::grayscale(pixel_channels, filter_value)
    }
    pub fn inversion(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        image_processors::inversion(pixel_channels, filter_value)
    }
    pub fn hue(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        image_processors::hsl(HSL::Hue, pixel_channels, filter_value)
    }
    pub fn saturation(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        image_processors::hsl(HSL::Saturation, pixel_channels, filter_value)
    }
    pub fn luminosity(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        image_processors::hsl(HSL::Luminosity, pixel_channels, filter_value)
    }
}

#[wasm_bindgen]
pub struct SIMDImageProcessors {}

#[wasm_bindgen]
impl SIMDImageProcessors {
    pub fn grayscale(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        simd_image_processors::grayscale(pixel_channels, filter_value)
    }
    pub fn inversion(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        simd_image_processors::inversion(pixel_channels, filter_value)
    }
    pub fn hue(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        simd_image_processors::hsl(HSL::Hue, pixel_channels, filter_value)
    }
    pub fn saturation(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        simd_image_processors::hsl(HSL::Saturation, pixel_channels, filter_value)
    }
    pub fn luminosity(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
        utils::set_panic_hook();
        simd_image_processors::hsl(HSL::Luminosity, pixel_channels, filter_value)
    }
}
