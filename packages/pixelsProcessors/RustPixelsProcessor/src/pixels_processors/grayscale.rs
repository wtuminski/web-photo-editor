use core::iter::Iterator;

use crate::{constants::PIXEL_LENGTH, types::PixelChannels, utils::normalize_channel_value};

#[inline]
pub fn grayscale(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels {
    let filter_rate = 1f32 + f32::from(filter_value) / 100f32;

    pixel_channels
        .chunks_exact(PIXEL_LENGTH)
        .flat_map(move |pixel| {
            let r = u16::from(pixel[0]);
            let g = u16::from(pixel[1]);
            let b = u16::from(pixel[2]);
            let alpha = pixel[3];

            let avg = (f32::from(r + g + b) / 3f32) * filter_rate;
            let normalized_avg = normalize_channel_value(avg);

            [normalized_avg, normalized_avg, normalized_avg, alpha]
        })
        .collect()
}
