use wasm_bindgen::JsValue;

use crate::{constants::PIXEL_LENGTH, types::PixelChannels};

pub fn grayscale(pixel_channels: PixelChannels, filter_value: u8) -> PixelChannels {
    let filter_rate = 1f32 + filter_value as f32 / 100f32;

    let _updated_pixel_channels = pixel_channels
        .to_vec()
        .chunks_exact(PIXEL_LENGTH)
        .flat_map(|pixel| {
            let r = pixel[0] as f32;
            let g = pixel[1] as f32;
            let b = pixel[2] as f32;
            let alpha = pixel[3];

            let avg = f32::round(((r + g + b) / 3f32) * filter_rate);
            let adjusted_avg = u8::max(0, u8::min(255, avg as u8));

            [adjusted_avg, adjusted_avg, adjusted_avg, alpha]
        })
        .collect::<Vec<u8>>();

    let updated_pixel_channels =
        PixelChannels::new(&JsValue::from_f64(_updated_pixel_channels.len() as f64));
    updated_pixel_channels.copy_from(&_updated_pixel_channels);

    updated_pixel_channels
}
