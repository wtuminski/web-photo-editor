use crate::{
    constants::{MAX_RGB_VALUE, PIXEL_LENGTH},
    types::PixelChannels,
    utils::normalize_channel_value,
};

#[inline]
pub fn inversion(pixel_channels: PixelChannels, filter_value: i8) -> PixelChannels {
    let filter_rate = 1f32 + f32::from(filter_value) / 100f32;

    pixel_channels
        .chunks_exact(PIXEL_LENGTH)
        .flat_map(|pixel| {
            let r = pixel[0];
            let g = pixel[1];
            let b = pixel[2];
            let alpha = pixel[3];

            let inverted_r = f32::from(MAX_RGB_VALUE - r) * filter_rate;
            let inverted_g = f32::from(MAX_RGB_VALUE - g) * filter_rate;
            let inverted_b = f32::from(MAX_RGB_VALUE - b) * filter_rate;

            [
                normalize_channel_value(inverted_r),
                normalize_channel_value(inverted_g),
                normalize_channel_value(inverted_b),
                alpha,
            ]
        })
        .collect::<Vec<u8>>()
}
