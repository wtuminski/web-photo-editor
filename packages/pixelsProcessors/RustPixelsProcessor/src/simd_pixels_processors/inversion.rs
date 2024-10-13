use std::arch::wasm32::{
    f32x4, f32x4_extract_lane, f32x4_max, f32x4_min, f32x4_mul, f32x4_nearest, f32x4_splat,
    f32x4_sub,
};

use crate::{
    constants::{get_max_rgb_values, get_min_rgb_values, MAX_RGB_VALUE, PIXEL_LENGTH},
    types::PixelChannels,
};

#[target_feature(enable = "simd128")]
unsafe fn _inversion(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels {
    let filter_rates = f32x4_splat(1f32 + f32::from(filter_value) / 100f32);
    let max_rgb_values = get_max_rgb_values();
    let min_rgb_values = get_min_rgb_values();

    pixel_channels
        .chunks_exact(PIXEL_LENGTH)
        .flat_map(|pixel| {
            let rgb_channels = f32x4(
                f32::from(pixel[0]),
                f32::from(pixel[1]),
                f32::from(pixel[2]),
                // placeholder for fourth value
                f32::from(MAX_RGB_VALUE),
            );
            let alpha = pixel[3];
            let inverteds = f32x4_sub(max_rgb_values, rgb_channels);
            let normalised_inverteds = f32x4_nearest(f32x4_max(
                min_rgb_values,
                f32x4_min(f32x4_mul(inverteds, filter_rates), max_rgb_values),
            ));

            [
                f32x4_extract_lane::<0>(normalised_inverteds) as u8,
                f32x4_extract_lane::<1>(normalised_inverteds) as u8,
                f32x4_extract_lane::<2>(normalised_inverteds) as u8,
                alpha,
            ]
        })
        .collect::<Vec<u8>>()
}

pub fn inversion(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels {
    unsafe { _inversion(pixel_channels, filter_value) }
}
