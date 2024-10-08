mod constants;
mod pixels_processors;
mod simd_pixels_processors;
mod types;
mod utils;

use wasm_bindgen::prelude::*;

use types::{JSPixelChannels, PixelChannels, HSL};

fn use_image_filter(
    filter: fn(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels,
    pixel_channels: JSPixelChannels,
    filter_value: u8,
) -> JSPixelChannels {
    let _updated_pixel_channels = filter(pixel_channels.to_vec(), filter_value);
    let updated_pixel_channels =
        JSPixelChannels::new(&JsValue::from_f64(pixel_channels.length() as f64));

    updated_pixel_channels.copy_from(&_updated_pixel_channels);
    updated_pixel_channels
}

#[wasm_bindgen]
pub struct PixelsProcessors {}

#[wasm_bindgen]
impl PixelsProcessors {
    pub fn grayscale(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(pixels_processors::grayscale, pixel_channels, filter_value)
    }
    pub fn inversion(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(pixels_processors::inversion, pixel_channels, filter_value)
    }
    pub fn hue(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            pixels_processors::get_hsl(HSL::Hue),
            pixel_channels,
            filter_value,
        )
    }
    pub fn saturation(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            pixels_processors::get_hsl(HSL::Saturation),
            pixel_channels,
            filter_value,
        )
    }
    pub fn luminosity(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
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
    pub fn grayscale(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::grayscale,
            pixel_channels,
            filter_value,
        )
    }
    pub fn inversion(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::inversion,
            pixel_channels,
            filter_value,
        )
    }
    pub fn hue(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::get_hsl(HSL::Hue),
            pixel_channels,
            filter_value,
        )
    }
    pub fn saturation(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::get_hsl(HSL::Saturation),
            pixel_channels,
            filter_value,
        )
    }
    pub fn luminosity(pixel_channels: JSPixelChannels, filter_value: u8) -> JSPixelChannels {
        utils::set_panic_hook();
        use_image_filter(
            simd_pixels_processors::get_hsl(HSL::Luminosity),
            pixel_channels,
            filter_value,
        )
    }
}

pub mod native_pixels_processors {
    pub use crate::pixels_processors::*;
}

pub mod native_simd_pixels_processors {
    pub use crate::simd_pixels_processors::*;
}

pub mod native_common {
    pub use crate::types::HSL;
}
