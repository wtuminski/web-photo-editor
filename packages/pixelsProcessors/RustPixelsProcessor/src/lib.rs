mod constants;
mod pixels_processors;
mod simd_pixels_processors;
mod types;
mod utils;

use utils::use_image_filter;
use wasm_bindgen::prelude::*;

use types::{JSPixelChannels, HSL};

#[wasm_bindgen]
pub struct PixelsProcessors {}

#[wasm_bindgen]
impl PixelsProcessors {
    pub fn grayscale(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(pixels_processors::grayscale, pixel_channels, filter_value)
    }
    pub fn inversion(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(pixels_processors::inversion, pixel_channels, filter_value)
    }
    pub fn hue(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            pixels_processors::get_hsl(HSL::Hue),
            pixel_channels,
            filter_value,
        )
    }
    pub fn saturation(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            pixels_processors::get_hsl(HSL::Saturation),
            pixel_channels,
            filter_value,
        )
    }
    pub fn luminosity(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            pixels_processors::get_hsl(HSL::Luminosity),
            pixel_channels,
            filter_value,
        )
    }
}

#[wasm_bindgen]
pub struct SIMDPixelsProcessors {}

#[wasm_bindgen]
impl SIMDPixelsProcessors {
    pub fn grayscale(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::grayscale,
            pixel_channels,
            filter_value,
        )
    }
    pub fn inversion(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::inversion,
            pixel_channels,
            filter_value,
        )
    }
    pub fn hue(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::get_hsl(HSL::Hue),
            pixel_channels,
            filter_value,
        )
    }
    pub fn saturation(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::get_hsl(HSL::Saturation),
            pixel_channels,
            filter_value,
        )
    }
    pub fn luminosity(pixel_channels: JSPixelChannels, filter_value: i8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::get_hsl(HSL::Luminosity),
            pixel_channels,
            filter_value,
        )
    }
}

pub mod wasi_pixels_processors {
    pub use crate::pixels_processors::*;
}

pub mod wasi_simd_pixels_processors {
    pub use crate::simd_pixels_processors::*;
}

pub mod wasi_common {
    pub use crate::types::HSL;
}
